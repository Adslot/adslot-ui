import * as React from 'react';

export type RadioGroupChildren = React.ReactNode[] | React.ReactNode;

export interface RadioGroupProps {
  id?: string;
  className?: string;
  name: string;
  value: string;
  children: RadioGroupChildren;
  onChange: (...args: any[]) => any;
  dts?: string;
  inline?: boolean;
}

declare const RadioGroup: React.FC<RadioGroupProps>;

export default RadioGroup;
