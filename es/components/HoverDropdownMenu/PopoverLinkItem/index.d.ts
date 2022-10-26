import * as React from 'react';

export type PopoverLinkItemTarget = '_blank' | '_self' | '_modal';

export interface PopoverLinkItemProps {
  onClick?: (...args: any[]) => any;
  target?: PopoverLinkItemTarget;
  title: string;
  url?: string;
  isEnabled?: boolean;
}

export default class PopoverLinkItem extends React.Component<PopoverLinkItemProps, any> {
  render(): JSX.Element;
}
