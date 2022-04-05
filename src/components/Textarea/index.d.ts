import * as React from 'react';

export interface TextareaProps {
  maxLength?: number;
  statusClass?: string;
  onChange?: (...args: any[]) => any;
  value?: string;
}

export default class Textarea extends React.Component<TextareaProps, any> {
  render(): JSX.Element;
}
