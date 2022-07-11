import * as React from 'react';

export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

export type CheckboxGroupVariant = 'default' | 'box';

export interface CheckboxGroupProps {
  value: any[];
  name: string;
  onChange: (...args: any[]) => any;
  orientation?: CheckboxGroupOrientation;
  children: React.ReactNode;
  className?: string;
  dts?: string;
  variant?: CheckboxGroupVariant;
  id?: string;
  /**
   * @deprecated use orientation="horizontal" instead
   */
  inline?: boolean;
}

declare const CheckboxGroup: React.FC<CheckboxGroupProps>;

export default CheckboxGroup;
