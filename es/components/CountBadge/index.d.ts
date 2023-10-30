import * as React from 'react';

export interface CountBadgeProps {
  /**
   * determines the number that is rendered inside the counter badge
   */
  value: number;
  /**
   * determines the appearance of the counter badge: oneOf(['info', 'warning', 'danger', 'light'])
   */
  status?: string;
  /**
   * data-test-selector for the counter badge component
   */
  dts?: string;
}

declare const CountBadge: React.FC<CountBadgeProps>;

export default CountBadge;
