import * as React from 'react';

export type AlertInputAlertStatus = 'success' | 'info' | 'warning' | 'error';

export type AlertInputPopoverPlacement =
  | 'auto'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'auto-start'
  | 'top-start'
  | 'right-start'
  | 'bottom-start'
  | 'left-start'
  | 'auto-end'
  | 'top-end'
  | 'right-end'
  | 'bottom-end'
  | 'left-end';

export interface AlertInputProps {
  className?: string;
  dts?: string;
  disabled?: boolean;
  prefixAddon?: React.ReactNode;
  suffixAddon?: React.ReactNode;
  /**
   * <span>
   * As <code>success</code> is assumed, and help is always displayed independently, the accepted pattern is to
   * only use <code>warning</code> and <code>error</code> feedback states with this component. Otherwise leave
   * type undefined for <code>success</code>.
   * </span>
   */
  alertStatus?: AlertInputAlertStatus;
  /**
   * 'left', 'top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'right'
   */
  popoverPlacement?: AlertInputPopoverPlacement;
  alertMessage?: string;
  onValueChange?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
}

export default class AlertInput extends React.Component<AlertInputProps, any> {
  render(): JSX.Element;
}
