"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _draftJs = require("draft-js");
var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));
const BLOCK_TYPES = [{
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "bullet-icon"
  }),
  style: 'unordered-list-item',
  ariaLabel: 'Unordered list'
}, {
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "number-icon"
  }),
  style: 'ordered-list-item',
  ariaLabel: 'Ordered list'
}];
const BlockStyleButtons = props => {
  const {
    editorState
  } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const onToggle = style => {
    props.onToggle(_draftJs.RichUtils.toggleBlockType(props.editorState, style));
  };
  return BLOCK_TYPES.map(type => /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    key: type.style,
    active: type.style === blockType,
    label: type.label,
    onToggle: () => onToggle(type.style),
    "aria-label": type.ariaLabel
  }));
};
var _default = exports.default = BlockStyleButtons;