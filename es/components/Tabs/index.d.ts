import * as React from 'react';

export type TabsDefaultActiveKey = string | number;

export type TabsActiveKey = string | number;

export interface TabsProps {
  id: string;
  children: React.ReactNode;
  /**
   * string or number
   */
  defaultActiveKey?: TabsDefaultActiveKey;
  /**
   * string or number
   */
  activeKey?: TabsActiveKey;
  /**
   * (selectedTabKey) => {...}
   */
  onSelect?: (...args: any[]) => any;
}

declare const Tabs: React.FC<TabsProps>;

export default Tabs;
