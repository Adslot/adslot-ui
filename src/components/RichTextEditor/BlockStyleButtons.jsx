import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import BulletIcon from '../../styles/icons/bullet.svg';
import NumberIcon from '../../styles/icons/number.svg';

const BLOCK_TYPES = [
  { label: <BulletIcon data-testid="bullet" />, style: 'unordered-list-item', ariaLabel: 'Unordered list' },
  { label: <NumberIcon data-testid="number" />, style: 'ordered-list-item', ariaLabel: 'Ordered list' },
];

const BlockStyleButtons = (props) => {
  const { editorState } = props;
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
    />
  ));
};
export default BlockStyleButtons;
