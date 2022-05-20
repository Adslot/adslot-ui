import * as React from 'react';

export type CheckboxChecked = boolean | 'partial';

export interface CheckboxProps {
  /**
   * id for the checkbox input
   */
  id?: string;
  className?: string;
  /**
   * name for the checkbox input
   */
  name?: string;
  /**
   * checkBox label for the checkbox input
   */
  label?: React.ReactNode;
  /**
   * checkBox input value
   */
  value?: string;
  /**
   * data-test-selector for the checkbox component
   */
  dts?: string;
  /**
   * determines if the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * function called when checkBox onChange event is fired
   */
  onChange?: (...args: any[]) => any;
  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline?: boolean;
  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked?: CheckboxChecked;
  size?: number;
}

declare const Checkbox: React.FC<CheckboxProps>;

export default Checkbox;
