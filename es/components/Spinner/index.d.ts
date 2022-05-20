import * as React from 'react';

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  className?: string;
  /**
   * Size of the spinner should be one of: 'large' (40x40px), 'medium' (30x30px), 'small' (16x16px)
   */
  size?: SpinnerSize;
}

declare const Spinner: React.FC<SpinnerProps>;

export default Spinner;
