import * as React from 'react';

export type TabEventKey = string | number;

export interface TabProps {
  children: React.ReactNode;
  /**
   * string or number
   */
  eventKey: TabEventKey;
  title: React.ReactNode;
  tabClassName?: string;
  disabled?: boolean;
  show?: boolean;
}

declare const Tab: React.FC<TabProps>;

export default Tab;
