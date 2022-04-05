import * as React from 'react';

export interface BreadcrumbRootNode {
  id: string;
  label: string;
}

export interface BreadcrumbNodes {
  id: string;
  label: string;
}

export interface BreadcrumbProps {
  rootNode?: BreadcrumbRootNode;
  divider?: React.ReactNode;
  nodes?: BreadcrumbNodes[];
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
}

declare const Breadcrumb: React.FC<BreadcrumbProps>;

export default Breadcrumb;
