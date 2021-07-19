import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Modifier, EditorState, convertToRaw, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import cc from 'classnames';
import InlineStyleButtons from './InlineStyleButtons';
import BlockStyleButtons from './BlockStyleButtons';
import AdvancedButtons from './AdvancedButtons';
import MentionEntry from './MentionEntry';
import FilePreviewList from './FilePreviewList';
import './styles.scss';

const RichTextEditor = ({
  className,
  value,
  initialValue,
  onChange,
  placeholder,
  contacts,
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

  const [editorState, setEditorState] = React.useState(initialValue || EditorState.createEmpty());
  const [isMentionListOpen, setIsMentionListOpen] = React.useState(false);
  const [mentions, setMentions] = React.useState(contacts);
  const [files, setFiles] = React.useState({});

  const { MentionSuggestions: MentionList, plugins: editorPlugins } = React.useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      mentionPrefix: '@',
      supportWhitespace: true,
      popperOptions: {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [
          { name: 'flip', enabled: false },
          { name: 'preventOverflow', enabled: false },
          { name: 'hide', enabled: false },
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
    if (!value) {
      setEditorState(newState);
    }
    if (onChange) {
      onChange(newState);
    }
  };

  const insertText = (text) => {
    const state = value || editorState;
    const currentContent = state.getCurrentContent();
    const currentSelection = state.getSelection();

    const newContent = Modifier.replaceText(currentContent, currentSelection, text);

    const newEditorState = EditorState.push(state, newContent, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(value || editorState, command);
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
      setMentions(defaultSuggestionsFilter(search.value, contacts));
    },
    [contacts]
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
          editorState={value || editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleOnChange}
          placeholder={placeholder}
          plugins={editorPlugins}
          ref={editor}
          spellCheck
        />
        {!_.isEmpty(contacts) && (
          <MentionList
            open={isMentionListOpen}
            onOpenChange={handleMentionListOpen}
            suggestions={mentions}
            onSearchChange={handleMentionSearchChange}
            entryComponent={MentionEntry}
          />
        )}
      </div>
      <FilePreviewList files={files} onFileRemove={handleFileRemove} />
      <div className="aui--editor-toolbar">
        <div className="aui--editor-style-buttons">
          <InlineStyleButtons editorState={value || editorState} onToggle={handleOnChange} />
          <BlockStyleButtons editorState={value || editorState} onToggle={handleOnChange} />
        </div>
        <div data-testid="rich-text-editor-advanced-buttons" className="aui--editor-advanced-buttons">
          <AdvancedButtons
            mentionEnabled={!_.isEmpty(contacts)}
            onMentionToggle={() => {
              if (isMentionListOpen) return;
              handleOnChange(insertText('@'));
            }}
            fileUploadEnabled={_.isFunction(onFileSelect) && _.isFunction(onFileRemove)}
            fileFilter={fileFilter}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  /** Editor State */
  initialValue: PropTypes.instanceOf(EditorState),
  /** Editor State: Instance of <a href="https://draftjs.org/docs/api-reference-editor-state">draft-js editor state</a> */
  value: PropTypes.instanceOf(EditorState),
  onChange: PropTypes.func,
  contacts: PropTypes.arrayOf(
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
RichTextEditor.createWithText = EditorState.createWithText;
RichTextEditor.stateToHTML = (input) => stateToHTML(input.getCurrentContent());
RichTextEditor.stateFromHTML = (input) => EditorState.createWithContent(stateFromHTML(input));
RichTextEditor.stateToPlainText = (input) => input.getCurrentContent().getPlainText();
RichTextEditor.stateToEntityList = (input) => convertToRaw(input.getCurrentContent()).entityMap;

export default RichTextEditor;
