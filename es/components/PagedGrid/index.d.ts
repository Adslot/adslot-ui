import * as React from 'react';

export interface PagedGridColumns {
  key: string;
  label?: any;
  stretch?: boolean;
}

export interface PagedGridItems {
  id: any;
}

export interface PagedGridProps {
  columns: PagedGridColumns[];
  emptyMessage?: string;
  emptySvgSymbol?: React.ReactNode;
  items: PagedGridItems[];
  perPage: number;
  verticalCellBorder?: boolean;
}

export default class PagedGrid extends React.Component<PagedGridProps, any> {
  render(): JSX.Element;
}
