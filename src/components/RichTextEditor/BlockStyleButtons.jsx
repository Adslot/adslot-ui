import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import './styles.css';

const BLOCK_TYPES = [
  {
    label: <div className="bullet-icon" data-testid="bullet" />,
    style: 'unordered-list-item',
    ariaLabel: 'Unordered list',
  },
  {
    label: <div className="number-icon" data-testid="number" />,
    style: 'ordered-list-item',
    ariaLabel: 'Ordered list',
  },
];

const BlockStyleButtons = (props) => {
  const { editorState, disabled } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  const onToggle = (style) => {
    props.onToggle(RichUtils.toggleBlockType(props.editorState, style));
  };

  return BLOCK_TYPES.map((type) => (
    <ToolbarButton
      key={type.style}
      active={type.style === blockType}
      label={type.label}
      onToggle={() => onToggle(type.style)}
      aria-label={type.ariaLabel}
      disabled={disabled}
    />
  ));
};
export default BlockStyleButtons;
