import React from 'react';
import PropTypes from 'prop-types';
import ToolbarButton from './ToolbarButton';

const MentionAction = ({ onToggle }) => (
  <ToolbarButton label={<div className="mention-button">@</div>} onToggle={onToggle} />
);

export default MentionAction;

MentionAction.propTypes = {
  onToggle: PropTypes.func,
};
