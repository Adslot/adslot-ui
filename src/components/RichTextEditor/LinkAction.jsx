import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $setSelection } from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import Popover from '../Popover';
import ToolbarButton from './ToolbarButton';
import LinkPopover from './LinkPopover';
import useExclusivePopover from './useExclusivePopover';

const LinkAction = ({ disabled, isLink, linkUrl }) => {
  const [editor] = useLexicalComposerContext();
  const buttonRef = useRef(null);
  const savedSelection = useRef(null);
  const { isOpen, toggle, close } = useExclusivePopover('link');

  const handleTrigger = () => {
    if (!isOpen) {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        savedSelection.current = $isRangeSelection(selection) ? selection.clone() : null;
      });
    }
    toggle();
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      editor.update(() => {
        $setSelection(savedSelection.current.clone());
      });
    }
  };

  const handleApply = (url) => {
    restoreSelection();
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    close();
  };

  const handleRemove = () => {
    restoreSelection();
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    close();
  };

  return (
    <>
      <span ref={buttonRef} className="aui--toolbar-button-anchor">
        <ToolbarButton
          label={<div className="link-icon" data-testid="link" alt="icon" />}
          onToggle={handleTrigger}
          aria-label="Insert or edit link"
          active={isLink || isOpen}
          disabled={disabled}
        />
      </span>
      <Popover.WithRef
        refElement={buttonRef.current}
        placement="bottom-start"
        isOpen={isOpen}
        popoverClassNames="aui--editor-popover"
        popoverContent={
          <LinkPopover
            initialUrl={linkUrl}
            canRemove={isLink}
            onApply={handleApply}
            onRemove={handleRemove}
            onClose={close}
            anchorEl={buttonRef.current}
          />
        }
      />
    </>
  );
};

LinkAction.propTypes = {
  disabled: PropTypes.bool,
  isLink: PropTypes.bool,
  linkUrl: PropTypes.string,
};

export default LinkAction;
