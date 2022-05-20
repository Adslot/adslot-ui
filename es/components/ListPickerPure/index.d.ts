import * as React from 'react';

export interface ListPickerPureItemHeaders {
  label?: React.ReactNode;
  toggle?: string;
  addon?: string;
}

export interface ListPickerPureItems {
  id: any;
}

export interface ListPickerPureSelectedItems {
  id: any;
}

export interface ListPickerPureProps {
  allowMultiSelection?: boolean;
  deselectItem?: (...args: any[]) => any;
  emptyMessage?: string;
  emptySvgSymbol?: React.ReactNode;
  labelFormatter?: (...args: any[]) => any;
  addonFormatter?: (...args: any[]) => any;
  itemHeaders?: ListPickerPureItemHeaders;
  items?: ListPickerPureItems[];
  itemType?: string;
  selectItem?: (...args: any[]) => any;
  selectedItems?: ListPickerPureSelectedItems[];
}

export default class ListPickerPure extends React.Component<ListPickerPureProps, any> {
  render(): JSX.Element;
}
