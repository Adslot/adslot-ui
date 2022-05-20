import * as React from 'react';

export interface GridCellProps {
  /**
   * list of addOn classNames as array of strings
   */
  addonClassNames?: string[];
  /**
   * the children to be rendered
   */
  children?: React.ReactNode;
  classSuffixes?: string[];
  /**
   * data-test-selector of the gridCell
   */
  dts?: string;
  /**
   * function that will be called when gridCell is clicked
   */
  onClick?: (...args: any[]) => any;
  /**
   * determines if gridCell should be stretched
   */
  stretch?: boolean;
}

declare const GridCell: React.FC<GridCellProps>;

export default GridCell;
