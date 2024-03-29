import * as React from 'react';

export type CheckboxVariant = 'default' | 'box';

export type CheckboxChecked = boolean | 'partial';

export type CheckboxValue = string | number;

export interface CheckboxProps {
  /**
   * name for the checkbox input
   */
  name?: string;
  variant?: CheckboxVariant;
  /**
   * @function onChange called when checkBox onChange event is fired
   * @param {string|boolean} nextState - the checked state
   * @param {string} name - the checkbox name
   * @param {string|number} value - the checkbox value
   */
  onChange?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked?: CheckboxChecked;
  /**
   * @deprecated
   */
  size?: number;
  /**
   * @deprecated
   */
  inline?: boolean;
  /**
   * checkBox input value
   */
  value?: CheckboxValue;
  /**
   * id for the checkbox input
   */
  id?: string;
  className?: string;
  /**
   * checkBox label for the checkbox input
   */
  label?: React.ReactNode;
  /**
   * additional text description to display below the label
   */
  text?: React.ReactNode;
  /**
   * icon to display beside the label when  parent group's `variant="box"`
   */
  icon?: React.ReactNode;
  /**
   * data-test-selector for the checkbox component
   */
  dts?: string;
  /**
   * determines if the checkbox is disabled
   */
  disabled?: boolean;
}

declare const Checkbox: React.FC<CheckboxProps>;

export default Checkbox;
