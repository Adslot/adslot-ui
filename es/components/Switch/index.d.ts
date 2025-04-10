import * as React from 'react';

export interface SwitchProps {
  /**
   * switch value, if the value is un-controlled
   */
  defaultChecked?: boolean;
  /**
   * switch value, if the value is controlled
   */
  checked?: boolean;
  value?: string;
  disabled?: boolean;
  /**
   * This function is called when value is changed
   * <br/>
   * const onChange = (nextState) => ...
   */
  onChange?: (...args: any[]) => any;
  dts?: string;
  className?: string;
}

export default class Switch extends React.Component<SwitchProps, any> {
  render(): JSX.Element;
}
