"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));

var BulletIcon = function BulletIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.6 4.3h10.1c.2 0 .3-.2.3-.3 0-.2-.2-.3-.3-.3H4.6c-.2 0-.3.2-.3.3 0 .1.1.3.3.3zm10.1 3.4H4.6c-.2 0-.3.1-.3.3 0 .2.2.3.3.3h10.1c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3zm0 4H4.6c-.2 0-.3.2-.3.3 0 .2.2.3.3.3h10.1c.2 0 .3-.2.3-.3 0-.1-.1-.3-.3-.3zM1.9 3c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9zm0 1.2c-.1 0-.2-.1-.2-.2s.1-.2.2-.2.2.1.2.2-.1.2-.2.2zm0 2.9c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9zm0 1.1c-.2 0-.3-.1-.3-.2s.1-.2.2-.2.3.1.3.2-.1.2-.2.2zm0 2.9c-.5 0-.9.4-.9.9 0 .6.4 1 .9 1s.9-.4.9-.9c0-.6-.4-1-.9-1zm0 1.2c-.1 0-.2-.1-.2-.2s.1-.2.2-.2.2.1.2.2-.1.2-.2.2z",
    fill: "#231f20"
  }));
};

BulletIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
};

var NumberIcon = function NumberIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M1.8 4.7v2c0 .3.2.5.5.5s.5-.2.5-.5V4.1c0-.2-.1-.3-.2-.4-.2-.1-.3-.1-.5-.1l-.6.3c-.2.1-.3.3-.3.6.1.2.4.3.6.2zm1.4 7.2h-.6l.4-.4c.5-.4.7-1 .5-1.5-.1-.4-.5-.7-1-.8-.5 0-1 .3-1.4.8-.1.2-.1.5.1.6.2.1.5.1.6-.1.1-.2.3-.3.5-.3.1 0 .2.1.2.2s-.1.3-.3.5L1.1 12c-.1.2-.2.4-.1.5.1.2.2.3.4.3h1.7c.3 0 .5-.2.5-.5 0-.2-.2-.4-.4-.4zm2.2-7.2h9.3c.2 0 .3-.1.3-.3s-.1-.3-.3-.3H5.4c-.2 0-.3.1-.3.3s.1.3.3.3zm9.3 3.1H5.4c-.2 0-.3.2-.3.4s.1.3.3.3h9.3c.2 0 .3-.1.3-.3s-.1-.4-.3-.4zm0 3.8H5.4c-.2 0-.3.1-.3.3s.1.3.3.3h9.3c.2 0 .3-.1.3-.3s-.1-.3-.3-.3z"
  }));
};

NumberIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
};
const BLOCK_TYPES = [{
  label: /*#__PURE__*/_react.default.createElement(BulletIcon, null),
  style: 'unordered-list-item',
  ariaLabel: 'Unordered list'
}, {
  label: /*#__PURE__*/_react.default.createElement(NumberIcon, null),
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

var _default = BlockStyleButtons;
exports.default = _default;