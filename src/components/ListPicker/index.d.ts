import * as React from 'react';

export interface ListPickerInitialSelection {
  id: number;
}

export interface ListPickerItemHeaders {
  label?: string;
  toggle?: string;
  addon?: string;
}

export interface ListPickerItemInfo {
  label: string;
  properties: {
    label: string;
    value?: string;
  }[];
}

export interface ListPickerItems {
  id: number;
}

export type ListPickerLinkButtons =
  | {
      label: string;
      href: string;
    }
  | React.ReactNode;

export interface ListPickerProps {
  allowEmptySelection?: boolean;
  allowMultiSelection?: boolean;
  emptyMessage?: string;
  emptySvgSymbol?: React.ReactNode;
  initialSelection?: ListPickerInitialSelection[];
  itemHeaders?: ListPickerItemHeaders;
  itemInfo?: ListPickerItemInfo;
  items?: ListPickerItems[];
  itemType?: string;
  labelFormatter?: (...args: any[]) => any;
  addonFormatter?: (...args: any[]) => any;
  modalApply?: (...args: any[]) => any;
  modalDescription?: string;
  modalClassName?: string;
  modalClose?: (...args: any[]) => any;
  modalFootnote?: string;
  modalTitle?: string;
  show?: boolean;
  linkButtons?: ListPickerLinkButtons[];
}

declare const ListPicker: React.FC<ListPickerProps>;

export default ListPicker;
