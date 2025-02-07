import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

const ToolbarButton = ({ onToggle, label, active = false, disabled = false, ...rest }) => {
  const className = classnames('aui--toolbar-button', {
    active,
  });

  const mouseDownHandler = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      return onToggle();
    },
    [onToggle]
  );

  return (
    <Button className={className} onMouseDown={mouseDownHandler} disabled={disabled} {...rest}>
      {label}
    </Button>
  );
};

ToolbarButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ToolbarButton;
