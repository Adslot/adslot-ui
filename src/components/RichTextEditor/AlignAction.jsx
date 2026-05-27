import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import ToolbarButton from './ToolbarButton';
import AlignButtons from './AlignButtons';
import useExclusivePopover from './useExclusivePopover';
import usePopoverDismiss from './usePopoverDismiss';

const ALIGNMENT_ICONS = {
  left: 'align-left-icon',
  center: 'align-center-icon',
  right: 'align-right-icon',
  justify: 'align-justify-icon',
};

const AlignAction = ({ alignment, disabled }) => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const { isOpen, toggle, close } = useExclusivePopover('align');

  usePopoverDismiss({
    active: isOpen,
    containerRef,
    anchorEl: buttonRef.current,
    onClose: close,
  });

  const iconClass = ALIGNMENT_ICONS[alignment] ?? ALIGNMENT_ICONS.left;

  return (
    <>
      <span ref={buttonRef} className="aui--toolbar-button-anchor">
        <ToolbarButton
          label={<div className={iconClass} data-testid="align" alt="icon" />}
          onToggle={toggle}
          aria-label="Alignment"
          active={Boolean(alignment) || isOpen}
          disabled={disabled}
        />
      </span>
      <Popover.WithRef
        refElement={buttonRef.current}
        placement="bottom-start"
        isOpen={isOpen}
        popoverClassNames="aui--editor-popover aui--editor-popover-inline"
        popoverContent={
          <div ref={containerRef} className="aui--editor-align-popover" data-testid="align-popover">
            <AlignButtons alignment={alignment} disabled={disabled} onSelect={close} />
          </div>
        }
      />
    </>
  );
};

AlignAction.propTypes = {
  alignment: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AlignAction;
