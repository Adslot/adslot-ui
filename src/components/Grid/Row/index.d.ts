import * as React from 'react';

export type GridRowType = 'body' | 'header' | 'subfooter' | 'footer';

export interface GridRowProps {
  /**
   * the children to be rendered
   */
  children?: React.ReactNode;
  /**
   * determines if horizontalBorder is to be rendered
   */
  horizontalBorder?: boolean;
  /**
   * determines if the row is short or long
   */
  short?: boolean;
  /**
   * determines the type of griRow: oneOf(['body', 'header', 'subfooter', 'footer'])
   */
  type?: GridRowType;
  /**
   * determines if verticalCellBorder should be displayed
   */
  verticalCellBorder?: boolean;
  /**
   * data-test-selector of the grid
   */
  dts?: string;
}

declare const GridRow: React.FC<GridRowProps>;

export default GridRow;
