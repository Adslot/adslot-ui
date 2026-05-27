import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $setSelection } from 'lexical';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import Popover from '../Popover';
import ToolbarButton from './ToolbarButton';
import InsertTablePopover from './InsertTablePopover';
import useExclusivePopover from './useExclusivePopover';

const InsertTableAction = ({ disabled }) => {
  const [editor] = useLexicalComposerContext();
  const buttonRef = useRef(null);
  const savedSelection = useRef(null);
  const { isOpen, toggle, close } = useExclusivePopover('insert-table');

  const handleTrigger = () => {
    if (!isOpen) {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        savedSelection.current = $isRangeSelection(selection) ? selection.clone() : null;
      });
    }
    toggle();
  };

  const handleInsert = ({ rows, columns }) => {
    if (savedSelection.current) {
      editor.update(() => {
        $setSelection(savedSelection.current.clone());
      });
    }
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: String(columns),
      rows: String(rows),
      includeHeaders: false,
    });
    close();
  };

  return (
    <>
      <span ref={buttonRef} className="aui--toolbar-button-anchor">
        <ToolbarButton
          label={<div className="table-icon" data-testid="insert-table" alt="icon" />}
          onToggle={handleTrigger}
          aria-label="Insert table"
          active={isOpen}
          disabled={disabled}
        />
      </span>
      <Popover.WithRef
        refElement={buttonRef.current}
        placement="bottom-start"
        isOpen={isOpen}
        popoverClassNames="aui--editor-popover"
        popoverContent={<InsertTablePopover onInsert={handleInsert} onClose={close} anchorEl={buttonRef.current} />}
      />
    </>
  );
};

InsertTableAction.propTypes = {
  disabled: PropTypes.bool,
};

export default InsertTableAction;
