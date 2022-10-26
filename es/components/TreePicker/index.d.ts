import * as React from 'react';

export interface TreePickerSimplePureBreadcrumbNodes {
  id?: any;
  label: string;
}

export interface TreePickerSimplePureSelectedNodes {
  id?: any;
  label: string;
  isExpandable?: boolean;
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

export interface TreePickerSimplePureSubtree {
  id?: any;
  label: string;
  isExpandable?: boolean;
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

export interface TreePickerSimplePureBreadcrumbRootNode {
  id?: any;
  label: string;
}

export interface TreePickerSimplePureProps {
  /**
   * Class Names for SplitPane component
   */
  additionalClassNames?: string[];
  /**
   * Returns node id. This prop is not required, but an empty array is not allowed. At least one element is required in the array.
   */
  breadcrumbNodes?: TreePickerSimplePureBreadcrumbNodes[];
  /**
   * This propType creates a list of breadcrumb node
   */
  breadcrumbOnClick?: (...args: any[]) => any;
  /**
   * Interval time on search
   */
  debounceInterval?: number;
  /**
   * Disables treepicker including search bar
   */
  disabled?: boolean;
  /**
   * Disables treepicker's grid item
   */
  disableInclude?: boolean;
  /**
   * The svg symbol used when there will be no item on both left or right Grid
   */
  emptySvgSymbol?: React.ReactNode;
  /**
   * The svg symbol used when there will be no item on right Grid (Selected list)
   */
  emptySelectedListSvgSymbol?: React.ReactNode;
  /**
   * Displays this text when there will be no item on left Grid. Prefer type 'string', but rich text can be used here
   */
  emptyText?: React.ReactNode;
  /**
   * Displays this text when there will be no item on right Grid(Selected list). Prefer type 'string', but rich text can be used here.
   */
  emptySelectedListText?: React.ReactNode;
  /**
   * Triggers when clicking any item in the left Grid
   */
  expandNode?: (...args: any[]) => any;
  /**
   * This function use to transform keys of the list item in the left Grid
   */
  groupFormatter?: (...args: any[]) => any;
  /**
   * Hides the empty icon on right Grid (Selected list). Given emptySvgSymbol and hideIcon together, the empty symbol will be only displayed on the left grid.
   */
  hideIcon?: boolean;
  /**
   * Click event on '+' button of each list Item
   */
  includeNode?: (...args: any[]) => any;
  /**
   * Same as emptyText
   */
  initialStateNode?: React.ReactNode;
  /**
   * Same as emptySymbol
   */
  initialStateSymbol?: React.ReactNode;
  /**
   * Uses for specific className
   */
  itemType?: string;
  isLoading?: boolean;
  /**
   * Uses for rendering custom node
   */
  nodeRenderer?: (...args: any[]) => any;
  removeNode?: (...args: any[]) => any;
  /**
   * Triggers when search input changes
   */
  onChange?: (...args: any[]) => any;
  /**
   * Triggers when the user clicks the clear button on search input
   */
  onClear?: (...args: any[]) => any;
  /**
   * Please see <a href='/search'>Search</a>
   */
  onSearch?: (...args: any[]) => any;
  /**
   * Please see <a href='/search'>Search</a>
   */
  searchOnEnter?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  selectedNodes: TreePickerSimplePureSelectedNodes[];
  /**
   * Show or hide the search field on the selection pane
   */
  showSearch?: boolean;
  /**
   * A list of available unselected nodes. This prop is not required, but an empty array is not allowed. At least one element is required in the array.
   */
  subtree?: TreePickerSimplePureSubtree[];
  svgSymbolCancel?: React.ReactNode;
  svgSymbolSearch?: React.ReactNode;
  /**
   * e.g: Default Group
   */
  displayGroupHeader?: boolean;
  hideSearchOnRoot?: boolean;
  /**
   * A react node to be rendered at the top of the right hand side pane. Generally we are expecting a search component.
   */
  selectedTopSearch?: React.ReactNode;
  addNodePopoverInfoProps?: Object;
  removeNodePopoverInfoProps?: Object;
  breadcrumbRootNode?: TreePickerSimplePureBreadcrumbRootNode;
}

declare const TreePickerSimplePure: React.FC<TreePickerSimplePureProps>;

export default TreePickerSimplePure;
