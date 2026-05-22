import React from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from 'lexical';
import ToolbarButton from './ToolbarButton';

const IndentButtons = ({ disabled }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <ToolbarButton
        label={<div className="outdent-icon" data-testid="outdent" alt="icon" />}
        onToggle={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
        aria-label="Decrease indent"
        disabled={disabled}
      />
      <ToolbarButton
        label={<div className="indent-icon" data-testid="indent" alt="icon" />}
        onToggle={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
        aria-label="Increase indent"
        disabled={disabled}
      />
    </>
  );
};

IndentButtons.propTypes = {
  disabled: PropTypes.bool,
};

export default IndentButtons;
