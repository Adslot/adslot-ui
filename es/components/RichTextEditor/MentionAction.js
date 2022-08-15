import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

const MentionAction = _ref => {
  let {
    onToggle
  } = _ref;
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