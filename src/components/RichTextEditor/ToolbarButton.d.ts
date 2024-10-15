import * as React from 'react';

export interface ToolbarButtonProps {
  onToggle: (...args: any[]) => any;
  label: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

declare const ToolbarButton: React.FC<ToolbarButtonProps>;

export default ToolbarButton;
