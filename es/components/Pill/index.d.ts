import * as React from 'react';

export type PillClassName = string | string[];

export type PillSize = 'large' | 'medium' | 'small';

export interface PillProps {
  /**
   * Content inside pill
   */
  children: React.ReactNode;
  /**
   * Custom classnames
   */
  className?: PillClassName;
  /**
   * Custome onClick event
   */
  onClick?: (...args: any[]) => any;
  /**
   * one of ["large",  "medium", "small"]
   */
  size?: PillSize;
  /**
   * Generate "data-test-selector" on the pill
   */
  dts?: string;
}

declare const Pill: React.FC<PillProps>;

export default Pill;
