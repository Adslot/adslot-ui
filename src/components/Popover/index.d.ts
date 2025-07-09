import * as React from 'react';
import WithRef from './WithRef';
import type { PopperModifiers } from './ReactPopper';

export type PopoverTheme = 'light' | 'dark' | 'warn' | 'error' | 'info' | 'success';

export type PopoverPlacement =
  | 'auto'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'auto-start'
  | 'top-start'
  | 'right-start'
  | 'bottom-start'
  | 'left-start'
  | 'auto-end'
  | 'top-end'
  | 'right-end'
  | 'bottom-end'
  | 'left-end';

export type PopoverStrategy = 'absolute' | 'fixed';

export type PopoverPopoverContent = React.ReactNode | ((...args: any[]) => any);

export type PopoverTriggers = 'click' | 'hover' | 'focus' | 'disabled' | ('click' | 'hover' | 'focus' | 'disabled')[];

export interface PopoverProps<M = ''> extends PopperModifiers<M> {
  theme?: PopoverTheme;
  title?: React.ReactNode;
  className?: string;
  popoverClassNames?: string;
  /**
   * arrow css styles, mainly for positioning the arrow
   */
  arrowStyles?: object;
  wrapperStyles?: object;

  placement?: PopoverPlacement;
  strategy?: PopoverStrategy;
  popoverContent: PopoverPopoverContent;
  children: React.ReactNode;
  triggers?: PopoverTriggers;
  isOpen?: boolean;
  getContainer?: (...args: any[]) => any;
  popperRef?: (...args: any[]) => any;
  dts?: string;
}

declare const Popover: (<M>(props: PopoverProps<M>) => React.ReactElement<any, any> | null) & {
  WithRef: typeof WithRef;
};

export default Popover;
