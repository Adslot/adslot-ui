import * as React from 'react';

export type AnchorColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type AnchorVariant = 'solid' | 'borderless' | 'inverse' | 'link';

export type AnchorSize = 'medium' | 'large';

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: AnchorColor;
  variant?: AnchorVariant;
  size?: AnchorSize;
  href: string;
  round?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  dts?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

declare const Anchor: React.FC<AnchorProps>;

export default Anchor;
