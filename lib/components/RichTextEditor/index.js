"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var EditorState = _draftJs.default.EditorState,
    Modifier = _draftJs.default.Modifier,
    convertToRaw = _draftJs.default.convertToRaw,
    RichUtils = _draftJs.default.RichUtils;

var RichTextEditor = function RichTextEditor(_ref) {
  var className = _ref.className,
      value = _ref.value,
      initialValue = _ref.initialValue,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      mentions = _ref.mentions,
      onFileSelect = _ref.onFileSelect,
      onFileRemove = _ref.onFileRemove,
      fileFilter = _ref.fileFilter;

  var editor = /*#__PURE__*/_react.default.createRef(null);

  var focusEditor = function focusEditor() {
    return editor.current.focus();
  };

  if (value && !onChange) console.warn('Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.');
  var classNames = (0, _classnames.default)('aui--editor-root', className);

  var _React$useState = _react.default.useState(initialValue || EditorState.createEmpty()),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      editorState = _React$useState2[0],
      setEditorState = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      isMentionListOpen = _React$useState4[0],
      setIsMentionListOpen = _React$useState4[1];

  var _React$useState5 = _react.default.useState(mentions),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      suggestions = _React$useState6[0],
      setSuggestions = _React$useState6[1];

  var _React$useState7 = _react.default.useState({}),
      _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
      files = _React$useState8[0],
      setFiles = _React$useState8[1]; // https://www.draft-js-plugins.com/plugin/mention


  var _React$useMemo = _react.default.useMemo(function () {
    var mentionPlugin = (0, _mention.default)({
      entityMutability: 'IMMUTABLE',
      mentionPrefix: '@',
      supportWhitespace: true,
      popperOptions: {
        placement: 'bottom-start',
        strategy: 'fixed',
        modifiers: [{
          name: 'flip',
          enabled: false
        }, {
          name: 'preventOverflow',
          enabled: false
        }, {
          name: 'hide',
          enabled: false
        }]
      },
      theme: {
        mention: 'mention' // give className to the mention

      }
    });
    var MentionSuggestions = mentionPlugin.MentionSuggestions;
    var plugins = [mentionPlugin];
    return {
      plugins: plugins,
      MentionSuggestions: MentionSuggestions
    };
  }, []),
      MentionList = _React$useMemo.MentionSuggestions,
      editorPlugins = _React$useMemo.plugins;

  var handleOnChange = function handleOnChange(newState) {
    if (!value) {
      setEditorState(newState);
    }

    if (onChange) {
      onChange(newState);
    }
  };

  var insertText = function insertText(text) {
    var state = value || editorState;
    var currentContent = state.getCurrentContent();
    var currentSelection = state.getSelection();
    var newContent = Modifier.replaceText(currentContent, currentSelection, text);
    var newEditorState = EditorState.push(state, newContent, 'insert-characters');
    return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  };

  var handleKeyCommand = function handleKeyCommand(command) {
    var newState = RichUtils.handleKeyCommand(value || editorState, command);

    if (newState) {
      handleOnChange(newState);
      return true;
    }

    return false;
  };

  var handleMentionListOpen = _react.default.useCallback(function (open) {
    setIsMentionListOpen(open);
  }, []);

  var handleMentionSearchChange = _react.default.useCallback(function (search) {
    setSuggestions((0, _mention.defaultSuggestionsFilter)(search.value, mentions));
  }, [mentions]);

  var handleFileUpload = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(file) {
      var id, path;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _lodash.default.uniqueId('file_');
              setFiles(function (prevState) {
                return _objectSpread(_objectSpread({}, prevState), {}, (0, _defineProperty2.default)({}, id, {
                  id: id,
                  name: file.name,
                  path: '',
                  isUploading: true
                }));
              });
              _context.next = 4;
              return onFileSelect(file, id);

            case 4:
              path = _context.sent;

              if (path) {
                setFiles(function (prevState) {
                  return _objectSpread(_objectSpread({}, prevState), {}, (0, _defineProperty2.default)({}, id, {
                    id: id,
                    name: file.name,
                    path: path,
                    isUploading: false
                  }));
                });
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleFileUpload(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleFileRemove = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(file) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return onFileRemove(file);

            case 2:
              setFiles(function (prevState) {
                var state = _objectSpread({}, prevState);

                delete state[file.id];
                return state;
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleFileRemove(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

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
    entryComponent: _MentionEntry.default
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
    onToggle: function onToggle() {
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

RichTextEditor.stateToHTML = function (input) {
  return (0, _draftJsExportHtml.stateToHTML)(input.getCurrentContent());
};

RichTextEditor.stateFromHTML = function (input) {
  return EditorState.createWithContent((0, _draftJsImportHtml.stateFromHTML)(input));
};

RichTextEditor.stateToPlainText = function (input) {
  return input.getCurrentContent().getPlainText();
};

RichTextEditor.stateToEntityList = function (input) {
  return convertToRaw(input.getCurrentContent()).entityMap;
};

var _default = RichTextEditor;
exports.default = _default;