import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import './styles.scss';

const ActionPanel = ({ title, className, size, onClose, children, actionButton, isModal, closeIcon }) => (
  <div className={classNames('aui--action-panel-wrapper', { 'aui--action-panel-wrapper-backdrop': isModal })}>
    <div className={classNames('aui--action-panel', className, `is-${size}`, { 'action-modal': isModal })}>
      <div className={classNames('aui--action-panel-header', { 'has-actions': actionButton })}>
        <span className="title">{title}</span>
        <span className="actions">
          <Button
            onClick={onClose}
            className={classNames('close-button', { 'close-svg-icon': !actionButton })}
            dts="header-close-button"
          >
            {actionButton ? 'Cancel' : closeIcon}
          </Button>
          {actionButton}
        </span>
      </div>
      <div className="aui--action-panel-body">{children}</div>
    </div>
  </div>
);

ActionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  // large is intended to be used in a modal
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  actionButton: PropTypes.node,
  closeIcon: PropTypes.node,
  isModal: PropTypes.bool,
};

ActionPanel.defaultProps = {
  size: 'large',
  actionButton: null,
  isModal: false,
  closeIcon: <div className="close-icon" />,
};

export default ActionPanel;
