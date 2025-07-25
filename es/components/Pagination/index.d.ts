import * as React from 'react';

export interface PaginationProps {
  className?: string;
  /**
   * The default active page, between 1 to the page count
   */
  activePage?: number;
  /**
   * The max page count
   */
  pageCount: number;
  /**
   * A callback function for when clicking on previous, next and pagination items
   */
  onSelect: (...args: any[]) => any;
  /**
   * The Prev Button is displayed or not
   */
  prev?: boolean;
  /**
   * The Next buton is displayed or not
   */
  next?: boolean;
}

declare const Pagination: React.FC<PaginationProps>;

export default Pagination;
