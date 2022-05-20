import * as React from 'react';

export type AnchorColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type AnchorVariant = 'solid' | 'borderless' | 'inverse' | 'link';

export type AnchorSize = 'medium' | 'large';

export interface AnchorProps {
  color?: AnchorColor;
  variant?: AnchorVariant;
  size?: AnchorSize;
  href?: string;
  round?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
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

declare const Anchor: React.FC<AnchorProps>;

export default Anchor;
