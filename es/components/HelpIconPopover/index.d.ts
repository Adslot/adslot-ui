import * as React from 'react';

export type HelpIconPopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface HelpIconPopoverProps {
  children: React.ReactNode;
  id: string;
  placement?: HelpIconPopoverPlacement;
}

declare const HelpIconPopover: React.FC<HelpIconPopoverProps>;

export default HelpIconPopover;
