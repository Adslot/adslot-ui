import React from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import ToolbarButton from './ToolbarButton';
import useHistoryState from './useHistoryState';

const HistoryButtons = ({ disabled }) => {
  const [editor] = useLexicalComposerContext();
  const { canUndo, canRedo } = useHistoryState();

  return (
    <>
      <ToolbarButton
        label={<div className="undo-icon" data-testid="undo" alt="icon" />}
        onToggle={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        aria-label="Undo"
        disabled={disabled || !canUndo}
      />
      <ToolbarButton
        label={<div className="redo-icon" data-testid="redo" alt="icon" />}
        onToggle={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        aria-label="Redo"
        disabled={disabled || !canRedo}
      />
    </>
  );
};

HistoryButtons.propTypes = {
  disabled: PropTypes.bool,
};

export default HistoryButtons;
