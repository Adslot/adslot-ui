import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

const ToolbarButton = _ref => {
  let {
    onToggle,
    label,
    active,
    ...rest
  } = _ref;
  const className = classnames('aui--toolbar-button', {
    active
  });
  const mouseDownHandler = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    return onToggle();
  }, [onToggle]);
  return /*#__PURE__*/React.createElement(Button, Object.assign({
    className: className,
    onMouseDown: mouseDownHandler
  }, rest), label);
};

ToolbarButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool
};
export default ToolbarButton;