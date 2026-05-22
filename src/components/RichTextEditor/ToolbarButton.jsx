import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

const ToolbarButton = ({ onToggle, label, active = false, disabled = false, title, ...rest }) => {
  const className = classnames('aui--toolbar-button', {
    active,
  });

  const mouseDownHandler = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      return onToggle();
    },
    [onToggle]
  );

  // Fall back to aria-label so every toolbar button surfaces a tooltip
  // without each call site having to repeat the label. `data-tooltip`
  // drives the styled CSS popover on hover; we intentionally omit the
  // native `title` attribute to avoid the browser layering its own
  // (much slower, less-styled) tooltip on top. Screen readers use the
  // `aria-label` that already flows through `...rest`.
  const tooltip = title ?? rest['aria-label'];

  return (
    <Button className={className} data-tooltip={tooltip} onMouseDown={mouseDownHandler} disabled={disabled} {...rest}>
      {label}
    </Button>
  );
};

ToolbarButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default ToolbarButton;
