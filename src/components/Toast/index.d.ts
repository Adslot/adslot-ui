import * as React from 'react';

export const ToastMessage: React.FC;

export type ToastContainerPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type ToastContainerAutoClose = number | boolean;

export interface ToastContainerProps {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position?: ToastContainerPosition;
  autoClose?: ToastContainerAutoClose;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
}

export type notifyTheme = 'success' | 'info' | 'alert' | 'attention';

export interface notifyProps {
  title?: string;
  theme?: notifyTheme;
  message: React.ReactNode;
  dts?: string;
}

type dismissProps = object;

declare const Toast: {
  Container: React.FC<ToastContainerProps>;
  notify: React.FC<notifyProps>;
  dismiss: React.FC<dismissProps>;
};

export default Toast;
