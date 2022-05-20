import * as React from 'react';

export interface VerticalNavigationProps {
  /**
   * control whether the MenuItem can be folded into a collapse icon (hamburger)
   */
  collapsable?: boolean;
  isCollapsed?: boolean;
  /**
   * event handler for clicking on the collapse/expand button
   * </br>
   * const onClick = () => ...
   */
  onClick?: (...args: any[]) => any;
  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts?: string;
  className?: string;
}

export default class VerticalNavigation extends React.Component<VerticalNavigationProps, any> {
  render(): JSX.Element;
}
