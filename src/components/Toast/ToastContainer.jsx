import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { toastPlacements } from './constants';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const ToastContainerComponent = props => <ToastContainer className="aui--toast-container" {...props} />;

ToastContainerComponent.propTypes = {
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

ToastContainerComponent.defaultProps = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: true,
};

export default React.memo(ToastContainerComponent);
