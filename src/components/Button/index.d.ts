import * as React from 'react';

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type ButtonVariant = 'solid' | 'borderless' | 'inverse' | 'link';

export type ButtonSize = 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * default, primary, secondary, success, danger, warning, info
   */
  color?: ButtonColor;
  /**
   * solid, borderless, inverse, link
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  round?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  dts?: string;
  href?: string;
  isLoading?: boolean;
  /**
   * @deprecated
   * Please use the `color` prop instead.
   */
  theme?: string;
  /**
   * @deprecated
   * Please use `variant="inverse"` instead.
   */
  inverse?: boolean;
}

declare const Button: React.FC<ButtonProps>;

export default Button;
