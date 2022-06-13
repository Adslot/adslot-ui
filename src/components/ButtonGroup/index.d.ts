import * as React from 'react';

export type ButtonGroupColor = 'primary' | 'success' | 'danger';

export type ButtonGroupVariant = 'inverse' | 'borderless' | 'solid';

export type ButtonGroupSize = 'large';

export interface ButtonGroupProps {
  dts?: string;
  children?: React.ReactNode;
  /**
   * primary, success, danger
   */
  color?: ButtonGroupColor;
  variant?: ButtonGroupVariant;
  disabled?: boolean;
  size?: ButtonGroupSize;
}

export default class ButtonGroup extends React.Component<ButtonGroupProps, any> {
  render(): JSX.Element;
}
