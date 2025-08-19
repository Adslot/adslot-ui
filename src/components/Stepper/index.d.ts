import * as React from 'react';

export type StepId = string | number;
export type StepLabel = string | React.ReactNode;

export interface StepperStepProps {
  id: StepId;
  onClick?: (...args: any[]) => any;
  label?: StepLabel;
  disabled?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  children?: React.ReactNode;
  className?: string;
  stepIndex?: number;
}

declare const StepperStep: React.FC<StepperStepProps>;

export interface StepperProps {
  children: React.ReactNode;
  dts?: string;
}

declare const Stepper: React.FC<StepperProps> & {
  Step: typeof StepperStep;
};

export default Stepper;
