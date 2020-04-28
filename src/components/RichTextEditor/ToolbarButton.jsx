import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'adslot-ui';
import classnames from 'classnames';

const ToolbarButton = ({ onToggle, label, active }) => {
  const className = classnames('aui--toolbar-button', {
    active,
  });

  return (
    <Button className={className} onMouseDown={onToggle}>
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