import * as React from 'react';

export interface PageTitleProps {
  children?: React.ReactNode;
  isFooter?: boolean;
  title?: React.ReactNode;
}

declare const PageTitle: React.FC<PageTitleProps>;

export default PageTitle;
