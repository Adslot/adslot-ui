import * as React from 'react';
import type { PopperModifiers } from './ReactPopper';

export type WithRefTheme = 'light' | 'dark' | 'warn' | 'error' | 'info' | 'success';

export type WithRefPlacement =
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

export type WithRefStrategy = 'absolute' | 'fixed';

export type WithRefPopoverContent = React.ReactNode | ((...args: any[]) => any);

export interface WithRefProps<M = ''> extends PopperModifiers<M> {
  refElement?: HTMLElement;
  title?: string;
  theme?: WithRefTheme;
  popoverClassNames?: string;
  getContainer?: (...args: any[]) => any;
  arrowStyles?: Object;
  wrapperStyles?: Object;

  placement?: WithRefPlacement;
  strategy?: WithRefStrategy;
  popoverContent: WithRefPopoverContent;
  isOpen?: boolean;
  popperRef?: (...args: any[]) => any;
  dts?: string;
}

declare const WithRef: <M>(props: WithRefProps<M>) => React.ReactElement<any, any> | null;

export default WithRef;
