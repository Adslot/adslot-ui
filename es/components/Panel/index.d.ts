import * as React from 'react';

export interface PanelProps {
  id: string;
  className?: string;
  dts?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  isCollapsed?: boolean;
  onClick?: (...args: any[]) => any;
  children?: React.ReactNode;
  animate?: boolean;
}

declare const Panel: React.FC<PanelProps>;

export default Panel;
