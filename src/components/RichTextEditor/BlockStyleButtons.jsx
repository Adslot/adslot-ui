import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import bulletIcon from '../../styles/icons/bullet.svg';
import numberIcon from '../../styles/icons/number.svg';

const BLOCK_TYPES = [
  { label: <img src={bulletIcon} alt="bullet" />, style: 'unordered-list-item' },
  { label: <img src={numberIcon} alt="number" />, style: 'ordered-list-item' },
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
      style={type.style}
    />
  ));
};
export default BlockStyleButtons;
