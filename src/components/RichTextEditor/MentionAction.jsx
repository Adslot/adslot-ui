import React from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import ToolbarButton from './ToolbarButton';

/**
 * Toolbar button that inserts an `@` at the cursor, which opens the mention
 * typeahead the same way typing `@` does.
 */
const MentionAction = ({ disabled }) => {
  const [editor] = useLexicalComposerContext();

  const insertTrigger = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText('@');
      }
    });
  };

  return (
    <ToolbarButton
      label={<div className="mention-button">@</div>}
      onToggle={insertTrigger}
      aria-label="Mention"
      disabled={disabled}
    />
  );
};

MentionAction.propTypes = {
  disabled: PropTypes.bool,
};

export default MentionAction;
