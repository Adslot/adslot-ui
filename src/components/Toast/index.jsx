import ToastContainerComponent from './ToastContainer';
import ToastNotificationComponent from './ToastNotification';
import { notify } from './ToastNotification';

const Toast = {};
Toast.Container = ToastContainerComponent;
Toast.Notification = ToastNotificationComponent;
Toast.notify = notify;

export default Toast;
