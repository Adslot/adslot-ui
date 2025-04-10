import * as React from 'react';

export type SkeletonClassName = string | string[];

export type SkeletonVariant = 'rect' | 'circle' | 'text';

export interface SkeletonProps {
  animated?: boolean;
  /**
   * Custom classnames
   */
  className?: SkeletonClassName;
  /**
   * Generate "data-test-selector"
   */
  dts?: string;
  height?: string;
  /**
   * oneOf: 'rect', 'circle', 'text'
   */
  variant?: SkeletonVariant;
  width?: string;
}

declare const Skeleton: React.FC<SkeletonProps>;

export default Skeleton;
