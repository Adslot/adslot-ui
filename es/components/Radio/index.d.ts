import * as React from 'react';

export type RadioValue = string | number;

export interface RadioProps {
  id?: string;
  className?: string;
  name?: string;
  label?: React.ReactNode;
  /**
   * additional text description to display below the label
   */
  text?: React.ReactNode;
  /**
   * icon to display beside the label when parent group's `variant="box"`
   */
  icon?: React.ReactNode;
  value?: RadioValue;
  dts?: string;
  disabled?: boolean;
  /**
   * @function onChange called when radio onChange event is fired
   * @param {string|number} value - the radio value
   */
  onChange?: (...args: any[]) => any;
  /**
   * checked status of the radio input
   */
  checked?: boolean;
  /**
   * @deprecated
   */
  inline?: boolean;
}

declare const Radio: React.FC<RadioProps>;

export default Radio;
