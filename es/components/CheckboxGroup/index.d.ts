import * as React from 'react';

export type CheckboxGroupValue = string | number;

export type CheckboxGroupChildren = React.ReactNode[] | React.ReactNode;

export interface CheckboxGroupProps {
  /**
   * id for the checkboxGroup input
   */
  id?: string;
  className?: string;
  name: string;
  /**
   * string array of checked values
   */
  value: CheckboxGroupValue[];
  /**
   * checkBoxGroup children: oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]
   */
  children: CheckboxGroupChildren;
  /**
   * function called when checkBox onChange event is fired
   */
  onChange: (...args: any[]) => any;
  /**
   * data-test-selector for the checkboxGroup component
   */
  dts?: string;
  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline?: boolean;
}

declare const CheckboxGroup: React.FC<CheckboxGroupProps>;

export default CheckboxGroup;
