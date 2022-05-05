import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

var ToolbarButton = function ToolbarButton(_ref) {
  var onToggle = _ref.onToggle,
      label = _ref.label,
      active = _ref.active;
  var className = classnames('aui--toolbar-button', {
    active: active
  });
  var mouseDownHandler = React.useCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    return onToggle();
  }, [onToggle]);
  return /*#__PURE__*/React.createElement(Button, {
    className: className,
    onMouseDown: mouseDownHandler
  }, label);
};

ToolbarButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool
};
export default ToolbarButton;