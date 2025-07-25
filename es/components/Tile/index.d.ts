import * as React from 'react';

export interface TileProps {
  /**
   * Custom classnames
   */
  className?: string;
  /**
   * Tile title
   */
  title?: React.ReactNode;
  /**
   * Use Logo as a tile
   */
  imgLink?: string;
  /**
   * Custome onClick event
   */
  onClick?: (...args: any[]) => any;
  /**
   * Generate "data-test-selector" on the pill
   */
  dts?: string;
}

declare const Tile: React.FC<TileProps>;

export default Tile;
