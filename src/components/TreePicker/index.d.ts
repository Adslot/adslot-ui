import * as React from 'react';

export interface TreePickerNodeContentProps {
  className?: string;
  children: React.ReactNode;
  onIncludeAll?: (...args: any[]) => any;
}

export declare const TreePickerNodeContent: React.FC<TreePickerNodeContentProps>;

export interface TreePickerNodeExpandProps {
  className?: string;
  inline?: boolean;
  resolveNodes?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
  onMouseEnter?: (...args: any[]) => any;
  onMouseLeave?: (...args: any[]) => any;
}

export declare const TreePickerNodeExpand: React.FC<TreePickerNodeExpandProps>;

export interface TreePickerNodeAddProps {
  onAdd: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
  className?: string;
}

export declare const TreePickerNodeAdd: React.FC<TreePickerNodeAddProps>;

export declare const TreePickerNodePlaceholder: React.FC;

export interface TreePickerNodeNode {
  id: string | number;
  label: string;
}

export interface TreePickerNodeProps {
  node: TreePickerNodeNode;
  children: React.ReactNode;
  className?: string;
  dts?: string;
}

export declare const TreePickerNode: React.FC<TreePickerNodeProps> & {
  Content: typeof TreePickerNodeContent;
  Expand: typeof TreePickerNodeExpand;
  Add: typeof TreePickerNodeAdd;
  Placeholder: typeof TreePickerNodePlaceholder;
};

export interface TreePickerNavProps {
  rootLabel?: string;
  className?: string;
  onNavTo?: (...args: any[]) => any;
}

export declare const TreePickerNav: React.FC<TreePickerNavProps>;

export interface TreePickerHeaderProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  dts?: string;
}

export declare const TreePickerHeader: React.FC<TreePickerHeaderProps>;

export interface TreePickerSearchProps {
  resolveNodes: (...args: any[]) => any;
  className?: string;
  disabled?: boolean;
}

export declare const TreePickerSearch: React.FC<TreePickerSearchProps>;

export interface TreePickerTreeProps {
  resolveRootNodes: (...args: any[]) => any;
  className?: string;
  hiddenNodeIds?: string[];
  placeholder?: React.ReactNode;
  emptyState?: React.ReactNode;
  dts?: string;
}

export declare const TreePickerTree: React.FC<TreePickerTreeProps>;

export interface TreePickerProps {
  children: React.ReactNode;
  renderNode: (...args: any[]) => any;
  className?: string;
}

export declare const TreePicker: React.FC<TreePickerProps> & {
  Node: typeof TreePickerNode;
  Nav: typeof TreePickerNav;
  Header: typeof TreePickerHeader;
  Search: typeof TreePickerSearch;
  Tree: typeof TreePickerTree;
};

export default TreePicker;
