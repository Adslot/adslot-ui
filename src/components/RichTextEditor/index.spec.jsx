import React from 'react';
import { render, screen, fireEvent, createEvent, user } from 'testing';
import { RichUtils } from 'draft-js';
import RichTextEditor from '.';
import { invariant } from '../../lib/utils';

const createPasteEvent = (html) => {
  const text = html.replace('<[^>]*>', '');
  return {
    clipboardData: {
      types: ['text/plain', 'text/html'],
      getData: (type) => (type === 'text/plain' ? text : html),
    },
  };
};

describe('<RichTextEditor />', () => {
  it('should render rich text editor', () => {
    render(<RichTextEditor />);
    expect(screen.getByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
  });

  it('should hide placeholder on focus editor on click', async () => {
    render(<RichTextEditor />);
    expect(screen.queryAllByClass('public-DraftEditorPlaceholder-root')).toHaveLength(1);

    await user.click(screen.getByClass('aui--editor-container'));
    expect(
      screen.getAllByClass('public-DraftEditorPlaceholder-root public-DraftEditorPlaceholder-hasFocus')
    ).toHaveLength(1);
  });

  it('should warn when value is passed and onChange is not', () => {
    render(<RichTextEditor value={RichTextEditor.createEmpty()} />);
    expect(invariant).toHaveBeenCalledWith(
      false,
      'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should set initial state correctly', () => {
    render(<RichTextEditor initialValue={RichTextEditor.stateFromHTML('<b>test</b>')} />);
    expect(screen.getByClass('DraftEditor-root')).toHaveTextContent('test');
  });

  it('should fire onChange correctly', async () => {
    render(<RichTextEditor />);
    const editorNode = screen.getByClass('public-DraftEditor-content');
    const eventProperties = createPasteEvent('<b>123</b>');
    const pasteEvent = createEvent.paste(editorNode, eventProperties);

    fireEvent(editorNode, pasteEvent);
    expect(screen.getByClass('DraftEditor-root')).toHaveTextContent('123');
  });

  it('should pass state if onChange is supplied', () => {
    const onChange = jest.fn();
    render(<RichTextEditor value={RichTextEditor.createEmpty()} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
    const editorNode = screen.getByClass('public-DraftEditor-content');
    const eventProperties = createPasteEvent('<b>123</b>');
    const pasteEvent = createEvent.paste(editorNode, eventProperties);

    fireEvent(editorNode, pasteEvent);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(RichTextEditor.stateToHTML(onChange.mock.calls[1][0])).toEqual('<p><strong>123</strong></p>');
    expect(RichTextEditor.stateToPlainText(onChange.mock.calls[1][0])).toEqual('123');
    expect(RichTextEditor.stateToEntityList(onChange.mock.calls[1][0])).toEqual({});
  });

  it('should correctly handle key commands', () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);

    const editorNode = screen.getByClass('public-DraftEditor-content');
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
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    const editorNode = screen.getByClass('public-DraftEditor-content');
    fireEvent.focus(editorNode);

    fireEvent.keyDown(editorNode, { key: 'b', keyCode: 66, which: 66, ctrlKey: true });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('bold');
  });

  it('should toggle italics', () => {
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(5);
    expect(screen.getAllByTestId('button-wrapper')[1]).toContainElement(screen.getByTestId('italics'));

    fireEvent.mouseDown(screen.getAllByTestId('button-wrapper')[1]);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(RichTextEditor.stateToHTML(onChange.mock.calls[1][0])).toEqual('<p>123</p>');
  });

  it('should correctly generate unordered list', () => {
    const onChange = jest.fn();
    const newState = RichTextEditor.stateFromHTML('123');
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(screen.getAllByTestId('button-wrapper')).toHaveLength(5);
    expect(screen.getAllByTestId('button-wrapper')[4]).toContainElement(screen.getByTestId('number'));

    fireEvent.mouseDown(screen.getAllByTestId('button-wrapper')[4]);

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
      render(<RichTextEditor mentions={contacts} onChange={onChange} />);

      expect(screen.getByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
      expect(screen.getByText('@')).toBeInTheDocument();
    });

    it('should pop up the mention list when user input a @ to the editor', async () => {
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
      render(<RichTextEditor initialValue={newState} mentions={contacts} onChange={onChange} />);
      expect(screen.queryByTestId('rich-text-editor-mention-entry')).not.toBeInTheDocument();

      await user.tab();
      expect(screen.getAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
      expect(screen.getAllByTestId('rich-text-editor-mention-entry')[0]).toHaveClass('aui--mention-entry__is-focused');
    });

    it('should click @ button to trigger mention list', async () => {
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
      render(<RichTextEditor mentions={contacts} onChange={onChange} />);

      await user.click(screen.getByTestId('rich-text-editor-advanced-buttons').children[0]);

      expect(screen.getAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
      expect(screen.getAllByTestId('rich-text-editor-mention-entry')[0]).toHaveClass('aui--mention-entry__is-focused');

      await user.click(screen.getByTestId('rich-text-editor-advanced-buttons').children[0]);
      expect(screen.getAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
    });

    it("should render the avatar with user's initials", async () => {
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
      render(<RichTextEditor mentions={contacts} onChange={onChange} />);

      await user.click(screen.getByTestId('rich-text-editor-advanced-buttons').children[0]);

      expect(screen.getByText('M')).toHaveClass('avatar-component-initials');
      expect(screen.getByText('JK')).toHaveClass('avatar-component-initials');
    });
  });

  describe('file upload feature', () => {
    it('should render file upload button as one of advanced buttons', () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();
      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      expect(screen.getByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('file-download-button')).toBeInTheDocument();
    });

    it('should be able to select a pdf file when clicking file upload button', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();
      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      expect(onFileSelect).toHaveBeenCalledTimes(0);
      await user.click(screen.getByLabelText('Download file'));
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      await user.upload(screen.getByTestId('file-download-input'), file);
      expect(onFileSelect).toHaveBeenCalledTimes(1);
    });

    it('should render file preview list and file sticker close button after file uploaded', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      await user.upload(screen.getByTestId('file-download-input'), file);
      expect(screen.getByTestId('file-preview-list')).toBeInTheDocument();

      await user.hover(screen.getByTestId('file-sticker'));
      expect(screen.getByTestId('file-sticker-close-button')).toBeInTheDocument();

      await user.unhover(screen.getByTestId('file-sticker'));
      expect(screen.queryByTestId('file-sticker-close-button')).not.toBeInTheDocument();
    });

    it('should remove file sticker when clicking close button on it', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      await user.upload(screen.getByTestId('file-download-input'), file);
      expect(screen.getByTestId('file-preview-list')).toBeInTheDocument();

      await user.pointer({ target: screen.getByTestId('file-sticker') });
      await user.pointer(screen.getByTestId('file-sticker-close-button'));
      expect(screen.getByTestId('file-sticker-close-button')).toBeInTheDocument();

      await user.pointer({ keys: '[MouseLeft]', target: screen.getByTestId('file-sticker-close-button') });
      expect(screen.queryByTestId('file-preview-list')).not.toBeInTheDocument();
    });

    it('should show a spinner on the file sticker if no path is returned', async () => {
      const onFileSelect = jest.fn().mockReturnValue(Promise.resolve());
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      await user.upload(screen.getByTestId('file-download-input'), file);
      expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
    });

    it('should render an image for image file using it path', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();

      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      await user.upload(screen.getByTestId('file-download-input'), file);
      expect(screen.getByTestId('file-sticker-image')).toBeInTheDocument();
    });
  });
});
