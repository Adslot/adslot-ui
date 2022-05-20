import * as React from 'react';

export type ActionPanelSize = 'small' | 'medium' | 'large';

export interface ActionPanelProps {
  title: React.ReactNode;
  className?: string;
  size?: ActionPanelSize;
  onClose: (...args: any[]) => any;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  closeIcon?: React.ReactNode;
  isModal?: boolean;
  cancelText?: string;
}

declare const ActionPanel: React.FC<ActionPanelProps>;

export default ActionPanel;
