import * as React from 'react';

export type EmptyCollection = React.ReactNode | any[] | Object;

export interface EmptyProps {
  collection?: EmptyCollection;
  text?: React.ReactNode;
  icon?: React.ReactNode;
}

declare const Empty: React.FC<EmptyProps>;

export default Empty;
