import * as React from 'react';

export type StatusPillDisplayStyle = 'primary' | 'success' | 'warning' | 'error' | 'light';

export type StatusPillSize = 'large' | 'medium' | 'small';

export type StatusPillClassName = string | string[];

export interface StatusPillProps {
  /**
   * Text inside status pill
   */
  status: React.ReactNode;
  /**
   * one of ["primary", "success", "warning", "error", "light"]
   */
  displayStyle?: StatusPillDisplayStyle;
  /**
   * one of ["large",  "medium", "small"]
   */
  size?: StatusPillSize;
  /**
   * Status pill with inverse style
   */
  inverse?: boolean;
  /**
   * Generate "data-test-selector" on the status pill
   */
  dts?: string;
  className?: StatusPillClassName;
}

declare const StatusPill: React.FC<StatusPillProps>;

export default StatusPill;
