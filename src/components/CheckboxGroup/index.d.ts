import * as React from 'react';

export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

export type CheckboxGroupVariant = 'default' | 'box';

export interface CheckboxGroupProps {
  value: any[];
  name: string;
  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange: (...args: any[]) => any;
  /**
   * @function getIsChecked overrides the default checked state behaviour
   * @param {string|number} itemValue - the checkbox's value
   * @param {array} value - the checkbox group's value
   */
  getIsChecked?: (...args: any[]) => any;
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
