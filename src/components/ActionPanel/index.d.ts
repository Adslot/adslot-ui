import * as React from 'react';

export type ActionPanelSize = 'small' | 'medium' | 'large';

export interface ActionPanelProps {
  title: React.ReactNode;
  className?: string;
  size?: ActionPanelSize;
  onClose: (...args: any[]) => any;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  isModal?: boolean;
  /**
   * Hides the modal with css, but keeps it mounted.
   * This should only be used if you need to launch an ActionPanel
   * from within another ActionPanel.
   */
  visuallyHidden?: boolean;
  dts?: string;
}

declare const ActionPanel: React.FC<ActionPanelProps>;

export default ActionPanel;
