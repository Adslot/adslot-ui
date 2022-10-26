import * as React from 'react';

export interface TreePickerNodeProps {
  disabled?: boolean;
  expandNode?: (...args: any[]) => any;
  includeNode?: (...args: any[]) => any;
  itemType: string;
  node?: any;
  nodeRenderer?: (...args: any[]) => any;
  removeNode?: (...args: any[]) => any;
  selected?: boolean;
  valueFormatter?: (...args: any[]) => any;
  addNodePopoverInfoProps?: Object;
  removeNodePopoverInfoProps?: Object;
}

export default class TreePickerNode extends React.Component<TreePickerNodeProps, any> {
  render(): JSX.Element;
}
