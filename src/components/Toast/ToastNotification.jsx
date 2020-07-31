import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { toastPlacements } from './constants';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const getToastClass = theme => classnames('aui--toast-title', { [`aui--toast-title-${theme}`]: theme });

export const ToastMessage = ({ toastClass, title, message }) => (
  <React.Fragment>
    <span className="aui--toast-body-message">
      <span className={toastClass}>{title}</span>
      <span>{message}</span>
    </span>
  </React.Fragment>
);

const options = props => _.omit({ className: 'aui--toast-notification-body', ...props }, ['title', 'theme', 'message']);

const ToastNotificationComponent = props => {
  const { theme, title, message } = props;

  const toastClass = getToastClass(theme);
  const toastMessage = <ToastMessage toastClass={toastClass} title={title} message={message} />;
  const toastOptions = options(props);

  toast.info(toastMessage, toastOptions);
  return null;
};

export const notify = ({ theme, title, message, ...props }) => {
  toast.info(
    <ToastMessage toastClass={getToastClass(theme)} title={title} message={message} {...props} />,
    options({ theme, title, message, ...props })
  );
  return;
};
ToastNotificationComponent.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: PropTypes.oneOf(toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  title: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'info', 'alert', 'attention']),
  message: PropTypes.node.isRequired,
};

ToastNotificationComponent.defaultProps = {
  position: 'bottom-left',
  autoClose: 5000,
  title: '',
  theme: 'info',
};

export default ToastNotificationComponent;
