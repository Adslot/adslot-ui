import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { expandDts } from '../../lib/utils';
import Button from '../Button';
import './styles.css';

const ActionPanel = React.forwardRef((props, ref) => {
  const { title, className, size, onClose, children, actionButton, isModal, closeIcon, cancelText, dts } = props;

  const addBodyClass = (classname) => document.body.classList.add(classname);
  const removeBodyClass = (classname) => document.body.classList.remove(classname);

  useEffect(() => {
    if (isModal) addBodyClass('modal-open');

    return () => {
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal]);

  const actionPanel = (
    <div ref={ref}>
      <div className={isModal ? 'aui--action-panel-backdrop' : 'hide'} />
      <div
        data-testid="action-panel-modal-wrapper"
        className={classNames('aui--action-panel-wrapper', { 'aui--action-panel-modal-wrapper': isModal })}
      >
        <div
          data-testid="action-panel-wrapper"
          className={classNames('aui--action-panel', `is-${size}`, { 'action-modal': isModal }, className)}
          {...expandDts(dts)}
        >
          <div
            data-testid="action-panel-header"
            className={classNames('aui--action-panel-header', { 'has-actions': actionButton })}
          >
            <div data-testid="action-panel-title" className="title">
              {title}
            </div>
            <span className="actions">
              {actionButton ? (
                <Button onClick={onClose} className="close-button" dts="header-close-button">
                  {cancelText}
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className={classNames('close-button', 'close-svg-icon')}
                  dts="header-close-button"
                  icon={closeIcon}
                  aria-label={'Close'}
                />
              )}
              {actionButton}
            </span>
          </div>
          <div data-testid="action-panel-body" className="aui--action-panel-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return isModal ? ReactDOM.createPortal(actionPanel, document.body) : actionPanel;
});

ActionPanel.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  // large is intended to be used in a modal
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  actionButton: PropTypes.node,
  closeIcon: PropTypes.node,
  isModal: PropTypes.bool,
  cancelText: PropTypes.string,
  dts: PropTypes.string,
};

ActionPanel.defaultProps = {
  size: 'large',
  actionButton: null,
  isModal: false,
  closeIcon: <div className="close-icon" />,
  cancelText: 'Cancel',
};

export default ActionPanel;
