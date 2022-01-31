import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import BoldIcon from '../../styles/icons/bold.svg';
import ItalicIcon from '../../styles/icons/italic.svg';
import UnderlineIcon from '../../styles/icons/underline.svg';

const INLINE_STYLES = [
  { label: <BoldIcon data-testid="bold" />, style: 'BOLD' },
  { label: <ItalicIcon data-testid="italics" />, style: 'ITALIC' },
  { label: <UnderlineIcon data-testid="underline" />, style: 'UNDERLINE' },
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
