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
const {
  EditorState,
  Modifier,
  convertToRaw,
  RichUtils
} = draftJs;
const RichTextEditor = _ref => {
  let {
    className,
    value,
    initialValue,
    onChange,
    placeholder,
    mentions,
    onFileSelect,
    onFileRemove,
    fileFilter
  } = _ref;
  const editor = /*#__PURE__*/React.createRef(null);
  const focusEditor = () => editor.current.focus();
  if (value && !onChange) console.warn('Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.');
  const classNames = cc('aui--editor-root', className);
  const [editorState, setEditorState] = React.useState(initialValue || EditorState.createEmpty());
  const [isMentionListOpen, setIsMentionListOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState(mentions);
  const [files, setFiles] = React.useState({});

  // https://www.draft-js-plugins.com/plugin/mention
  const {
    MentionSuggestions: MentionList,
    plugins: editorPlugins
  } = React.useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      mentionPrefix: '@',
      supportWhitespace: true,
      popperOptions: {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [{
          name: 'flip',
          enabled: true
        }, {
          name: 'preventOverflow',
          enabled: false
        }, {
          name: 'hide',
          enabled: false
        }, {
          name: 'offset',
          options: {
            offset: [-12, 12]
          }
        }]
      },
      theme: {
        mention: 'mention' // give className to the mention
      }
    });

    const {
      MentionSuggestions
    } = mentionPlugin;
    const plugins = [mentionPlugin];
    return {
      plugins,
      MentionSuggestions
    };
  }, []);
  const handleOnChange = newState => {
    if (!value) {
      setEditorState(newState);
    }
    if (onChange) {
      onChange(newState);
    }
  };
  const insertText = text => {
    const state = value || editorState;
    const currentContent = state.getCurrentContent();
    const currentSelection = state.getSelection();
    const newContent = Modifier.replaceText(currentContent, currentSelection, text);
    const newEditorState = EditorState.push(state, newContent, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  };
  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(value || editorState, command);
    if (newState) {
      handleOnChange(newState);
      return true;
    }
    return false;
  };
  const handleMentionListOpen = React.useCallback(open => {
    setIsMentionListOpen(open);
  }, []);
  const handleMentionSearchChange = React.useCallback(search => {
    setSuggestions(defaultSuggestionsFilter(search.value, mentions));
  }, [mentions]);
  const handleFileUpload = async file => {
    const id = _.uniqueId('file_');
    setFiles(prevState => ({
      ...prevState,
      [id]: {
        id,
        name: file.name,
        path: '',
        isUploading: true
      }
    }));
    const path = await onFileSelect(file, id);
    if (path) {
      setFiles(prevState => ({
        ...prevState,
        [id]: {
          id,
          name: file.name,
          path: path,
          isUploading: false
        }
      }));
    }
  };
  const handleFileRemove = async file => {
    await onFileRemove(file);
    setFiles(prevState => {
      const state = {
        ...prevState
      };
      delete state[file.id];
      return state;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classNames
  }, /*#__PURE__*/React.createElement("div", {
    className: "aui--editor-container",
    onClick: focusEditor
  }, /*#__PURE__*/React.createElement(Editor, {
    editorKey: "editor",
    editorState: value || editorState,
    handleKeyCommand: handleKeyCommand,
    onChange: handleOnChange,
    placeholder: placeholder,
    plugins: editorPlugins,
    ref: editor,
    spellCheck: true
  }), !_.isEmpty(mentions) && /*#__PURE__*/React.createElement(MentionList, {
    open: isMentionListOpen,
    onOpenChange: handleMentionListOpen,
    suggestions: suggestions,
    onSearchChange: handleMentionSearchChange,
    entryComponent: MentionEntry,
    popoverContainer: _ref2 => {
      let {
        children,
        ...rest
      } = _ref2;
      const {
        popperOptions,
        store
      } = rest;
      return /*#__PURE__*/React.createElement(Popover.WithRef, Object.assign({
        popoverClassNames: "aui--mention",
        refElement: store.getReferenceElement()
      }, popperOptions, {
        popoverContent: children,
        isOpen: true
      }));
    }
  })), /*#__PURE__*/React.createElement(FilePreviewList, {
    files: files,
    onFileRemove: handleFileRemove
  }), /*#__PURE__*/React.createElement("div", {
    className: "aui--editor-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aui--editor-style-buttons"
  }, /*#__PURE__*/React.createElement(InlineStyleButtons, {
    editorState: value || editorState,
    onToggle: handleOnChange
  }), /*#__PURE__*/React.createElement(BlockStyleButtons, {
    editorState: value || editorState,
    onToggle: handleOnChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "aui--editor-advanced-buttons"
  }, !_.isEmpty(mentions) && /*#__PURE__*/React.createElement(MentionAction, {
    onToggle: () => {
      if (isMentionListOpen) return;
      handleOnChange(insertText('@'));
    }
  }), _.isFunction(onFileSelect) && _.isFunction(onFileRemove) && /*#__PURE__*/React.createElement(FileUploadAction, {
    fileFilter: fileFilter,
    onFileUpload: handleFileUpload
  }))));
};
RichTextEditor.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  /** Editor State */
  initialValue: PropTypes.instanceOf(EditorState),
  /** Editor State: Instance of <a href="https://draftjs.org/docs/api-reference-editor-state">draft-js editor state</a> */
  value: PropTypes.instanceOf(EditorState),
  onChange: PropTypes.func,
  mentions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    avatar: PropTypes.string
  })),
  onFileSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
  fileFilter: PropTypes.string
};
RichTextEditor.defaultProps = {
  placeholder: 'Tell a story...',
  fileFilter: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.psd,.csv,.zip,.7z'
};
RichTextEditor.createEmpty = EditorState.createEmpty;
RichTextEditor.createWithText = createEditorStateWithText;
RichTextEditor.stateToHTML = input => stateToHTML(input.getCurrentContent());
RichTextEditor.stateFromHTML = input => EditorState.createWithContent(stateFromHTML(input));
RichTextEditor.stateToPlainText = input => input.getCurrentContent().getPlainText();
RichTextEditor.stateToEntityList = input => convertToRaw(input.getCurrentContent()).entityMap;
export default RichTextEditor;