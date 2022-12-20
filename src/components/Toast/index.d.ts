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

declare const ToastContainer: React.FC<ToastContainerProps>;

export type ToastNotificationPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type ToastNotificationAutoClose = number | boolean;

export type ToastNotificationTheme = 'success' | 'info' | 'alert' | 'attention';

export interface ToastNotificationProps {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position?: ToastNotificationPosition;
  autoClose?: ToastNotificationAutoClose;
  title?: string;
  theme?: ToastNotificationTheme;
  message: React.ReactNode;
  dts?: string;
}

declare const ToastNotification: React.FC<ToastNotificationProps>;

export type notifyTheme = 'success' | 'info' | 'alert' | 'attention';

export interface notifyProps {
  title?: string;
  theme?: notifyTheme;
  message: React.ReactNode;
  dts?: string;
}

declare const notify: React.FC<notifyProps>;

export interface dismissProps {}

declare const dismiss: React.FC<dismissProps>;

declare const Toast: {
  Container: typeof ToastContainer;
  Notification: typeof ToastNotification;
  notify: typeof notify;
  dismiss: typeof dismiss;
};

export default Toast;
