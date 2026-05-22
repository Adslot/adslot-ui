import React from 'react';
import _ from 'lodash';
import { screen, render, user, waitFor, renderHook, act, fireEvent } from 'testing';
import { $createParagraphNode, $createTextNode, $getRoot, $setSelection } from 'lexical';
import invariant from '../../invariant';
import RichTextEditor from '.';
import { MentionNode, $isMentionNode } from './MentionNode';
import { onError } from './helpers';
import ToolbarButton from './ToolbarButton';
import FileUploadAction from './FileUploadAction';

jest.mock('../../invariant');

const getEditor = () => screen.getByClass('aui--editor-content');

// jsdom cannot faithfully simulate contenteditable typing, so editor-content
// behaviour is exercised by driving the Lexical instance directly. Lexical
// stores the editor on its root element.
const getEditorInstance = () => getEditor().__lexicalEditor;

const updateEditor = (mutator) =>
  act(() => {
    getEditorInstance().update(mutator, { discrete: true });
  });

// Lexical seeds its initial content and placeholder visibility in a microtask
// after mount; flush it inside act so those updates do not leak past the test.
const renderEditor = async (ui) => {
  const utils = render(ui);
  await act(async () => {
    await Promise.resolve();
  });
  return utils;
};

const INVARIANT_MESSAGE =
  'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.';

// jsdom does not implement Range.getBoundingClientRect / getClientRects, which
// Lexical's typeahead menu calls to position itself.
beforeAll(() => {
  if (!Range.prototype.getBoundingClientRect) {
    Range.prototype.getBoundingClientRect = () => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    });
  }
  if (!Range.prototype.getClientRects) {
    Range.prototype.getClientRects = () => [];
  }
});

describe('<RichTextEditor />', () => {
  describe('rendering', () => {
    it('should render the editor wrapper', async () => {
      await renderEditor(<RichTextEditor />);
      expect(screen.getByTestId('rich-text-editor-wrapper')).toBeInTheDocument();
    });

    it('should render the default placeholder', async () => {
      await renderEditor(<RichTextEditor />);
      expect(screen.getByText('Tell a story...')).toBeInTheDocument();
    });

    it('should render a custom placeholder', async () => {
      await renderEditor(<RichTextEditor placeholder="Write here" />);
      expect(screen.getByText('Write here')).toBeInTheDocument();
    });

    it('should apply a custom className to the root', async () => {
      await renderEditor(<RichTextEditor className="custom-class" />);
      expect(screen.getByTestId('rich-text-editor-wrapper')).toHaveClass('aui--editor-root', 'custom-class');
    });

    it('should render the toolbar with the block-type select and inline buttons', async () => {
      await renderEditor(<RichTextEditor />);
      expect(screen.getByTestId('rich-text-editor-block-type')).toBeInTheDocument();
      [
        'bold',
        'italics',
        'underline',
        'strikethrough',
        'undo',
        'redo',
        'align',
        'indent',
        'outdent',
        'link',
        'insert-table',
      ].forEach((testId) => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
      // The inline-code toolbar button was removed; the format still
      // round-trips through pasted/imported HTML, but no UI exposes it.
      expect(screen.queryByTestId('inline-code')).not.toBeInTheDocument();
    });

    it('should give every toolbar button a hover tooltip', async () => {
      await renderEditor(<RichTextEditor />);
      const expectations = {
        bold: 'Bold',
        italics: 'Italic',
        underline: 'Underline',
        strikethrough: 'Strikethrough',
        undo: 'Undo',
        redo: 'Redo',
        align: 'Alignment',
        indent: 'Increase indent',
        outdent: 'Decrease indent',
        link: 'Insert or edit link',
        'insert-table': 'Insert table',
      };
      _.forEach(expectations, (tooltip, testId) => {
        const button = screen.getByTestId(testId).closest('button');
        // We rely on data-tooltip + CSS for the visible hover popover;
        // omitting `title` avoids the browser layering its own tooltip on top.
        expect(button).toHaveAttribute('data-tooltip', tooltip);
        expect(button).not.toHaveAttribute('title');
      });
      expect(screen.getByTestId('rich-text-editor-block-type')).toHaveAttribute('title', 'Text style');
    });
  });

  describe('invariant warning', () => {
    it('should warn when value is provided without onChange', async () => {
      await renderEditor(<RichTextEditor value="<p>hello</p>" />);
      expect(invariant).toHaveBeenCalledWith(false, INVARIANT_MESSAGE);
    });

    it('should not warn when value is provided with onChange', async () => {
      await renderEditor(<RichTextEditor value="<p>hello</p>" onChange={jest.fn()} />);
      expect(invariant).toHaveBeenCalledWith(true, INVARIANT_MESSAGE);
    });
  });

  describe('initial content', () => {
    it('should seed the editor from initialValue', async () => {
      await renderEditor(<RichTextEditor initialValue="<b>test</b>" />);
      expect(getEditor()).toHaveTextContent('test');
    });

    it('should seed the editor from value', async () => {
      await renderEditor(<RichTextEditor value="<p>hello world</p>" onChange={jest.fn()} />);
      expect(getEditor()).toHaveTextContent('hello world');
    });

    it('should prefer value over initialValue', async () => {
      await renderEditor(
        <RichTextEditor value="<p>from value</p>" initialValue="<p>from initial</p>" onChange={jest.fn()} />
      );
      expect(getEditor()).toHaveTextContent('from value');
      expect(getEditor()).not.toHaveTextContent('from initial');
    });

    it('should render bullet and numbered list content', async () => {
      await renderEditor(<RichTextEditor initialValue="<ul><li>one</li></ul><ol><li>two</li></ol>" />);
      expect(getEditor().querySelector('ul')).toBeInTheDocument();
      expect(getEditor().querySelector('ol')).toBeInTheDocument();
      expect(getEditor()).toHaveTextContent('one');
      expect(getEditor()).toHaveTextContent('two');
    });

    it('should treat whitespace-only initialValue as empty and show the placeholder', async () => {
      await renderEditor(<RichTextEditor initialValue="   " />);
      expect(screen.getByText('Tell a story...')).toBeInTheDocument();
    });

    it('should hide the placeholder when seeded with content', async () => {
      await renderEditor(<RichTextEditor initialValue="<p>seeded</p>" />);
      expect(screen.queryByText('Tell a story...')).not.toBeInTheDocument();
    });
  });

  describe('onChange', () => {
    it('should not fire onChange on mount', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="<p>seeded</p>" onChange={onChange} />);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should fire onChange with HTML when the content changes', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="<p>before</p>" onChange={onChange} />);
      updateEditor(() => {
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode('Hello'));
        $getRoot().append(paragraph);
      });
      expect(onChange).toHaveBeenCalled();
      const html = onChange.mock.calls.at(-1)[0];
      expect(html).toContain('Hello');
      expect(html).toContain('<p');
    });

    it('should emit an empty string when all content is removed', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="<p>Hi</p>" onChange={onChange} />);
      updateEditor(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode());
      });
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls.at(-1)[0]).toEqual('');
    });

    it('should not throw when the content changes without an onChange handler', async () => {
      await renderEditor(<RichTextEditor initialValue="<p>before</p>" />);
      expect(() => updateEditor(() => $getRoot().append($createParagraphNode()))).not.toThrow();
    });

    it('should not re-emit onChange when an update produces identical HTML', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="<p>same</p>" onChange={onChange} />);
      updateEditor(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode('same'));
        root.append(paragraph);
      });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should re-sync editor content when controlled value changes externally', async () => {
      const onChange = jest.fn();
      const { rerender } = await renderEditor(<RichTextEditor value="<p>first</p>" onChange={onChange} />);
      rerender(<RichTextEditor value="<p>second</p>" onChange={onChange} />);
      await act(async () => {
        await Promise.resolve();
      });
      expect(getEditor()).toHaveTextContent('second');
      expect(getEditor()).not.toHaveTextContent('first');
    });
  });

  describe('loadHTMLInto', () => {
    it('replaces editor content and fires onChange', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor onChange={onChange} />);
      onChange.mockClear();
      act(() => RichTextEditor.loadHTMLInto(getEditorInstance(), '<p>hello</p>'));
      expect(getEditor()).toHaveTextContent('hello');
      expect(onChange).toHaveBeenCalledWith(expect.stringContaining('hello'));
    });

    it('clears existing content before loading new HTML', async () => {
      await renderEditor(<RichTextEditor initialValue="<p>first</p>" />);
      act(() => RichTextEditor.loadHTMLInto(getEditorInstance(), '<p>second</p>'));
      expect(getEditor()).toHaveTextContent('second');
      expect(getEditor()).not.toHaveTextContent('first');
    });

    it('treats empty/null html as clearing the editor', async () => {
      await renderEditor(<RichTextEditor initialValue="<p>something</p>" />);
      act(() => RichTextEditor.loadHTMLInto(getEditorInstance(), ''));
      expect(getEditor()).not.toHaveTextContent('something');
    });
  });

  describe('maxLength', () => {
    it('is unbounded by default — no counter rendered, no input cap', async () => {
      await renderEditor(<RichTextEditor />);
      updateEditor(() => {
        $getRoot().selectEnd();
        $getRoot().selectEnd().insertText('abcdef');
      });
      expect(getEditor()).toHaveTextContent('abcdef');
      expect(screen.queryByTestId('rich-text-editor-counter')).not.toBeInTheDocument();
    });

    it('hard-blocks input past a custom maxLength', async () => {
      await renderEditor(<RichTextEditor maxLength={4} />);
      updateEditor(() => {
        $getRoot().selectEnd();
        $getRoot().selectEnd().insertText('abcdef');
      });
      expect(getEditor()).toHaveTextContent('abcd');
      expect(screen.getByTestId('rich-text-editor-counter')).toHaveTextContent('4 / 4');
    });

    it('hides the counter and disables limiting when maxLength is explicitly Infinity', async () => {
      await renderEditor(<RichTextEditor maxLength={Infinity} />);
      updateEditor(() => {
        $getRoot().selectEnd();
        $getRoot().selectEnd().insertText('abcdef');
      });
      expect(getEditor()).toHaveTextContent('abcdef');
      expect(screen.queryByTestId('rich-text-editor-counter')).not.toBeInTheDocument();
    });
  });

  describe('pastePlainText', () => {
    it('strips formatting on paste when pastePlainText is set', async () => {
      await renderEditor(<RichTextEditor pastePlainText />);
      updateEditor(() => $getRoot().selectStart());

      fireEvent.paste(getEditor(), {
        clipboardData: {
          getData: (type) => (type === 'text/plain' ? 'plain words' : '<strong>plain words</strong>'),
          types: ['text/plain', 'text/html'],
        },
      });
      await act(async () => {
        await Promise.resolve();
      });

      expect(getEditor().querySelector('strong')).toBeNull();
      expect(getEditor()).toHaveTextContent('plain words');
    });
  });

  describe('toolbar formatting', () => {
    it('should insert a numbered list and fire onChange', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="123" onChange={onChange} />);
      updateEditor(() => $getRoot().getFirstChild().selectEnd());
      await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'number');
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls.at(-1)[0]).toContain('<ol');
    });

    it('should insert a bullet list and fire onChange', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="123" onChange={onChange} />);
      updateEditor(() => $getRoot().getFirstChild().selectEnd());
      await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'bullet');
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls.at(-1)[0]).toContain('<ul');
    });

    it('should reflect the active block type in the toolbar select', async () => {
      await renderEditor(<RichTextEditor initialValue="123" onChange={jest.fn()} />);
      updateEditor(() => $getRoot().getFirstChild().selectEnd());
      await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'bullet');
      await waitFor(() => {
        expect(screen.getByTestId('rich-text-editor-block-type')).toHaveValue('bullet');
      });
    });

    it('should remove a list when Normal is selected', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="<ul><li>item</li></ul>" onChange={onChange} />);
      updateEditor(() => $getRoot().getFirstChild().getFirstChild().selectEnd());
      await user.selectOptions(screen.getByTestId('rich-text-editor-block-type'), 'paragraph');
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls.at(-1)[0]).not.toContain('<ul');
    });

    it.each([
      ['bold', /<(b|strong)[ >]/],
      ['italics', /<(i|em)[ >]/],
      ['underline', /(<u[ >]|text-decoration:\s*underline)/],
    ])('should apply %s formatting to the selected text', async (testId, pattern) => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor initialValue="format me" onChange={onChange} />);
      updateEditor(() => {
        const textNode = $getRoot().getFirstChild().getFirstChild();
        textNode.select(0, textNode.getTextContentSize());
      });
      await user.click(screen.getByTestId(testId));
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls.at(-1)[0]).toMatch(pattern);
    });
  });

  describe('disabled', () => {
    it('should render a read-only editor when disabled', async () => {
      await renderEditor(<RichTextEditor disabled initialValue="<p>locked</p>" />);
      expect(getEditor()).toHaveAttribute('contenteditable', 'false');
    });

    it('should become editable when disabled changes to false', async () => {
      const { rerender } = await renderEditor(<RichTextEditor disabled />);
      expect(getEditor()).toHaveAttribute('contenteditable', 'false');
      rerender(<RichTextEditor disabled={false} />);
      await act(async () => {
        await Promise.resolve();
      });
      expect(getEditor()).toHaveAttribute('contenteditable', 'true');
    });
  });

  describe('mentions', () => {
    const contacts = [
      { name: 'Matthew Russell', title: 'Senior Software Engineer' },
      { name: 'Julian Krispel-Samsel', title: 'United Kingdom' },
    ];

    const typeMentionQuery = (query) =>
      updateEditor(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        const text = $createTextNode(`@${query}`);
        paragraph.append(text);
        root.append(paragraph);
        text.select(query.length + 1, query.length + 1);
      });

    it('should render the @ mention button when mentions are provided', async () => {
      await renderEditor(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);
      expect(screen.getByLabelText('Mention')).toBeInTheDocument();
    });

    it('should not render the @ mention button without mentions', async () => {
      await renderEditor(<RichTextEditor onChange={jest.fn()} />);
      expect(screen.queryByLabelText('Mention')).not.toBeInTheDocument();
    });

    it('should open the mention menu filtered by the typed query', async () => {
      await renderEditor(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);
      typeMentionQuery('Mat');
      const entries = await screen.findAllByTestId('rich-text-editor-mention-entry');
      expect(entries).toHaveLength(1);
      expect(entries[0]).toHaveTextContent('Matthew Russell');
    });

    it('should insert a mention when a suggestion is selected', async () => {
      const onChange = jest.fn();
      await renderEditor(<RichTextEditor mentions={contacts} onChange={onChange} />);
      typeMentionQuery('Mat');
      await user.click(await screen.findByTestId('rich-text-editor-mention-entry'));
      expect(onChange).toHaveBeenCalled();
      const html = onChange.mock.calls.at(-1)[0];
      expect(html).toContain('data-lexical-mention');
      expect(html).toContain('@Matthew Russell');
    });

    it('should render mentions from initial HTML content', async () => {
      await renderEditor(
        <RichTextEditor
          mentions={contacts}
          initialValue='<p><span data-lexical-mention="true" class="mention">@Matthew Russell</span></p>'
          onChange={jest.fn()}
        />
      );
      const mention = getEditor().querySelector('.mention');
      expect(mention).toBeInTheDocument();
      expect(mention).toHaveTextContent('@Matthew Russell');
    });

    it('should open the menu when the mention toolbar button is clicked', async () => {
      await renderEditor(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);
      updateEditor(() => $getRoot().selectEnd());
      await user.click(screen.getByLabelText('Mention'));
      expect(await screen.findAllByTestId('rich-text-editor-mention-entry')).toHaveLength(2);
    });

    it('should render a suggestion for a single-word mention name', async () => {
      await renderEditor(<RichTextEditor mentions={[{ name: 'Cher' }]} onChange={jest.fn()} />);
      updateEditor(() => $getRoot().selectEnd());
      await user.click(screen.getByLabelText('Mention'));
      expect(await screen.findByText('Cher')).toBeInTheDocument();
    });

    it('should insert nothing when the mention button is clicked without a selection', async () => {
      await renderEditor(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);
      updateEditor(() => $setSelection(null));
      await user.click(screen.getByLabelText('Mention'));
      expect(screen.queryByTestId('rich-text-editor-mention-entry')).not.toBeInTheDocument();
    });

    it('should show no suggestions when the query matches nobody', async () => {
      await renderEditor(<RichTextEditor mentions={contacts} onChange={jest.fn()} />);
      updateEditor(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        const text = $createTextNode('@zzzzz');
        paragraph.append(text);
        root.append(paragraph);
        text.select(6, 6);
      });
      await waitFor(() => {
        expect(screen.queryByTestId('rich-text-editor-mention-entry')).not.toBeInTheDocument();
      });
    });
  });

  describe('RichTextEditor.plainTextFromHTML', () => {
    it('should extract plain text from HTML', () => {
      expect(RichTextEditor.plainTextFromHTML('<p><strong>123</strong></p>')).toEqual('123');
    });

    it('should join block-level elements with newlines', () => {
      expect(RichTextEditor.plainTextFromHTML('<p>one</p><p>two</p>')).toEqual('one\ntwo');
    });

    it('should return an empty string for empty input', () => {
      expect(RichTextEditor.plainTextFromHTML('')).toEqual('');
    });

    it('should fall back to text content when there are no block elements', () => {
      expect(RichTextEditor.plainTextFromHTML('plain text')).toEqual('plain text');
    });

    it('should return an empty string for markup with no text', () => {
      expect(RichTextEditor.plainTextFromHTML('<div></div>')).toEqual('');
    });
  });

  describe('state helpers', () => {
    const truncate = (html, options = {}) => {
      const editorState = RichTextEditor.stateFromHTML(html);
      const { result } = renderHook(() =>
        RichTextEditor.useTruncateState({ editorState, briefCharCount: 20, truncateString: '...', ...options })
      );
      return {
        totalCharCount: result.current.totalCharCount,
        html: RichTextEditor.stateToHTML(result.current.truncatedState),
      };
    };

    it('should round-trip HTML through stateFromHTML and stateToHTML', () => {
      const html = RichTextEditor.stateToHTML(RichTextEditor.stateFromHTML('<p>hello</p>'));
      expect(html).toContain('hello');
      expect(html).toContain('<p');
    });

    it('should support a custom parser', () => {
      const parser = jest.fn((html) => new DOMParser().parseFromString(html, 'text/html'));
      const state = RichTextEditor.stateFromHTML('<p>parsed</p>', { parser });
      expect(parser).toHaveBeenCalledWith('<p>parsed</p>');
      expect(RichTextEditor.stateToHTML(state)).toContain('parsed');
    });

    it('should report the total character count', () => {
      expect(truncate('<p>abc</p><p>de</p>').totalCharCount).toEqual(5);
    });

    it('should truncate content to briefCharCount and append the truncate string', () => {
      const { html } = truncate('<p>abcdefghijklmnopqrstuvwxyz</p>', { briefCharCount: 10 });
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('abcdefghij...');
    });

    it('should support a custom truncate string', () => {
      const { html } = truncate('<p>abcdefghijklmnopqrstuvwxyz</p>', { briefCharCount: 10, truncateString: ' [more]' });
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('abcdefghij [more]');
    });

    it('should not truncate content shorter than briefCharCount', () => {
      const { html } = truncate('<p>short</p>', { briefCharCount: 100 });
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('short');
    });

    it('should drop whole blocks beyond the truncation point', () => {
      const { html } = truncate('<p>abcdefghij</p><p>klmnop</p>', { briefCharCount: 10 });
      expect(html).toContain('abcdefghij');
      expect(html).not.toContain('klmnop');
    });

    it('should retain inline formatting within the truncated text', () => {
      const { html } = truncate('<p>abcdef<strong>ghij</strong>klmnop</p>', { briefCharCount: 12 });
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('abcdefghijkl...');
      expect(html).toMatch(/<(strong|b)[ >]/);
    });

    it('should truncate without appending a truncate string', () => {
      const { html } = truncate('<p>abcdefghijklmnopqrstuvwxyz</p>', { briefCharCount: 8, truncateString: '' });
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('abcdefgh');
    });

    it('should keep a mention intact when truncating', () => {
      const editorState = RichTextEditor.stateFromHTML(
        '<p><span data-lexical-mention="true" class="mention">@Matthew Russell</span> plus a good deal of trailing text</p>'
      );
      const { result } = renderHook(() =>
        RichTextEditor.useTruncateState({ editorState, briefCharCount: 30, truncateString: '...' })
      );
      const html = RichTextEditor.stateToHTML(result.current.truncatedState);
      expect(html).toContain('data-lexical-mention');
      expect(html).toContain('@Matthew Russell');
    });

    it('should round-trip a mention through stateFromHTML and stateToHTML', () => {
      const html = RichTextEditor.stateToHTML(
        RichTextEditor.stateFromHTML(
          '<p><span data-lexical-mention="true" data-lexical-mention-name="Matthew Russell" class="mention">' +
            '@Matthew Russell</span></p>'
        )
      );
      expect(html).toContain('data-lexical-mention');
      expect(html).toContain('@Matthew Russell');
    });

    it('should handle truncation to zero characters', () => {
      const { html } = truncate('<p>abc</p>', { briefCharCount: 0 });
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('');
    });
  });

  describe('file upload feature', () => {
    it('should render the file upload button as an advanced button', async () => {
      await renderEditor(<RichTextEditor onFileSelect={jest.fn()} onFileRemove={jest.fn()} onChange={jest.fn()} />);
      expect(screen.getByTestId('file-upload-button')).toBeInTheDocument();
    });

    it('should not render the file upload button without file handlers', async () => {
      await renderEditor(<RichTextEditor onChange={jest.fn()} />);
      expect(screen.queryByTestId('file-upload-button')).not.toBeInTheDocument();
    });

    it('should call onFileSelect when a file is chosen', async () => {
      const onFileSelect = jest.fn(() => 'fake-path');
      await renderEditor(<RichTextEditor onFileSelect={onFileSelect} onFileRemove={jest.fn()} onChange={jest.fn()} />);
      await user.click(screen.getByLabelText('Upload file'));
      await user.upload(screen.getByTestId('file-upload-input'), new File(['test'], 'test.pdf'));
      expect(onFileSelect).toHaveBeenCalledTimes(1);
    });

    it('should render the file preview and a close button on hover after upload', async () => {
      await renderEditor(
        <RichTextEditor onFileSelect={jest.fn(() => 'fake-path')} onFileRemove={jest.fn()} onChange={jest.fn()} />
      );

      await user.upload(screen.getByTestId('file-upload-input'), new File(['test'], 'file.pdf'));
      const preview = await screen.findByTestId('file-preview-list');
      expect(preview).toBeInTheDocument();

      await user.hover(screen.getByTestId('file-sticker'));
      expect(screen.getByTestId('file-sticker-close-button')).toBeInTheDocument();

      await user.unhover(screen.getByTestId('file-sticker'));
      expect(screen.queryByTestId('file-sticker-close-button')).not.toBeInTheDocument();
    });

    it('should remove the file sticker when the close button is clicked', async () => {
      const onFileRemove = jest.fn();
      await renderEditor(
        <RichTextEditor onFileSelect={jest.fn(() => 'fake-path')} onFileRemove={onFileRemove} onChange={jest.fn()} />
      );

      await user.upload(screen.getByTestId('file-upload-input'), new File(['test'], 'file.pdf'));
      const preview = await screen.findByTestId('file-preview-list');

      await user.hover(screen.getByTestId('file-sticker'));
      await user.pointer({ target: screen.getByTestId('file-sticker-close-button'), keys: '[MouseLeft]' });

      expect(onFileRemove).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(preview).not.toBeInTheDocument());
    });

    it('should show a spinner while a file has no path', async () => {
      await renderEditor(
        <RichTextEditor onFileSelect={jest.fn(() => false)} onFileRemove={jest.fn()} onChange={jest.fn()} />
      );
      await user.upload(screen.getByTestId('file-upload-input'), new File(['test'], 'test.png'));
      expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument();
    });

    it('should render an image preview for image files', async () => {
      await renderEditor(
        <RichTextEditor
          onFileSelect={jest.fn(() => 'fake-image-upload.png')}
          onFileRemove={jest.fn()}
          onChange={jest.fn()}
        />
      );
      await user.upload(screen.getByTestId('file-upload-input'), new File(['test'], 'test.png'));
      const image = await screen.findByTestId('file-sticker-image');
      expect(image).toHaveAttribute('src', 'fake-image-upload.png');
    });

    it('should disable the file upload input when disabled', async () => {
      await renderEditor(
        <RichTextEditor disabled onFileSelect={jest.fn()} onFileRemove={jest.fn()} onChange={jest.fn()} />
      );
      expect(screen.getByTestId('file-upload-input')).toBeDisabled();
    });
  });

  describe('HTML import edge cases', () => {
    it('should wrap consecutive top-level inline nodes into a single paragraph', async () => {
      await renderEditor(<RichTextEditor initialValue="<b>bold</b><i>italic</i>" />);
      expect(getEditor()).toHaveTextContent('bolditalic');
      expect(getEditor().querySelectorAll('p')).toHaveLength(1);
    });

    it('should drop whitespace between block elements on import', async () => {
      await renderEditor(<RichTextEditor initialValue={'<p>one</p>\n   <p>two</p>'} />);
      expect(getEditor().querySelectorAll('p')).toHaveLength(2);
    });

    it('should skip a leading line break that has no block context', async () => {
      await renderEditor(<RichTextEditor initialValue="<br><p>kept</p>" />);
      expect(getEditor()).toHaveTextContent('kept');
    });

    it('should import a non-mention span as plain text', () => {
      const html = RichTextEditor.stateToHTML(RichTextEditor.stateFromHTML('<p><span>plain span</span></p>'));
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('plain span');
      expect(html).not.toContain('data-lexical-mention');
    });

    it('should round-trip an empty HTML string', () => {
      const html = RichTextEditor.stateToHTML(RichTextEditor.stateFromHTML(''));
      expect(RichTextEditor.plainTextFromHTML(html)).toEqual('');
    });
  });

  describe('rich node round-trip', () => {
    const roundTrip = (html) => RichTextEditor.stateToHTML(RichTextEditor.stateFromHTML(html));

    it('preserves headings', () => {
      expect(roundTrip('<h1>Title</h1>')).toContain('<h1');
      expect(roundTrip('<h2>Sub</h2>')).toContain('<h2');
      expect(roundTrip('<h3>Small</h3>')).toContain('<h3');
    });

    it('preserves blockquotes', () => {
      expect(roundTrip('<blockquote>Quote</blockquote>')).toContain('<blockquote');
    });

    it('preserves links', () => {
      const html = roundTrip('<p><a href="https://example.com">link</a></p>');
      expect(html).toContain('href="https://example.com"');
    });

    it('preserves tables', () => {
      const html = roundTrip('<table><tr><td>a</td><td>b</td></tr></table>');
      expect(html).toContain('<table');
      expect(html).toContain('a');
      expect(html).toContain('b');
    });
  });

  describe('MentionNode', () => {
    it('should behave as an atomic text entity', async () => {
      await renderEditor(<RichTextEditor mentions={[{ name: 'Someone' }]} onChange={jest.fn()} />);
      let probe;
      updateEditor(() => {
        const node = new MentionNode('@Someone');
        probe = {
          type: MentionNode.getType(),
          text: node.getTextContent(),
          isTextEntity: node.isTextEntity(),
          canInsertBefore: node.canInsertTextBefore(),
          canInsertAfter: node.canInsertTextAfter(),
          isMention: $isMentionNode(node),
          paragraphIsNotMention: $isMentionNode($createParagraphNode()),
        };
      });
      expect(probe).toEqual({
        type: 'mention',
        text: '@Someone',
        isTextEntity: true,
        canInsertBefore: false,
        canInsertAfter: false,
        isMention: true,
        paragraphIsNotMention: false,
      });
    });

    it('should drop a mention whole when truncation would cut through it', () => {
      const editorState = RichTextEditor.stateFromHTML(
        '<p><span data-lexical-mention="true" class="mention">@Bob</span> and a good deal more text</p>'
      );
      const { result } = renderHook(() =>
        RichTextEditor.useTruncateState({ editorState, briefCharCount: 2, truncateString: '...' })
      );
      expect(RichTextEditor.stateToHTML(result.current.truncatedState)).not.toContain('data-lexical-mention');
    });
  });

  describe('component internals', () => {
    it('should log editor errors via onError without re-throwing', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('lexical update failed');
      expect(() => onError(error)).not.toThrow();
      expect(consoleError).toHaveBeenCalledWith(error);
    });

    it('should render a ToolbarButton enabled and inactive by default', () => {
      render(<ToolbarButton label={<span data-testid="toolbar-label">B</span>} onToggle={jest.fn()} />);
      expect(screen.getByTestId('toolbar-label')).toBeInTheDocument();
    });

    it('should ignore a FileUploadAction change event with no file selected', () => {
      const onFileUpload = jest.fn();
      render(<FileUploadAction onFileUpload={onFileUpload} fileFilter=".pdf" />);
      fireEvent.change(screen.getByTestId('file-upload-input'), { target: { files: [] } });
      expect(onFileUpload).not.toHaveBeenCalled();
    });
  });
});
