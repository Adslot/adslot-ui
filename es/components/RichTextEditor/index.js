import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["children"];
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
var EditorState = draftJs.EditorState,
    Modifier = draftJs.Modifier,
    convertToRaw = draftJs.convertToRaw,
    RichUtils = draftJs.RichUtils;

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
  var editor = /*#__PURE__*/React.createRef(null);

  var focusEditor = function focusEditor() {
    return editor.current.focus();
  };

  if (value && !onChange) console.warn('Failed prop type: You have provided a `value` prop to RichTextEditor component without an `onChange` handler. This will render a read-only field.');
  var classNames = cc('aui--editor-root', className);

  var _React$useState = React.useState(initialValue || EditorState.createEmpty()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      editorState = _React$useState2[0],
      setEditorState = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isMentionListOpen = _React$useState4[0],
      setIsMentionListOpen = _React$useState4[1];

  var _React$useState5 = React.useState(mentions),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      suggestions = _React$useState6[0],
      setSuggestions = _React$useState6[1];

  var _React$useState7 = React.useState({}),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      files = _React$useState8[0],
      setFiles = _React$useState8[1]; // https://www.draft-js-plugins.com/plugin/mention


  var _React$useMemo = React.useMemo(function () {
    var mentionPlugin = createMentionPlugin({
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

  var handleMentionListOpen = React.useCallback(function (open) {
    setIsMentionListOpen(open);
  }, []);
  var handleMentionSearchChange = React.useCallback(function (search) {
    setSuggestions(defaultSuggestionsFilter(search.value, mentions));
  }, [mentions]);

  var handleFileUpload = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(file) {
      var id, path;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _.uniqueId('file_');
              setFiles(function (prevState) {
                return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, id, {
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
                  return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, id, {
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
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(file) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
    popoverContainer: function popoverContainer(_ref4) {
      var children = _ref4.children,
          rest = _objectWithoutProperties(_ref4, _excluded);

      var popperOptions = rest.popperOptions,
          store = rest.store;
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
    onToggle: function onToggle() {
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

RichTextEditor.stateToHTML = function (input) {
  return stateToHTML(input.getCurrentContent());
};

RichTextEditor.stateFromHTML = function (input) {
  return EditorState.createWithContent(stateFromHTML(input));
};

RichTextEditor.stateToPlainText = function (input) {
  return input.getCurrentContent().getPlainText();
};

RichTextEditor.stateToEntityList = function (input) {
  return convertToRaw(input.getCurrentContent()).entityMap;
};

export default RichTextEditor;