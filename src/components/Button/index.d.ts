import * as React from 'react';

export type ButtonVariant = 'solid' | 'borderless' | 'inverse' | 'link';

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type ButtonSize = 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Controls the main display mode for the button.
   */
  variant?: ButtonVariant;
  /**
   * Controls the main color for the button.
   */
  color?: ButtonColor;
  /**
   * Controls the size for the button.
   */
  size?: ButtonSize;
  /**
   * Controls if the button should render a spinner.
   * When set to true, the button will be disabled as well.
   */
  isLoading?: boolean;
  /**
   * Controls if the button is disabled.
   */
  disabled?: boolean;
  /**
   * Controls if the button should expand to its closet container
   */
  fullWidth?: boolean;
  /**
   * Controls if the button should be circular.
   * Only allowed when the button has no `children` and `icon` is given.
   */
  round?: boolean;
  /**
   * Controls the icon to be displayed for the button.
   */
  icon?: React.ReactNode;
  /**
   * Controls the main content to be displayed within the button.
   * When both children and icon are given, icon will be on the left.
   */
  children?: React.ReactNode;
  /**
   * Adds additional class names to the button
   */
  className?: string;
  /**
   * Adds `data-test-selector` to the button
   */
  dts?: string;
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
