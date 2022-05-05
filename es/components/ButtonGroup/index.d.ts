import * as React from 'react';

export type ButtonGroupTheme = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'link';

export interface ButtonGroupProps {
  dts?: string;
  children?: React.ReactNode;
  /**
   * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
   */
  theme?: ButtonGroupTheme;
  inverse?: boolean;
  disabled?: boolean;
  size?: string;
}

export default class ButtonGroup extends React.Component<ButtonGroupProps, any> {
  render(): JSX.Element;
}
