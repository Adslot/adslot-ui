"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _draftJs = require("draft-js");
var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));
const INLINE_STYLES = [{
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "bold-icon",
    alt: "icon"
  }),
  style: 'BOLD',
  ariaLabel: 'Bold'
}, {
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "italic-icon",
    "aria-label": "italic",
    alt: "icon"
  }),
  style: 'ITALIC',
  ariaLabel: 'Italic'
}, {
  label: /*#__PURE__*/_react.default.createElement("div", {
    className: "underline-icon",
    "aria-label": "Underline",
    alt: "icon"
  }),
  style: 'UNDERLINE',
  ariaLabel: 'Underline'
}];
const InlineStyleButtons = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const onToggle = style => {
    props.onToggle(_draftJs.RichUtils.toggleInlineStyle(props.editorState, style));
  };
  return INLINE_STYLES.map(type => /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    key: type.style,
    active: currentStyle.has(type.style),
    label: type.label,
    onToggle: () => onToggle(type.style),
    "aria-label": type.ariaLabel
  }));
};
var _default = exports.default = InlineStyleButtons;