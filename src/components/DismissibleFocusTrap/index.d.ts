import * as React from 'react';

export interface DismissibleFocusTrapProps {
  /**
   * loops the tab sequence
   */
  loop?: boolean;
  /**
   * focus the first focussable element on mount
   */
  focusOnMount?: boolean;
  /**
   * disable all behaviour
   */
  disabled?: boolean;
  onEscape?: (...args: any[]) => any;
  onClickOutside?: (...args: any[]) => any;
  /**
   * useful if a menu/popover should be closed after tabbing through it
   */
  onTabExit?: (...args: any[]) => any;
  onShiftTabExit?: (...args: any[]) => any;
  children?: React.ReactNode;
}

declare const DismissibleFocusTrap: React.FC<DismissibleFocusTrapProps>;

export default DismissibleFocusTrap;
