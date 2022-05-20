import * as React from 'react';

export interface ActionButtonProps {
  id: string;
  onAction: (...args: any[]) => any;
  actionIcon?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps>;

export interface TagProps {
  children: React.ReactNode;
  id?: string;
  accent?: string;
  className?: string;
  inverse?: boolean;
  onAction?: (...args: any[]) => any;
  actionIcon?: React.ReactNode;
  dts?: string;
}

declare const Tag: React.FC<TagProps>;

export default Tag;
