import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute, queryAllByAttribute, act } from '@testing-library/react';
import { createEvent } from '@testing-library/dom';
import { RichUtils } from 'draft-js';
import RichTextEditor from '.';

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

const createPasteEvent = (html) => {
  const text = html.replace('<[^>]*>', '');
  return {
    clipboardData: {
      types: ['text/plain', 'text/html'],
      getData: (type) => (type === 'text/plain' ? text : html),
    },
  };
};

afterEach(cleanup);

describe('<RichTextEditor />', () => {
  it('should render rich text editor', () => {
    const { queryByTestId } = render(<RichTextEditor />);
    expect(queryByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
  });

  it('should hide placeholder on focus editor on click', () => {
    const { container } = render(<RichTextEditor />);
    expect(queryAllByClass(container, 'public-DraftEditorPlaceholder-root')).toHaveLength(1);

    fireEvent.click(getByClass(container, 'aui--editor-container'));
    expect(
      queryAllByClass(container, 'public-DraftEditorPlaceholder-root public-DraftEditorPlaceholder-hasFocus')
    ).toHaveLength(1);
  });

  it('should warn when value is passed and onChange is not', () => {
    console.warn = jest.fn();
    render(<RichTextEditor value={RichTextEditor.createEmpty()} />);
    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should set initial state correctly', () => {
    const { container } = render(<RichTextEditor initialValue={RichTextEditor.stateFromHTML('<b>test</b>')} />);
    expect(getByClass(container, 'DraftEditor-root')).toHaveTextContent('test');
  });

  it('should fire onChange correctly', () => {
    const { container } = render(<RichTextEditor />);
    const editorNode = container.querySelector('.public-DraftEditor-content');
    const eventProperties = createPasteEvent('<b>123</b>');
    const pasteEvent = createEvent.paste(editorNode, eventProperties);

    fireEvent(editorNode, pasteEvent);
    expect(getByClass(container, 'DraftEditor-root')).toHaveTextContent('123');
  });

  it('should pass state if onChange is supplied', () => {
    const onChange = jest.fn();
    const { container } = render(<RichTextEditor value={RichTextEditor.createEmpty()} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
    const editorNode = container.querySelector('.public-DraftEditor-content');
    const eventProperties = createPasteEvent('<strong>123</strong>');
    const pasteEvent = createEvent.paste(editorNode, eventProperties);

    fireEvent(editorNode, pasteEvent);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(RichTextEditor.stateToHTML(onChange.mock.calls[1][0])).toEqual('<p><strong>123</strong></p>');
  });

  it('should correctly handle key commands', () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    const { container } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);

    const editorNode = container.querySelector('.public-DraftEditor-content');
    fireEvent.focus(editorNode);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(RichTextEditor.stateToHTML(onChange.mock.calls[1][0])).toEqual('<p>123</p>');

    fireEvent.keyDown(editorNode, { key: 'Backspace', keyCode: 8, which: 8 });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(RichTextEditor.stateToHTML(onChange.mock.calls[2][0])).toEqual('<p>12</p>');
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('backspace');
  });

  it('should correctly handle the new state of key commands', () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    const { container } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    const editorNode = container.querySelector('.public-DraftEditor-content');
    fireEvent.focus(editorNode);

    fireEvent.keyDown(editorNode, { key: 'b', keyCode: 66, which: 66, ctrlKey: true });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('bold');
  });

  it('should toggle italics', () => {
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    const { queryAllByTestId, getByAltText } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(queryAllByTestId('button-wrapper')).toHaveLength(5);
    expect(queryAllByTestId('button-wrapper')[1]).toContainElement(getByAltText('italics'));

    fireEvent.mouseDown(queryAllByTestId('button-wrapper')[1]);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(RichTextEditor.stateToHTML(onChange.mock.calls[1][0])).toEqual('<p>123</p>');
  });

  it('should correctly generate unordered list', () => {
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    const { queryAllByTestId, getByAltText } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(queryAllByTestId('button-wrapper')).toHaveLength(5);
    expect(queryAllByTestId('button-wrapper')[4]).toContainElement(getByAltText('number'));

    fireEvent.mouseDown(queryAllByTestId('button-wrapper')[4]);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  describe('mention feature', () => {
    it('should render @ button as one of advanced buttons', () => {
      const contacts = [
        {
          name: 'Matthew Russell',
          title: 'Senior Software Engineer',
          avatar: '../assets/user-avatar.jpeg',
        },
        {
          name: 'Julian Krispel-Samsel',
          title: 'United Kingdom',
          avatar: '../assets/adslot-avatar.png',
        },
      ];
      const onChange = jest.fn();
      const { queryAllByTestId, queryAllByText } = render(<RichTextEditor contacts={contacts} onChange={onChange} />);

      expect(queryAllByTestId('rich-text-editor-wrapper')).toHaveLength(1);
      expect(queryAllByText('@')).toHaveLength(1);
    });

    it('should pop up the mention list when user input a @ to the editor', () => {
      console.error = jest.fn(); // Todo: fix popover warning with react v17 upgrade

      const contacts = [
        {
          name: 'Matthew Russell',
          title: 'Senior Software Engineer',
          avatar: '../assets/user-avatar.jpeg',
        },
        {
          name: 'Julian Krispel-Samsel',
          title: 'United Kingdom',
          avatar: '../assets/adslot-avatar.png',
        },
      ];
      const onChange = jest.fn();
      const newState = RichTextEditor.stateFromHTML('@');
      const { queryAllByTestId, container } = render(
        <RichTextEditor initialValue={newState} contacts={contacts} onChange={onChange} />
      );

      expect(queryAllByTestId('rich-text-editor-mention-entry')).toHaveLength(0);

      const editorNode = container.querySelector('.public-DraftEditor-content');

      act(() => {
        fireEvent.focus(editorNode);
      });

      expect(queryAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
      expect(queryAllByTestId('rich-text-editor-mention-entry')[0]).toHaveClass('aui--mention-entry__is-focused');

      console.error.mockRestore();
    });

    it('should click @ button to trigger mention list', () => {
      console.error = jest.fn(); // Todo: fix popover warning with react v17 upgrade

      const contacts = [
        {
          name: 'Matthew Russell',
          title: 'Senior Software Engineer',
          avatar: '../assets/user-avatar.jpeg',
        },
        {
          name: 'Julian Krispel-Samsel',
          title: 'United Kingdom',
          avatar: '../assets/adslot-avatar.png',
        },
      ];
      const onChange = jest.fn();
      const { queryAllByTestId, getByTestId } = render(<RichTextEditor contacts={contacts} onChange={onChange} />);

      act(() => {
        fireEvent.mouseDown(getByTestId('rich-text-editor-advanced-buttons').children[0]);
      });

      expect(queryAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
      expect(queryAllByTestId('rich-text-editor-mention-entry')[0]).toHaveClass('aui--mention-entry__is-focused');

      act(() => {
        fireEvent.mouseDown(getByTestId('rich-text-editor-advanced-buttons').children[0]);
      });
      expect(queryAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);

      console.error.mockRestore();
    });
  });
});
