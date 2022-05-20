import * as React from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface AlertProps {
  /**
   * ['success', 'info', 'warning', 'danger']
   */
  type?: AlertType;
  children: React.ReactNode;
  dts?: string;
}

declare const Alert: React.FC<AlertProps>;

export default Alert;
