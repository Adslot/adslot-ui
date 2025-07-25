import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
const BLOCK_TYPES = [{
  label: /*#__PURE__*/React.createElement("div", {
    className: "bullet-icon"
  }),
  style: 'unordered-list-item',
  ariaLabel: 'Unordered list'
}, {
  label: /*#__PURE__*/React.createElement("div", {
    className: "number-icon"
  }),
  style: 'ordered-list-item',
  ariaLabel: 'Ordered list'
}];
const BlockStyleButtons = props => {
  const {
    editorState,
    disabled
  } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const onToggle = style => {
    props.onToggle(RichUtils.toggleBlockType(props.editorState, style));
  };
  return BLOCK_TYPES.map(type => /*#__PURE__*/React.createElement(ToolbarButton, {
    key: type.style,
    active: type.style === blockType,
    label: type.label,
    onToggle: () => onToggle(type.style),
    "aria-label": type.ariaLabel,
    disabled: disabled
  }));
};
export default BlockStyleButtons;