import * as React from 'react';

export interface TileGridItems {
  id: string | number;
  classSuffix: string;
  title: React.ReactNode;
  imgLink?: string;
  width?: number;
  maxWidth?: number;
  imgAlign?: 'left' | 'right' | 'center';
}

export interface TileGridProps {
  title?: React.ReactNode;
  /**
   * The shape of item object is defined below
   */
  items: TileGridItems[];
  onItemClick: (...args: any[]) => any;
  /**
   * If distributed is true, each tile in this component will have a distributed width.
   */
  distributed?: boolean;
}

declare const TileGrid: React.FC<TileGridProps>;

export default TileGrid;
