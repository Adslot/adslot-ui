import React from 'react';
import classnames from 'classnames';
import { toast, ToastContainer as ReactToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { toastPlacements } from './constants';

const ToastContainer = props => /*#__PURE__*/React.createElement(ReactToastContainer, Object.assign({
  className: "aui--toast-container"
}, props));

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
  pauseOnHover: PropTypes.bool
};
ToastContainer.defaultProps = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: true
};

const getToastClass = theme => classnames('aui--toast-title', {
  [`aui--toast-title-${theme}`]: theme
});

export const ToastMessage = _ref => {
  let {
    toastClass,
    title = '',
    message
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "aui--toast-body-message"
  }, /*#__PURE__*/React.createElement("span", {
    className: toastClass
  }, title), /*#__PURE__*/React.createElement("span", null, message)));
};

const withDefaultOptions = options => ({
  position: 'bottom-left',
  autoClose: 5000,
  className: 'aui--toast-notification-body',
  icon: false,
  ...options
});

const ToastNotification = _ref2 => {
  let {
    theme = 'info',
    title = '',
    message,
    ...options
  } = _ref2;
  const toastClass = getToastClass(theme);
  const toastMessage = /*#__PURE__*/React.createElement(ToastMessage, {
    toastClass: toastClass,
    title: title,
    message: message
  });
  toast.info(toastMessage, withDefaultOptions({
    theme,
    ...options
  }));
  return null;
};

const notify = _ref3 => {
  let {
    theme = 'info',
    title,
    message,
    ...options
  } = _ref3;
  toast.info( /*#__PURE__*/React.createElement(ToastMessage, {
    toastClass: getToastClass(theme),
    title: title,
    message: message
  }), withDefaultOptions({
    theme,
    ...options
  }));
  return;
}; // this will force types onto the notify function, although it will be incorrectly defined as React.FC


notify.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'info', 'alert', 'attention']),
  message: PropTypes.node.isRequired
};
ToastNotification.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: PropTypes.oneOf(toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  title: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'info', 'alert', 'attention']),
  message: PropTypes.node.isRequired
};
const dismiss = toast.dismiss;
dismiss.propTypes = {};
const Toast = {
  Container: ToastContainer,
  Notification: ToastNotification,
  notify: notify,
  dismiss
};
export default Toast;