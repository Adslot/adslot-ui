import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import boldIcon from '../../styles/icons/bold.svg';
import italicIcon from '../../styles/icons/italic.svg';
import underlineIcon from '../../styles/icons/underline.svg';

const INLINE_STYLES = [
  { label: <img src={boldIcon} alt="bold" />, style: 'BOLD' },
  { label: <img src={italicIcon} alt="italics" />, style: 'ITALIC' },
  { label: <img src={underlineIcon} alt="underline" />, style: 'UNDERLINE' },
];

const InlineStyleButtons = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  const onToggle = (style) => {
    props.onToggle(RichUtils.toggleInlineStyle(props.editorState, style));
  };

  return INLINE_STYLES.map((type) => (
    <ToolbarButton
      key={type.style}
      active={currentStyle.has(type.style)}
      label={type.label}
      onToggle={() => onToggle(type.style)}
      style={type.style}
    />
  ));
};

export default InlineStyleButtons;
