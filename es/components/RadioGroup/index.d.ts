import * as React from 'react';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export type RadioGroupVariant = 'default' | 'box';

export interface RadioGroupProps {
  value: string;
  name: string;
  onChange: (...args: any[]) => any;
  orientation?: RadioGroupOrientation;
  children: React.ReactNode;
  className?: string;
  dts?: string;
  variant?: RadioGroupVariant;
  id?: string;
  /**
   * @deprecated use orientation="horizontal" instead
   */
  inline?: boolean;
}

declare const RadioGroup: React.FC<RadioGroupProps>;

export default RadioGroup;
