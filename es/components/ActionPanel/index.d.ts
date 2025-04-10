import * as React from 'react';

export type ActionPanelSize = 'small' | 'medium' | 'large';

export interface ActionPanelProps {
  title: React.ReactNode;
  size?: ActionPanelSize;
  onClose: (...args: any[]) => any;
  isModal?: boolean;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  /**
   * Hides the modal with css, but keeps it mounted.
   * This should only be used if you need to launch an ActionPanel
   * from within another ActionPanel.
   */
  visuallyHidden?: boolean;
  className?: string;
  dts?: string;
}

declare const ActionPanel: React.FC<ActionPanelProps>;

export default ActionPanel;
