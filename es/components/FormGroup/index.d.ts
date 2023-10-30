import * as React from 'react';

export interface FormGroupProps {
  addon?: string;
  disabled?: boolean;
  helpText: string;
  label: string;
  onChange?: (...args: any[]) => any;
  placeholder: string;
  value?: string;
}

declare const FormGroup: React.FC<FormGroupProps>;

export default FormGroup;
