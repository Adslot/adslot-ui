import * as React from 'react';

export type PillColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type PillSize = 'large' | 'medium' | 'small';

export interface PillProps {
  /**
   * Content inside pill
   */
  children?: React.ReactNode;
  /**
   * The main color for the pill
   */
  color?: PillColor;
  /**
   * one of ["large",  "medium", "small"]
   */
  size?: PillSize;
  /**
   * Inverse the background and content color
   */
  inverse?: boolean;
  /**
   * Custom onClick event
   */
  onClick?: (...args: any[]) => any;
  /**
   * Generate "data-test-selector" on the pill
   */
  dts?: string;
  /**
   * Custom classnames
   */
  className?: string;
}

declare const Pill: React.FC<PillProps>;

export default Pill;
