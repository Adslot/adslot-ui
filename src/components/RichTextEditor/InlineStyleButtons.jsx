import React from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import ToolbarButton from './ToolbarButton';
import './styles.css';

const INLINE_STYLES = [
  { format: 'bold', label: <div className="bold-icon" data-testid="bold" alt="icon" />, ariaLabel: 'Bold' },
  {
    format: 'italic',
    label: <div className="italic-icon" data-testid="italics" aria-label="italic" alt="icon" />,
    ariaLabel: 'Italic',
  },
  {
    format: 'underline',
    label: <div className="underline-icon" data-testid="underline" aria-label="Underline" alt="icon" />,
    ariaLabel: 'Underline',
  },
  {
    format: 'strikethrough',
    label: <div className="strikethrough-icon" data-testid="strikethrough" aria-label="Strikethrough" alt="icon" />,
    ariaLabel: 'Strikethrough',
  },
];

const InlineStyleButtons = ({ formats, disabled }) => {
  const [editor] = useLexicalComposerContext();

  return INLINE_STYLES.map((type) => (
    <ToolbarButton
      key={type.format}
      active={Boolean(formats[type.format])}
      label={type.label}
      onToggle={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type.format)}
      aria-label={type.ariaLabel}
      disabled={disabled}
    />
  ));
};

InlineStyleButtons.propTypes = {
  formats: PropTypes.object,
  disabled: PropTypes.bool,
};

export default InlineStyleButtons;
