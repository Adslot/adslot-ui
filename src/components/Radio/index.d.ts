import * as React from 'react';

export interface RadioButtonProps {
  id?: string;
  className?: string;
  name?: string;
  label?: React.ReactNode;
  value?: string;
  dts?: string;
  disabled?: boolean;
  onChange?: (...args: any[]) => any;
  inline?: boolean;
  checked?: boolean;
}

declare const RadioButton: React.FC<RadioButtonProps>;

export default RadioButton;
