import React from 'react';
import classnames from 'classnames';
import { toast, ToastContainer as ReactToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { toastPlacements } from './constants';
import { expandDts } from '../../utils';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const ToastContainer = (props) => <ReactToastContainer className="aui--toast-container" {...props} />;

ToastContainer.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: PropTypes.oneOf(toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  // Display or not the progress bar below the toast(remaining time)
  hideProgressBar: PropTypes.bool,
  // Display newest toast on top
  newestOnTop: PropTypes.bool,
  // Dismiss toast on click
  closeOnClick: PropTypes.bool,
  // Support right to left content
  rtl: PropTypes.bool,
  // Allow toast to be draggable
  draggable: PropTypes.bool,
  // Keep the timer running or not on hover
  pauseOnHover: PropTypes.bool,
};

ToastContainer.defaultProps = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: true,
};

const getToastClass = (theme) => classnames('aui--toast-title', { [`aui--toast-title-${theme}`]: theme });

export const ToastMessage = ({ toastClass, title = '', message, dts }) => (
  <React.Fragment>
    <span className="aui--toast-body-message" {...expandDts(dts)}>
      <span className={toastClass}>{title}</span>
      <span>{message}</span>
    </span>
  </React.Fragment>
);

const withDefaultOptions = (options) => ({
  position: 'bottom-left',
  autoClose: 5000,
  className: 'aui--toast-notification-body',
  icon: false,
  ...options,
});

const notify = ({ theme = 'info', title, message, dts, ...options }) => {
  toast.info(
    <ToastMessage toastClass={getToastClass(theme)} title={title} message={message} dts={dts} />,
    withDefaultOptions({ theme, ...options })
  );
  return;
};

// this will force types onto the notify function, although it will be incorrectly defined as React.FC
notify.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'info', 'alert', 'attention']),
  message: PropTypes.node.isRequired,
  dts: PropTypes.string,
};

const dismiss = toast.dismiss;
dismiss.propTypes = {};

const Toast = {
  Container: ToastContainer,
  notify: notify,
  dismiss,
};

export default Toast;
