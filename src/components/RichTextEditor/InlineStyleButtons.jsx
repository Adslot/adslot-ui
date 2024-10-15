import React from 'react';
import { RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import './styles.css';

const INLINE_STYLES = [
  { label: <div className="bold-icon" data-testid="bold" alt="icon" />, style: 'BOLD', ariaLabel: 'Bold' },
  {
    label: <div className="italic-icon" data-testid="italics" aria-label="italic" alt="icon" />,
    style: 'ITALIC',
    ariaLabel: 'Italic',
  },
  {
    label: <div className="underline-icon" data-testid="underline" aria-label="Underline" alt="icon" />,
    style: 'UNDERLINE',
    ariaLabel: 'Underline',
  },
];

const InlineStyleButtons = (props) => {
  const { disabled } = props;
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
      aria-label={type.ariaLabel}
      disabled={disabled}
    />
  ));
};

export default InlineStyleButtons;
