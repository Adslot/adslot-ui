import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
var BoldIcon = function BoldIcon(props) {
  return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
    d: "M4.6 3.2h2.8c2 0 3.4.7 3.4 2.4 0 1-.6 1.8-1.7 2.1v.1c1.4.2 2.3 1 2.3 2.4 0 1.9-1.5 2.9-3.7 2.9h-3V3.2zm2.6 4.2c1.7 0 2.4-.5 2.4-1.6s-.8-1.5-2.3-1.5H5.8v3.1h1.4zm.2 4.6c1.7 0 2.7-.6 2.7-1.9 0-1.2-.9-1.7-2.7-1.7H5.8V12h1.6z"
  }));
};
BoldIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
};
var ItalicIcon = function ItalicIcon(props) {
  return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
    d: "M3.9 12.1h2.4l1.6-7.9H5.5l.2-1h6.1l-.2 1H9.1l-1.6 7.9H10l-.2 1H3.7l.2-1z"
  }));
};
ItalicIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
};
var UnderlineIcon = function UnderlineIcon(props) {
  return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
    d: "M4.7 8.7V2.6H6v6.1c0 2 .9 2.8 2.1 2.8 1.2 0 2.1-.7 2.1-2.8V2.6h1.2v6.1c0 2.8-1.4 3.9-3.3 3.9-2 0-3.4-1.1-3.4-3.9zm-1.2 5.6v-.7h9v.7h-9z"
  }));
};
UnderlineIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
};
const INLINE_STYLES = [{
  label: /*#__PURE__*/React.createElement(BoldIcon, null),
  style: 'BOLD',
  ariaLabel: 'Bold'
}, {
  label: /*#__PURE__*/React.createElement(ItalicIcon, {
    "aria-label": "italic"
  }),
  style: 'ITALIC',
  ariaLabel: 'Italic'
}, {
  label: /*#__PURE__*/React.createElement(UnderlineIcon, {
    "aria-label": "Underline"
  }),
  style: 'UNDERLINE',
  ariaLabel: 'Underline'
}];
const InlineStyleButtons = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const onToggle = style => {
    props.onToggle(RichUtils.toggleInlineStyle(props.editorState, style));
  };
  return INLINE_STYLES.map(type => /*#__PURE__*/React.createElement(ToolbarButton, {
    key: type.style,
    active: currentStyle.has(type.style),
    label: type.label,
    onToggle: () => onToggle(type.style),
    "aria-label": type.ariaLabel
  }));
};
export default InlineStyleButtons;