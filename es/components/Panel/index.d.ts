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
}

export default class Panel extends React.Component<PanelProps, any> {
  render(): JSX.Element;
}
