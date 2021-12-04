import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  queryByAttribute,
  queryAllByAttribute,
  act,
  waitFor,
} from '@testing-library/react';
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

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

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
    const newState = '123';
    render(<RichTextEditor value={newState} />);
    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should set initial state correctly', () => {
    const { container } = render(<RichTextEditor initialValue="<b>test</b>" />);
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
    const { container } = render(<RichTextEditor value={''} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
    const editorNode = container.querySelector('.public-DraftEditor-content');
    const eventProperties = createPasteEvent('<strong>123</strong>');
    const pasteEvent = createEvent.paste(editorNode, eventProperties);

    fireEvent(editorNode, pasteEvent);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual('<p><strong>123</strong></p>');
    expect(RichTextEditor.stateToPlainText(RichTextEditor.stateFromHTML(onChange.mock.calls[0][0]))).toEqual('123');
    expect(RichTextEditor.plainTextFromHTML(onChange.mock.calls[0][0])).toEqual('123');

    expect(RichTextEditor.stateToEntityList(RichTextEditor.stateFromHTML(onChange.mock.calls[0][0]))).toEqual({});
  });

  it('should correctly handle key commands', () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = '123';
    const { container } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);

    const editorNode = container.querySelector('.public-DraftEditor-content');
    fireEvent.focus(editorNode);
    expect(onChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(editorNode, { key: 'Backspace', keyCode: 8, which: 8 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual('<p>12</p>');
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('backspace');
  });

  it('should correctly handle the new state of key commands', () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = '123';
    const { container } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    const editorNode = container.querySelector('.public-DraftEditor-content');
    fireEvent.focus(editorNode);
    fireEvent.keyDown(editorNode, { key: 'b', keyCode: 66, which: 66, ctrlKey: true });

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('bold');
  });

  it('should toggle italics', async () => {
    const onChange = jest.fn();
    const newState = '123';
    const { queryAllByTestId, getByTestId, container } = render(
      <RichTextEditor initialValue={newState} onChange={onChange} />
    );

    expect(queryAllByTestId('button-wrapper')).toHaveLength(5);
    expect(queryAllByTestId('button-wrapper')[1]).toContainElement(getByTestId('italics'));

    const editorNode = container.querySelector('.public-DraftEditor-content');
    fireEvent.focus(editorNode);
    fireEvent.mouseDown(queryAllByTestId('button-wrapper')[1]);

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(editorNode, { key: 'i', keyCode: 73, which: 73, ctrlKey: true });
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('italic');
  });

  it('should correctly generate unordered list', () => {
    const onChange = jest.fn();
    const newState = '123';
    const { queryAllByTestId, getByTestId } = render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(queryAllByTestId('button-wrapper')).toHaveLength(5);
    expect(queryAllByTestId('button-wrapper')[4]).toContainElement(getByTestId('number'));

    fireEvent.mouseDown(queryAllByTestId('button-wrapper')[4]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(
      `<ol>
  <li>123</li>
</ol>`
    );
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
      const { queryByTestId, queryByText } = render(<RichTextEditor mentions={contacts} onChange={onChange} />);

      expect(queryByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
      expect(queryByText('@')).toBeInTheDocument();
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
      const newState = '@';
      const { queryByTestId, queryAllByTestId, container } = render(
        <RichTextEditor initialValue={newState} mentions={contacts} onChange={onChange} />
      );

      expect(queryByTestId('rich-text-editor-mention-entry')).not.toBeInTheDocument();

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
      const { queryAllByTestId, getByTestId } = render(<RichTextEditor mentions={contacts} onChange={onChange} />);

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

    it("should render the avatar with user's initials", () => {
      console.error = jest.fn(); // Todo: fix popover warning with react v17 upgrade

      const contacts = [
        {
          name: 'Matthew',
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
      const { getByTestId, getByText } = render(<RichTextEditor mentions={contacts} onChange={onChange} />);

      act(() => {
        fireEvent.mouseDown(getByTestId('rich-text-editor-advanced-buttons').children[0]);
      });

      expect(getByText('M')).toHaveClass('avatar-component-initials');
      expect(getByText('JK')).toHaveClass('avatar-component-initials');
    });
  });

  describe('file upload feature', () => {
    it('should render file upload button as one of advanced buttons', () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();
      const { queryByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      expect(queryByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
      expect(queryByTestId('file-download-button')).toBeInTheDocument();
    });

    it('should be able to select a pdf file when clicking file upload button', () => {
      console.error = jest.fn(); // Todo: fix popover warning with react v17 upgrade
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      const { getByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'));
      });

      expect(onFileSelect).toHaveBeenCalledTimes(0);

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'), {
          target: { files: [{ name: 'selected file' }] },
        });
      });

      expect(onFileSelect).toHaveBeenCalledTimes(1);
      console.error.mockRestore();
    });

    it('should render file preview list and file sticker close button after file uploaded', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      const { getByTestId, queryByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'), {
          target: { files: [{ name: 'selected file' }] },
        });
      });

      await waitFor(() => expect(queryByTestId('file-preview-list')).toBeInTheDocument());

      act(() => fireEvent.mouseEnter(getByTestId('file-sticker')));
      expect(queryByTestId('file-sticker-close-button')).toBeInTheDocument();
      act(() => fireEvent.mouseLeave(getByTestId('file-sticker')));
      expect(queryByTestId('file-sticker-close-button')).not.toBeInTheDocument();
    });

    it('should render file preview list and file sticker close button after file uploaded', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      const { getByTestId, queryByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'), {
          target: { files: [{ name: 'selected file' }] },
        });
      });

      await waitFor(() => expect(queryByTestId('file-preview-list')).toBeInTheDocument());

      act(() => fireEvent.mouseEnter(getByTestId('file-sticker')));
      expect(queryByTestId('file-sticker-close-button')).toBeInTheDocument();
      act(() => fireEvent.mouseLeave(getByTestId('file-sticker')));
      expect(queryByTestId('file-sticker-close-button')).not.toBeInTheDocument();
    });

    it('should remove file sticker when clicking close button on it', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      const { getByTestId, queryByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'), {
          target: { files: [{ name: 'selected file' }] },
        });
      });

      await waitFor(() => expect(queryByTestId('file-preview-list')).toBeInTheDocument());

      act(() => fireEvent.mouseEnter(getByTestId('file-sticker')));
      expect(queryByTestId('file-sticker-close-button')).toBeInTheDocument();

      act(() => fireEvent.click(getByTestId('file-sticker-close-button')));
      await waitFor(() => expect(queryByTestId('file-preview-list')).not.toBeInTheDocument());
    });

    it('should show a spinner on the file sticker if no path is returned', () => {
      const onFileSelect = jest.fn(() => false);
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      const { getByTestId, queryByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'), {
          target: { files: [{ name: 'image.png' }] },
        });
      });

      expect(queryByTestId('spinner-wrapper')).toBeInTheDocument();
    });

    it('should render an image for image file using it path', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      const { getByTestId, queryByTestId } = render(
        <RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />
      );

      act(() => {
        fireEvent.mouseDown(getByTestId('file-download-button'));
        fireEvent.change(getByTestId('file-download-input'), {
          target: { files: [{ name: 'image.png' }] },
        });
      });

      await waitFor(() => expect(queryByTestId('file-sticker-image')).toBeInTheDocument());
    });
  });

  describe('useTruncateState', () => {
    const Component = ({ text, ...rest }) => {
      const editorState = RichTextEditor.stateFromHTML(text);
      const { truncatedState } = RichTextEditor.useTruncateState({
        editorState,
        briefCharCount: 20,
        truncateString: '...',
        ...rest,
      });
      const html = RichTextEditor.stateToHTML(truncatedState);
      return <div data-testid="test" dangerouslySetInnerHTML={{ __html: html }} />;
    };
    it('should truncate editor state', () => {
      const { getByTestId } = render(<Component text="<p>abcdefghijklmnop</p><p>12345678910</p><p>12345678910</p>" />);
      expect(getByTestId('test')).toHaveTextContent('abcdefghijklmnop 1234...');
    });
    it('should customize truncate string', () => {
      const { getByTestId } = render(
        <Component truncateString="---" text="<p>abcdefghijklmnop</p><p>12345678910</p><p>12345678910</p>" />
      );
      expect(getByTestId('test')).toHaveTextContent('abcdefghijklmnop 1234---');
    });
    it('should allow no truncate string', () => {
      const { getByTestId } = render(
        <Component truncateString={null} briefCharCount={5} text="<p>abcdefghijklmnop</p>" />
      );
      expect(getByTestId('test')).toHaveTextContent('abcde');
    });
    it('should not truncate text shorter than briefCharCount', () => {
      const { getByTestId } = render(<Component briefCharCount={200} text="<p>abcdefghijklmnop</p>" />);
      expect(getByTestId('test')).toHaveTextContent('abcdefghijklmnop');
    });
    it('should work when a whole block needs to be removed', () => {
      const { getByTestId } = render(<Component briefCharCount={16} text="<p>abcdefghijklmnop</p><p>q</p>" />);
      expect(getByTestId('test').innerHTML).toEqual(`<p>abcdefghijklmnop...</p>`);
    });
  });
});
