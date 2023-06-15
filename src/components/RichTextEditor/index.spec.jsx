import React from 'react';
import { screen, render, user, fireEvent, within, waitFor, createEvent } from 'testing';
import { RichUtils } from 'draft-js';
import invariant from '../../invariant';
import RichTextEditor from '.';

jest.mock('../../invariant');

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
    expect(screen.getByClass('public-DraftEditorPlaceholder-root')).toBeInTheDocument();

    await user.click(screen.getByClass('aui--editor-container'));
    expect(
      screen.getByClass('public-DraftEditorPlaceholder-root public-DraftEditorPlaceholder-hasFocus')
    ).toBeInTheDocument();
  });

  it('should warn when value is passed and onChange is not', () => {
    const newState = '123';
    render(<RichTextEditor value={newState} />);
    expect(invariant).toHaveBeenCalledWith(
      false,
      'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should set initial state correctly', () => {
    render(<RichTextEditor initialValue="<b>test</b>" />);
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
    render(<RichTextEditor value={''} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
    const editorNode = screen.getByClass('public-DraftEditor-content');
    const eventProperties = createPasteEvent('<strong>123</strong>');
    const pasteEvent = createEvent.paste(editorNode, eventProperties);

    fireEvent(editorNode, pasteEvent);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('<p><strong>123</strong></p>');
    expect(RichTextEditor.stateToPlainText(RichTextEditor.stateFromHTML(onChange.mock.calls[0][0]))).toEqual('123');
    expect(RichTextEditor.plainTextFromHTML(onChange.mock.calls[0][0])).toEqual('123');

    expect(RichTextEditor.stateToEntityList(RichTextEditor.stateFromHTML(onChange.mock.calls[0][0]))).toEqual({});
  });

  it('should correctly handle key commands', async () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = '123';
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);

    const editorNode = screen.getByClass('public-DraftEditor-content');
    fireEvent.focus(editorNode);
    expect(onChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(editorNode, { key: 'Backspace', keyCode: 8, which: 8 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('<p>12</p>');
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('backspace');
  });

  it('should correctly handle the new state of key commands', () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = '123';
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    const editorNode = screen.getByClass('public-DraftEditor-content');
    fireEvent.focus(editorNode);
    fireEvent.keyDown(editorNode, { key: 'b', keyCode: 66, which: 66, ctrlKey: true });

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('bold');
  });

  it('should toggle italics', async () => {
    jest.spyOn(RichUtils, 'handleKeyCommand');
    const onChange = jest.fn();
    const newState = '123';
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(screen.queryAllByTestId('button-wrapper')).toHaveLength(5);
    expect(screen.queryAllByTestId('button-wrapper')[1]).toContainElement(screen.getByTestId('italics'));

    const editorNode = screen.getByClass('public-DraftEditor-content');
    fireEvent.focus(editorNode);
    fireEvent.mouseDown(screen.queryAllByTestId('button-wrapper')[1]);

    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(editorNode, { key: 'i', keyCode: 73, which: 73, ctrlKey: true });
    expect(RichUtils.handleKeyCommand).toHaveBeenCalledTimes(1);
    expect(RichUtils.handleKeyCommand.mock.calls[0][1]).toEqual('italic');
  });

  it('should correctly generate unordered list', async () => {
    const onChange = jest.fn();
    const newState = '123';
    render(<RichTextEditor initialValue={newState} onChange={onChange} />);

    expect(screen.queryAllByTestId('button-wrapper')).toHaveLength(5);
    expect(screen.queryAllByTestId('button-wrapper')[4]).toContainElement(screen.getByTestId('number'));

    await user.click(screen.getAllByTestId('button-wrapper')[4]);
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
      render(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);

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
      const newState = '@';
      render(<RichTextEditor initialValue={newState} mentions={contacts} onChange={jest.fn()} />);

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
      render(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);

      await user.click(within(screen.getByTestId('rich-text-editor-advanced-buttons')).getByLabelText('Mention'));

      expect(screen.getAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
      expect(screen.getAllByTestId('rich-text-editor-mention-entry')[0]).toHaveClass('aui--mention-entry__is-focused');

      await user.click(within(screen.getByTestId('rich-text-editor-advanced-buttons')).getByLabelText('Mention'));
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
      render(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);

      await user.click(within(screen.getByTestId('rich-text-editor-advanced-buttons')).getByLabelText('Mention'));

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

      await user.upload(screen.getByTestId('file-download-input'), new File(['test'], 'file.pdf'));

      const preview = await screen.findByTestId('file-preview-list');
      await waitFor(() => {
        expect(preview).toBeInTheDocument();
      });

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

      await user.upload(screen.getByTestId('file-download-input'), new File(['test'], 'file.pdf'));

      const preview = await screen.findByTestId('file-preview-list');
      await waitFor(() => {
        expect(preview).toBeInTheDocument();
      });

      await user.hover(screen.getByTestId('file-sticker'));
      expect(screen.getByTestId('file-sticker-close-button')).toBeInTheDocument();
      await user.pointer({ target: screen.getByTestId('file-sticker-close-button'), keys: '[MouseLeft]' });
      await waitFor(() => expect(preview).not.toBeInTheDocument());
    });

    it('should show a spinner on the file sticker if no path is returned', async () => {
      const onFileSelect = jest.fn(() => false);
      const onFileRemove = jest.fn();
      const onChange = jest.fn();
      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      await user.upload(screen.getByTestId('file-download-input'), new File(['test'], 'test.png'));
      expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
    });

    it('should render an image for image file using it path', async () => {
      const onFileSelect = jest.fn(() => 'fake-image-upload.png');
      const onFileRemove = jest.fn();
      const onChange = jest.fn();
      render(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={onFileRemove} onChange={onChange} />);

      await user.upload(screen.getByTestId('file-download-input'), new File(['test'], 'test.png'));

      const preview = await screen.findByTestId('file-preview-list');
      await waitFor(() => {
        expect(preview).toBeInTheDocument();
      });
      expect(screen.getByTestId('file-sticker-image')).toHaveAttribute('src', 'fake-image-upload.png');
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
      render(<Component text="<p>abcdefghijklmnop</p><p>12345678910</p><p>12345678910</p>" />);
      expect(screen.getByTestId('test')).toHaveTextContent('abcdefghijklmnop 1234...');
    });
    it('should customize truncate string', () => {
      render(<Component truncateString="---" text="<p>abcdefghijklmnop</p><p>12345678910</p><p>12345678910</p>" />);
      expect(screen.getByTestId('test')).toHaveTextContent('abcdefghijklmnop 1234---');
    });
    it('should allow no truncate string', () => {
      render(<Component truncateString={null} briefCharCount={5} text="<p>abcdefghijklmnop</p>" />);
      expect(screen.getByTestId('test')).toHaveTextContent('abcde');
    });
    it('should not truncate text shorter than briefCharCount', () => {
      render(<Component briefCharCount={200} text="<p>abcdefghijklmnop</p>" />);
      expect(screen.getByTestId('test')).toHaveTextContent('abcdefghijklmnop');
    });
    it('should work when a whole block needs to be removed', () => {
      render(<Component briefCharCount={16} text="<p>abcdefghijklmnop</p><p>q</p>" />);
      expect(screen.getByTestId('test').innerHTML).toEqual(`<p>abcdefghijklmnop...</p>`);
    });
    it('should retain inline styles', () => {
      render(<Component briefCharCount={16} text="<p>abcdefgh<strong>ijkl</strong>mnopq</p>" />);
      expect(screen.getByTestId('test').innerHTML).toEqual(`<p>abcdefgh<strong>ijkl</strong>mnop...</p>`);
    });
  });
});
