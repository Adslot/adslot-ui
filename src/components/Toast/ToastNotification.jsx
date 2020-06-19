import _ from 'lodash';
import React from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { toastPlacements } from './constants';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const ToastNotificationComponent = props => {
  const { theme, title, message } = props;
  const toastClass = `aui--toast-title aui--toast-title-${theme}`;
  const toastMessage = (
    <React.Fragment>
      <span className="aui--toast-body-message">
        <span className={toastClass}>{title}</span>
        <span>{message}</span>
      </span>
    </React.Fragment>
  );

  const options = _.omit({ className: 'aui--toast-notification-body', ...props }, ['title', 'theme', 'message']);

  toast(toastMessage, options);
  return null;
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
