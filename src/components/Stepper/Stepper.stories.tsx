import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Stepper from './index';

const meta = {
  title: 'Pending Review/Stepper',
  component: Stepper,
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

const steps = [
  { id: 1, label: 'Overview' },
  { id: 2, label: 'Targeting' },
  { id: 3, label: 'Measure' },
];

const DefaultStepper = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <Stepper>
      {steps.map((step, index) => (
        <Stepper.Step
          key={step.id}
          id={step.id}
          label={step.label}
          isActive={step.id === activeStep}
          stepIndex={index}
          onClick={() => setActiveStep(step.id)}
        />
      ))}
    </Stepper>
  );
};

export const Default: Story = {
  args: {
    children: (
      <>
        <Stepper.Step id={1} />
      </>
    ),
  },

  render: () => <DefaultStepper />,
};
