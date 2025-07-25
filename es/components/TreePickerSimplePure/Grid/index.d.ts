import * as React from 'react';

export interface TreePickerGridNodes {
  id?: any;
  label: string;
  isExpandable?: boolean;
  unExpandableMessage?: string;
  path?: {
    id?: any;
    label: string;
  }[];
  ancestors?: {
    id?: any;
    label: string;
  }[];
  type: string;
  value?: number;
  accent?: 'warning' | 'success' | 'info' | 'error';
}

export interface TreePickerGridProps {
  disabled?: boolean;
  emptySvgSymbol?: React.ReactNode;
  emptyText: React.ReactNode;
  expandNode?: (...args: any[]) => any;
  groupFormatter?: (...args: any[]) => any;
  hideIcon?: boolean;
  includeNode?: (...args: any[]) => any;
  itemType: string;
  isLoading?: boolean;
  nodes?: TreePickerGridNodes[];
  nodeRenderer?: (...args: any[]) => any;
  removeNode?: (...args: any[]) => any;
  selected: boolean;
  valueFormatter?: (...args: any[]) => any;
  displayGroupHeader?: boolean;
  addNodePopoverInfoProps?: Object;
  removeNodePopoverInfoProps?: Object;
}

declare const TreePickerGrid: React.FC<TreePickerGridProps>;

export default TreePickerGrid;
