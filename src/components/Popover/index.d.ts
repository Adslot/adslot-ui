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

export interface PopoverAnchorRef {
  current?: any;
}

export interface PopoverTriggerRef {
  current?: any;
}

export interface PopoverProps<M = ''> extends PopperModifiers<M> {
  theme?: PopoverTheme;
  title?: React.ReactNode;
  className?: string;
  popoverClassNames?: string;
  /**
   * hover show delay in ms
   */
  delayShow?: number;
  /**
   * hover hide delay in ms
   */
  delayHide?: number;
  /**
   * when used with the hover trigger, hovering the popover content
   * will keep the popover open.
   * Popover will close when mousing out of the popover content.
   * For the best UX, use with `delayHide` of at least 200
   */
  contentHoverable?: boolean;
  /**
   * when true:
   * - the popover content will be focused after opening
   * - the popover content will trap focus
   * - the popover trigger will re-focus on close
   */
  isMenu?: boolean;
  /**
   * callback fired when Popover open state changes
   * @param {boolean} openState
   * @param {object} event - event object
   * @param {string} eventType - the type of event that triggered this change.
   * Either a dom event (`keydown`, `pointerover`, `pointerleave`, `click`),
   * or `clickOutside`, when closed via clicking outside, `disabed` when disabled trigger is applied.
   */
  onOpenChange?: (...args: any[]) => any;
  /**
   * [`isMenu`] callback called when closing on outside click
   */
  onClickOutside?: (...args: any[]) => any;
  /**
   * arrow css styles, mainly for positioning the arrow
   */
  arrowStyles?: Object;
  wrapperStyles?: Object;

  placement?: PopoverPlacement;
  strategy?: PopoverStrategy;
  popoverContent: PopoverPopoverContent;
  /**
   * children is optional when using `triggerRef`
   */
  children?: React.ReactNode;
  triggers?: PopoverTriggers;
  isOpen?: boolean;
  getContainer?: (...args: any[]) => any;
  anchorRef?: PopoverAnchorRef;
  triggerRef?: PopoverTriggerRef;
  dts?: string;
}

declare const Popover: (<M>(props: PopoverProps<M>) => React.ReactElement<any, any> | null) & {
  WithRef: typeof WithRef;
};

export default Popover;
