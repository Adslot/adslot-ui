import * as React from 'react';

export interface TreePickerNodeExpanderProps {
  isLoading?: boolean;
  onClick: (...args: any[]) => any;
}

declare const TreePickerNodeExpander: React.FC<TreePickerNodeExpanderProps>;

export default TreePickerNodeExpander;
