import * as React from 'react';

export interface VerticalNavProps {
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

export default class VerticalNav extends React.Component<VerticalNavProps, any> {
  render(): JSX.Element;
}
