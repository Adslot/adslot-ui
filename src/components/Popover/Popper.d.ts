import * as React from 'react';
import type { PopperModifiers } from './ReactPopper';

export type PopperPlacement =
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

export type PopperStrategy = 'absolute' | 'fixed';

export type PopperPopoverContent = React.ReactNode | ((...args: any[]) => any);

export interface PopperProps<M = ''> extends PopperModifiers<M> {
  arrowStyles?: Object;
  dts?: string;

  placement?: PopperPlacement;
  strategy?: PopperStrategy;
  popoverClass?: string;
  popoverContent: PopperPopoverContent;
  refElement?: Element;
  title?: string;
  wrapperStyles?: Object;
  popperRef?: (...args: any[]) => any;
  hasHoverRegion?: boolean;
}

declare const Popper: <M>(props: PopperProps<M>) => React.ReactElement<any, any> | null;

export default Popper;
