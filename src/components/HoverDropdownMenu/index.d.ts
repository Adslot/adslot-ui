import * as React from 'react';

export type HoverDropdownMenuArrowPosition = 'left' | 'right';

export interface HoverDropdownMenuProps {
  /**
   * Determine the placement of the popover
   */
  arrowPosition?: HoverDropdownMenuArrowPosition;
  /**
   * If set to empty string, header will not be rendered.
   */
  headerText?: string;
  hoverComponent: React.ReactElement<any>;
  children?: React.ReactNode;
}

declare const HoverDropdownMenu: React.FC<HoverDropdownMenuProps>;

export default HoverDropdownMenu;
