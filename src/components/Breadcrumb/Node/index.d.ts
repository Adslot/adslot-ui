import * as React from 'react';

export interface BreadcrumbNodeNode {
  id: string | number;
  label: string;
}

export interface BreadcrumbNodeProps {
  isLast: boolean;
  node?: BreadcrumbNodeNode;
  onClick: (...args: any[]) => any;
}

declare const BreadcrumbNode: React.FC<BreadcrumbNodeProps>;

export default BreadcrumbNode;
