import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import draftJs from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import cc from 'classnames';
import InlineStyleButtons from './InlineStyleButtons';
import BlockStyleButtons from './BlockStyleButtons';
import MentionAction from './MentionAction';
import FileUploadAction from './FileUploadAction';
import MentionEntry from './MentionEntry';
import FilePreviewList from './FilePreviewList';
import Popover from '../Popover';
import './styles.css';

const { Modifier, EditorState, convertToRaw, RichUtils, SelectionState } = draftJs;

const editorStateToHTML = (input) => stateToHTML(input.getCurrentContent());
const editorStateFromHTML = (input, options = {}) =>
  EditorState.createWithContent(stateFromHTML(input, { parser: options.parser }));
const isEditorStateEmpty = (html) => html === '<p><br></p>';

const getInitialEditorState = (value, initialValue) => {
  if (value) {
    return editorStateFromHTML(value);
  }
  if (initialValue) {
    return editorStateFromHTML(initialValue);
  }
  return EditorState.createEmpty();
};

const RichTextEditor = ({
  className,
  value,
  initialValue,
  onChange,
  placeholder,
  mentions,
  onFileSelect,
  onFileRemove,
  fileFilter,
}) => {
  const editor = React.createRef(null);
  const focusEditor = () => editor.current.focus();
  if (value && !onChange)
    console.warn(
      'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.'
    );

  const classNames = cc('aui--editor-root', className);

  const [editorState, setEditorState] = React.useState(getInitialEditorState(value, initialValue));
  const [isMentionListOpen, setIsMentionListOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState(mentions);
  const [files, setFiles] = React.useState({});

  // https://www.draft-js-plugins.com/plugin/mention
  const { MentionSuggestions: MentionList, plugins: editorPlugins } = React.useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      mentionPrefix: '@',
      supportWhitespace: true,
      popperOptions: {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
          { name: 'flip', enabled: true },
          { name: 'preventOverflow', enabled: false },
          { name: 'hide', enabled: false },
          {
            name: 'offset',
            options: {
              offset: [-12, 12],
            },
          },
        ],
      },
      theme: {
        mention: 'mention', // give className to the mention
      },
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];

    return { plugins, MentionSuggestions };
  }, []);

  const handleOnChange = (newState) => {
    const oldHTML = editorStateToHTML(editorState);
    const newHTML = editorStateToHTML(newState);
    if (oldHTML !== newHTML && onChange) {
      onChange(isEditorStateEmpty(newHTML) ? '' : newHTML);
    }
    setEditorState(newState);
  };

  const insertText = (text) => {
    const state = editorState;
    const currentContent = state.getCurrentContent();
    const currentSelection = state.getSelection();

    const newContent = Modifier.replaceText(currentContent, currentSelection, text);

    const newEditorState = EditorState.push(state, newContent, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleOnChange(newState);
      return true;
    }
    return false;
  };

  const handleMentionListOpen = React.useCallback((open) => {
    setIsMentionListOpen(open);
  }, []);

  const handleMentionSearchChange = React.useCallback(
    (search) => {
      setSuggestions(defaultSuggestionsFilter(search.value, mentions));
    },
    [mentions]
  );

  const handleFileUpload = async (file) => {
    const id = _.uniqueId('file_');
    setFiles((prevState) => ({ ...prevState, [id]: { id, name: file.name, path: '', isUploading: true } }));

    const path = await onFileSelect(file, id);

    if (path) {
      setFiles((prevState) => ({ ...prevState, [id]: { id, name: file.name, path: path, isUploading: false } }));
    }
  };

  const handleFileRemove = async (file) => {
    await onFileRemove(file);
    setFiles((prevState) => {
      const state = { ...prevState };
      delete state[file.id];
      return state;
    });
  };

  return (
    <div data-testid="rich-text-editor-wrapper" className={classNames}>
      <div className="aui--editor-container" onClick={focusEditor}>
        <Editor
          editorKey="editor"
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleOnChange}
          placeholder={placeholder}
          plugins={editorPlugins}
          ref={editor}
          spellCheck
        />
        {!_.isEmpty(mentions) && (
          <MentionList
            open={isMentionListOpen}
            onOpenChange={handleMentionListOpen}
            suggestions={suggestions}
            onSearchChange={handleMentionSearchChange}
            entryComponent={MentionEntry}
            popoverContainer={({ children, ...rest }) => {
              const { popperOptions, store } = rest;
              return (
                <Popover.WithRef
                  popoverClassNames="aui--mention"
                  refElement={store.getReferenceElement()}
                  {...popperOptions}
                  popoverContent={children}
                  isOpen={true}
                />
              );
            }}
          />
        )}
      </div>
      <FilePreviewList files={files} onFileRemove={handleFileRemove} />
      <div className="aui--editor-toolbar">
        <div className="aui--editor-style-buttons">
          <InlineStyleButtons editorState={editorState} onToggle={handleOnChange} />
          <BlockStyleButtons editorState={editorState} onToggle={handleOnChange} />
        </div>
        <div data-testid="rich-text-editor-advanced-buttons" className="aui--editor-advanced-buttons">
          {!_.isEmpty(mentions) && (
            <MentionAction
              onToggle={() => {
                if (isMentionListOpen) return;
                handleOnChange(insertText('@'));
              }}
            />
          )}
          {_.isFunction(onFileSelect) && _.isFunction(onFileRemove) && (
            <FileUploadAction fileFilter={fileFilter} onFileUpload={handleFileUpload} />
          )}
        </div>
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  mentions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
  onFileSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
  fileFilter: PropTypes.string,
};

RichTextEditor.defaultProps = {
  placeholder: 'Tell a story...',
  fileFilter: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.psd,.csv,.zip,.7z',
};

RichTextEditor.createEmpty = EditorState.createEmpty;
RichTextEditor.createWithText = createEditorStateWithText;
RichTextEditor.stateToHTML = editorStateToHTML;
/**
 * @example
 * // parser exaple with dom-purify
 * const DOMPurifyDefaultConfig = {
 *   USE_PROFILES: { html: true },
 *   FORBID_TAGS: ['style'],
 *   FORBID_ATTR: ['style'],
 * };
 * const parser = (html) => DOMPurify.sanitize(html, { ...DOMPurifyConfig, RETURN_DOM: true });
 *
 * RichTextEditor.stateFromHTML(html, { parser });
 **/
RichTextEditor.stateFromHTML = editorStateFromHTML;
RichTextEditor.stateToPlainText = (input) => input.getCurrentContent().getPlainText();
RichTextEditor.stateToEntityList = (input) => convertToRaw(input.getCurrentContent()).entityMap;
RichTextEditor.plainTextFromHTML = (input) => RichTextEditor.stateToPlainText(editorStateFromHTML(input));
RichTextEditor.useTruncateState = ({ editorState, briefCharCount, truncateString }) => {
  const totalCharCount = React.useMemo(() => {
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    return contentState.getPlainText().length - (blocks.length - 1);
  }, [editorState]);

  const truncatedState = React.useMemo(() => {
    // text doesn't exceed limit
    if (totalCharCount <= briefCharCount) {
      return editorState;
    }

    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    const lastBlock = contentState.getLastBlock();

    let anchor = lastBlock;
    let anchorOffset = 0;
    let acc = 0;

    // get the anchor offset and start block of the text to be removed
    for (let i = 0; i < blocks.length; i++) {
      const curr = blocks[i];
      if (curr.getLength() + acc >= briefCharCount) {
        anchor = curr;
        const offset = curr.getLength() + acc - briefCharCount;
        anchorOffset = offset === 0 ? curr.getLength() : -offset;
        break;
      }
      acc += curr.getLength();
    }

    // select from anchor offset to end of last block
    const targetRange = new SelectionState({
      anchorKey: anchor.getKey(),
      anchorOffset,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
    });

    const replaced = Modifier.removeRange(contentState, targetRange, 'forward');

    // insert truncateString at end
    if (truncateString) {
      const end = replaced.getLastBlock();
      const newSelection = SelectionState.createEmpty(anchor.getKey())
        .set('anchorOffset', end.getLength())
        .set('focusOffset', end.getLength());

      const withTruncateString = Modifier.insertText(replaced, newSelection, truncateString, null);

      return EditorState.push(editorState, withTruncateString, 'remove-range');
    }
    return EditorState.push(editorState, replaced, 'remove-range');
  }, [briefCharCount, editorState, totalCharCount, truncateString]);

  return {
    totalCharCount,
    truncatedState,
  };
};

export default RichTextEditor;
