import React from 'react';
import ToolbarButton from './ToolbarButton';

const AdvancedButtons = props => {
  const { mentionEnabled, onMentionToggle } = props;

  return <>{mentionEnabled && <ToolbarButton label={<div>@</div>} onToggle={() => onMentionToggle()} />}</>;
};

export default AdvancedButtons;
