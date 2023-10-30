import * as React from 'react';

export interface TreePickerNavBreadcrumbNodes {
  id?: any;
  label: string;
}

export interface TreePickerNavBreadcrumbRootNode {
  id?: any;
  label: string;
}

export interface TreePickerNavProps {
  breadcrumbNodes?: TreePickerNavBreadcrumbNodes[];
  breadcrumbOnClick?: (...args: any[]) => any;
  disabled?: boolean;
  isLoading?: boolean;
  onChange?: (...args: any[]) => any;
  onClear?: (...args: any[]) => any;
  onSearch?: (...args: any[]) => any;
  debounceInterval?: number;
  searchOnEnter?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  showSearch?: boolean;
  svgSymbolCancel?: React.ReactNode;
  svgSymbolSearch?: React.ReactNode;
  breadcrumbRootNode?: TreePickerNavBreadcrumbRootNode;
}

declare const TreePickerNav: React.FC<TreePickerNavProps>;

export default TreePickerNav;
