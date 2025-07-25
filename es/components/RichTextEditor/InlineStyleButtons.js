import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
const INLINE_STYLES = [{
  label: /*#__PURE__*/React.createElement("div", {
    className: "bold-icon",
    alt: "icon"
  }),
  style: 'BOLD',
  ariaLabel: 'Bold'
}, {
  label: /*#__PURE__*/React.createElement("div", {
    className: "italic-icon",
    "aria-label": "italic",
    alt: "icon"
  }),
  style: 'ITALIC',
  ariaLabel: 'Italic'
}, {
  label: /*#__PURE__*/React.createElement("div", {
    className: "underline-icon",
    "aria-label": "Underline",
    alt: "icon"
  }),
  style: 'UNDERLINE',
  ariaLabel: 'Underline'
}];
const InlineStyleButtons = props => {
  const {
    disabled
  } = props;
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const onToggle = style => {
    props.onToggle(RichUtils.toggleInlineStyle(props.editorState, style));
  };
  return INLINE_STYLES.map(type => /*#__PURE__*/React.createElement(ToolbarButton, {
    key: type.style,
    active: currentStyle.has(type.style),
    label: type.label,
    onToggle: () => onToggle(type.style),
    "aria-label": type.ariaLabel,
    disabled: disabled
  }));
};
export default InlineStyleButtons;