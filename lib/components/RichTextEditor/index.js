"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _draftJs = _interopRequireDefault(require("draft-js"));
var _editor = _interopRequireWildcard(require("@draft-js-plugins/editor"));
var _draftJsExportHtml = require("draft-js-export-html");
var _draftJsImportHtml = require("draft-js-import-html");
var _mention = _interopRequireWildcard(require("@draft-js-plugins/mention"));
var _classnames = _interopRequireDefault(require("classnames"));
var _InlineStyleButtons = _interopRequireDefault(require("./InlineStyleButtons"));
var _BlockStyleButtons = _interopRequireDefault(require("./BlockStyleButtons"));
var _MentionAction = _interopRequireDefault(require("./MentionAction"));
var _FileUploadAction = _interopRequireDefault(require("./FileUploadAction"));
var _MentionEntry = _interopRequireDefault(require("./MentionEntry"));
var _FilePreviewList = _interopRequireDefault(require("./FilePreviewList"));
var _Popover = _interopRequireDefault(require("../Popover"));
var _invariant = _interopRequireDefault(require("../../invariant"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const {
  Modifier,
  EditorState,
  ContentState,
  convertToRaw,
  RichUtils,
  SelectionState
} = _draftJs.default;
const editorStateToHTML = input => (0, _draftJsExportHtml.stateToHTML)(input.getCurrentContent());
const editorStateFromHTML = (input, options = {}) => EditorState.createWithContent((0, _draftJsImportHtml.stateFromHTML)(input, {
  parser: options.parser
}));
const isEditorStateEmpty = html => html === '<p><br></p>';
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
  placeholder = 'Tell a story...',
  mentions,
  onFileSelect,
  onFileRemove,
  fileFilter = '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.psd,.csv,.zip,.7z',
  disabled = false
}) => {
  const editor = /*#__PURE__*/_react.default.createRef(null);
  const focusEditor = () => editor.current.focus();
  (0, _invariant.default)(!(value && !onChange), 'Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.');
  const classNames = (0, _classnames.default)('aui--editor-root', className);
  const [editorState, setEditorState] = _react.default.useState(getInitialEditorState(value, initialValue));
  const [isMentionListOpen, setIsMentionListOpen] = _react.default.useState(false);
  const [suggestions, setSuggestions] = _react.default.useState(mentions);
  const [files, setFiles] = _react.default.useState({});

  // https://www.draft-js-plugins.com/plugin/mention
  const {
    MentionSuggestions: MentionList,
    plugins: editorPlugins
  } = _react.default.useMemo(() => {
    const mentionPlugin = (0, _mention.default)({
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
    const oldHTML = editorStateToHTML(editorState);
    const newHTML = editorStateToHTML(newState);
    if (oldHTML !== newHTML && onChange) {
      onChange(isEditorStateEmpty(newHTML) ? '' : newHTML);
    }
    setEditorState(newState);
  };
  const insertText = text => {
    const state = editorState;
    const currentContent = state.getCurrentContent();
    const currentSelection = state.getSelection();
    const newContent = Modifier.replaceText(currentContent, currentSelection, text);
    const newEditorState = EditorState.push(state, newContent, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  };
  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleOnChange(newState);
      return true;
    }
    return false;
  };
  const handleMentionListOpen = _react.default.useCallback(open => {
    setIsMentionListOpen(open);
  }, []);
  const handleMentionSearchChange = _react.default.useCallback(search => {
    setSuggestions((0, _mention.defaultSuggestionsFilter)(search.value, mentions));
  }, [mentions]);
  const handleFileUpload = async file => {
    const id = _lodash.default.uniqueId('file_');
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classNames
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-container",
    onClick: focusEditor
  }, /*#__PURE__*/_react.default.createElement(_editor.default, {
    editorKey: "editor",
    editorState: editorState,
    handleKeyCommand: handleKeyCommand,
    onChange: handleOnChange,
    placeholder: placeholder,
    plugins: editorPlugins,
    ref: editor,
    spellCheck: true,
    readOnly: disabled
  }), !_lodash.default.isEmpty(mentions) && /*#__PURE__*/_react.default.createElement(MentionList, {
    open: isMentionListOpen,
    onOpenChange: handleMentionListOpen,
    suggestions: suggestions,
    onSearchChange: handleMentionSearchChange,
    entryComponent: _MentionEntry.default,
    popoverContainer: ({
      children,
      ...rest
    }) => {
      const {
        popperOptions,
        store
      } = rest;
      return /*#__PURE__*/_react.default.createElement(_Popover.default.WithRef, Object.assign({
        popoverClassNames: "aui--mention",
        refElement: store.getReferenceElement()
      }, popperOptions, {
        popoverContent: children,
        isOpen: true
      }));
    }
  })), /*#__PURE__*/_react.default.createElement(_FilePreviewList.default, {
    files: files,
    onFileRemove: handleFileRemove,
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-toolbar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-style-buttons"
  }, /*#__PURE__*/_react.default.createElement(_InlineStyleButtons.default, {
    editorState: editorState,
    onToggle: handleOnChange,
    disabled: disabled
  }), /*#__PURE__*/_react.default.createElement(_BlockStyleButtons.default, {
    editorState: editorState,
    onToggle: handleOnChange,
    disabled: disabled
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-advanced-buttons"
  }, !_lodash.default.isEmpty(mentions) && /*#__PURE__*/_react.default.createElement(_MentionAction.default, {
    onToggle: () => {
      if (isMentionListOpen) return;
      handleOnChange(insertText('@'));
    }
  }), _lodash.default.isFunction(onFileSelect) && _lodash.default.isFunction(onFileRemove) && /*#__PURE__*/_react.default.createElement(_FileUploadAction.default, {
    fileFilter: fileFilter,
    onFileUpload: handleFileUpload,
    disabled: disabled
  }))));
};
RichTextEditor.propTypes = {
  className: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  initialValue: _propTypes.default.string,
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  mentions: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    title: _propTypes.default.string,
    avatar: _propTypes.default.string
  })),
  onFileSelect: _propTypes.default.func,
  onFileRemove: _propTypes.default.func,
  fileFilter: _propTypes.default.string,
  disabled: _propTypes.default.bool
};
RichTextEditor.createEmpty = EditorState.createEmpty;
RichTextEditor.createWithText = _editor.createEditorStateWithText;
RichTextEditor.stateToHTML = editorStateToHTML;
/**
 * @example
 * // parser example with dom-purify
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
RichTextEditor.stateToPlainText = input => input.getCurrentContent().getPlainText();
RichTextEditor.stateToEntityList = input => convertToRaw(input.getCurrentContent()).entityMap;
RichTextEditor.plainTextFromHTML = input => RichTextEditor.stateToPlainText(editorStateFromHTML(input));
RichTextEditor.useTruncateState = ({
  editorState,
  briefCharCount,
  truncateString
}) => {
  const totalCharCount = _react.default.useMemo(() => {
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    return contentState.getPlainText().length - (blocks.length - 1);
  }, [editorState]);
  const truncatedState = _react.default.useMemo(() => {
    // text doesn't exceed limit
    if (totalCharCount <= briefCharCount) {
      return editorState;
    }
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    let acc = 0;
    let anchorOffset = 0;
    let truncatedBlockIndex = 0;

    // get the block index and string offset of the text to be truncated
    for (const [i, block] of blocks.entries()) {
      if (block.getLength() + acc >= briefCharCount) {
        truncatedBlockIndex = i;
        const offset = block.getLength() + acc - briefCharCount;
        anchorOffset = block.getLength() - offset;
        break;
      }
      acc += block.getLength();
    }
    let truncatedBlocks = [...blocks].slice(0, truncatedBlockIndex + 1);

    // replace the block's text with the truncated text
    truncatedBlocks[truncatedBlockIndex] = truncatedBlocks[truncatedBlockIndex].set('text', truncatedBlocks[truncatedBlockIndex].getText().substring(0, anchorOffset));
    let newState = ContentState.createFromBlockArray(truncatedBlocks);
    if (truncateString) {
      // selection at last character
      const endSelection = SelectionState.createEmpty(truncatedBlocks[truncatedBlockIndex].getKey()).set('anchorOffset', truncatedBlocks[truncatedBlockIndex].getLength()).set('focusOffset', truncatedBlocks[truncatedBlockIndex].getLength());

      // insert truncate string after the last character
      newState = Modifier.insertText(newState, endSelection, truncateString);
    }
    return EditorState.createWithContent(newState);
  }, [briefCharCount, editorState, totalCharCount, truncateString]);
  return {
    totalCharCount,
    truncatedState
  };
};
var _default = exports.default = RichTextEditor;