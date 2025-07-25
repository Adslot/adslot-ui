import * as React from 'react';

export interface MentionEntryMention {
  name?: string;
  title?: string;
  avatar?: string;
}

export interface MentionEntryProps {
  className?: string;
  mention?: MentionEntryMention;
  onMouseDown?: (...args: any[]) => any;
  onMouseUp?: (...args: any[]) => any;
  onMouseEnter?: (...args: any[]) => any;
  isFocused?: boolean;
}

declare const MentionEntry: React.FC<MentionEntryProps>;

export default MentionEntry;
