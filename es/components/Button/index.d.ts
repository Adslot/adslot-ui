import * as React from 'react';

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type ButtonVariant = 'solid' | 'borderless' | 'inverse' | 'link';

export type ButtonSize = 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  round?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  dts?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

declare const Button: React.FC<ButtonProps>;

export default Button;
