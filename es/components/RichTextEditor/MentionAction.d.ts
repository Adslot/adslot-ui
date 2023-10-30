import * as React from 'react';

export interface MentionActionProps {
  onToggle?: (...args: any[]) => any;
}

declare const MentionAction: React.FC<MentionActionProps>;

export default MentionAction;
