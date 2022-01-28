import * as React from 'react';

export type ButtonTheme = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'link';

export type ButtonTarget = '_blank' | '_self' | '_parent' | '_top';

export type ButtonSize = 'small' | 'large';

export type ButtonType = 'button' | 'reset' | 'submit';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
   */
  theme?: ButtonTheme;
  className?: string;
  dts?: string;
  href?: string;
  /**
   * The target attribute specifies where to open the linked document when there is a defined 'href',
   * PropTypes.oneOf(['_blank', '_self', '_parent', '_top'])
   */
  target?: ButtonTarget;
  inverse?: boolean;
  isLoading?: boolean;
  /**
   * PropTypes.oneOf(['small', 'large'])
   */
  size?: ButtonSize;
  /**
   * PropTypes.oneOf(['button', 'reset', 'submit'])
   */
  type?: ButtonType;
}

declare const Button: React.FC<ButtonProps>;

export default Button;
