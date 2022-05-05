import * as React from 'react';
import { PopoverProps } from '../Popover';

export interface TextEllipsisProps {
  children: React.ReactNode;
  popoverProps?: PopoverProps;
}

declare const TextEllipsis: React.FC<TextEllipsisProps>;

export default TextEllipsis;
