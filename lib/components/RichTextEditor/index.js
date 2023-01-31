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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  EditorState,
  Modifier,
  convertToRaw,
  RichUtils
} = _draftJs.default;
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
  const editor = /*#__PURE__*/_react.default.createRef(null);
  const focusEditor = () => editor.current.focus();
  if (value && !onChange) console.warn('Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.');
  const classNames = (0, _classnames.default)('aui--editor-root', className);
  const [editorState, setEditorState] = _react.default.useState(initialValue || EditorState.createEmpty());
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
    editorState: value || editorState,
    handleKeyCommand: handleKeyCommand,
    onChange: handleOnChange,
    placeholder: placeholder,
    plugins: editorPlugins,
    ref: editor,
    spellCheck: true
  }), !_lodash.default.isEmpty(mentions) && /*#__PURE__*/_react.default.createElement(MentionList, {
    open: isMentionListOpen,
    onOpenChange: handleMentionListOpen,
    suggestions: suggestions,
    onSearchChange: handleMentionSearchChange,
    entryComponent: _MentionEntry.default,
    popoverContainer: _ref2 => {
      let {
        children,
        ...rest
      } = _ref2;
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
    onFileRemove: handleFileRemove
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-toolbar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-style-buttons"
  }, /*#__PURE__*/_react.default.createElement(_InlineStyleButtons.default, {
    editorState: value || editorState,
    onToggle: handleOnChange
  }), /*#__PURE__*/_react.default.createElement(_BlockStyleButtons.default, {
    editorState: value || editorState,
    onToggle: handleOnChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--editor-advanced-buttons"
  }, !_lodash.default.isEmpty(mentions) && /*#__PURE__*/_react.default.createElement(_MentionAction.default, {
    onToggle: () => {
      if (isMentionListOpen) return;
      handleOnChange(insertText('@'));
    }
  }), _lodash.default.isFunction(onFileSelect) && _lodash.default.isFunction(onFileRemove) && /*#__PURE__*/_react.default.createElement(_FileUploadAction.default, {
    fileFilter: fileFilter,
    onFileUpload: handleFileUpload
  }))));
};
RichTextEditor.propTypes = {
  className: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  /** Editor State */
  initialValue: _propTypes.default.instanceOf(EditorState),
  /** Editor State: Instance of <a href="https://draftjs.org/docs/api-reference-editor-state">draft-js editor state</a> */
  value: _propTypes.default.instanceOf(EditorState),
  onChange: _propTypes.default.func,
  mentions: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    title: _propTypes.default.string,
    avatar: _propTypes.default.string
  })),
  onFileSelect: _propTypes.default.func,
  onFileRemove: _propTypes.default.func,
  fileFilter: _propTypes.default.string
};
RichTextEditor.defaultProps = {
  placeholder: 'Tell a story...',
  fileFilter: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.psd,.csv,.zip,.7z'
};
RichTextEditor.createEmpty = EditorState.createEmpty;
RichTextEditor.createWithText = _editor.createEditorStateWithText;
RichTextEditor.stateToHTML = input => (0, _draftJsExportHtml.stateToHTML)(input.getCurrentContent());
RichTextEditor.stateFromHTML = input => EditorState.createWithContent((0, _draftJsImportHtml.stateFromHTML)(input));
RichTextEditor.stateToPlainText = input => input.getCurrentContent().getPlainText();
RichTextEditor.stateToEntityList = input => convertToRaw(input.getCurrentContent()).entityMap;
var _default = RichTextEditor;
exports.default = _default;