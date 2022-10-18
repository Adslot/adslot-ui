import * as React from 'react';

export type CheckboxGroupItemValue = string | number;

export interface CheckboxGroupItemProps {
  /**
   * checkBox input value
   */
  value?: CheckboxGroupItemValue;
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

declare const CheckboxGroupItem: React.FC<CheckboxGroupItemProps>;

export interface CheckboxGroupAllProps {
  label?: React.ReactNode;
  className?: string;
}

declare const CheckboxGroupAll: React.FC<CheckboxGroupAllProps>;

export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

export type CheckboxGroupVariant = 'default' | 'box';

export interface CheckboxGroupProps {
  value?: any[];
  name?: string;
  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange?: (...args: any[]) => any;
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
  indent?: boolean;
  /**
   * @deprecated use orientation="horizontal" instead
   */
  inline?: boolean;
}

declare const CheckboxGroup: React.FC<CheckboxGroupProps> & {
  Item: typeof CheckboxGroupItem;
  All: typeof CheckboxGroupAll;
};

export default CheckboxGroup;
