import * as React from 'react';

export type NavActiveKey = string | number;

export type NavBarPosition = 'top' | 'bottom' | 'none';

export interface NavProps {
  /**
   * NavItems are be positioned horizontally or vertically.
   */
  stacked?: boolean;
  className?: string;
  /**
   * A callback fired when any children is selected.
   * e.g. onSelect = {(eventKey) => console.log(eventKey)}
   * where the eventKey is the unique key of each child.
   */
  onSelect?: (...args: any[]) => any;
  /**
   * A key for the current active item
   */
  activeKey?: NavActiveKey;
  children?: React.ReactNode;
  /**
   * define the position (styling) of the active item bar
   */
  barPosition?: NavBarPosition;
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts?: string;
}

declare const Nav: React.FC<NavProps>;

export default Nav;

export type NavItemActiveKey = string | number;

export type NavItemEventKey = string | number;

export interface NavItemProps {
  /**
   * Disable one menu item.
   */
  disabled?: boolean;
  className?: string;
  onSelect?: (...args: any[]) => any;
  activeKey?: NavItemActiveKey;
  children?: React.ReactNode;
  /**
   * A key for each item, and can be used in onSelect
   */
  eventKey?: NavItemEventKey;
  /**
   * Define the href of the <a />
   */
  href?: string;
}

export const NavItem: React.FC<NavItemProps>;
