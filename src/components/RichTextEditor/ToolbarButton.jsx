import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

const ToolbarButton = ({ onToggle, label, active }) => {
  const className = classnames('aui--toolbar-button', {
    active,
  });

  const mouseDownHandler = React.useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      return onToggle();
    },
    [onToggle]
  );

  return (
    <Button className={className} onMouseDown={mouseDownHandler}>
      {label}
    </Button>
  );
};

ToolbarButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ToolbarButton;
