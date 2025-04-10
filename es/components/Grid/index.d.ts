import * as React from 'react';

export interface GridProps {
  /**
   * the children to be rendered
   */
  children?: React.ReactNode;
  /**
   * data-test-selector of the grid
   */
  dts?: string;
}

declare const Grid: React.FC<GridProps>;

export default Grid;
