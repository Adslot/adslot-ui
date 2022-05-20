import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

var MentionAction = function MentionAction(_ref) {
  var onToggle = _ref.onToggle;
  return /*#__PURE__*/React.createElement(ToolbarButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "mention-button"
    }, "@"),
    onToggle: onToggle
  });
};

export default MentionAction;
MentionAction.propTypes = {
  onToggle: PropTypes.func
};