import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import DismissibleFocusTrap from '../DismissibleFocusTrap';
import { expandDts } from '../../utils';
import Button from '../Button';
import './styles.css';

const ActionPanel = React.forwardRef((props, ref) => {
  const {
    title,
    className,
    size,
    onClose,
    onEscapeClose,
    children,
    visuallyHidden,
    actionButton,
    isModal,
    cancelButton,
    disableFocusTrap,
    dts,
  } = props;

  const addBodyClass = (classname) => document.body.classList.add(classname);
  const removeBodyClass = (classname) => document.body.classList.remove(classname);

  React.useLayoutEffect(() => {
    if (isModal) addBodyClass('modal-open');

    return () => {
      if (visuallyHidden) return;
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal, visuallyHidden]);

  const onEscapeHandler = (event) => {
    onEscapeClose?.(event);
    if (event.defaultPrevented) return;
    onClose();
  };

  const defaultCancelButton = (
    <>
      {actionButton ? (
        <Button onClick={onClose} className="close-button" dts="header-close-button">
          Cancel
        </Button>
      ) : (
        <Button
          onClick={onClose}
          className={classNames('close-button', 'close-svg-icon')}
          dts="header-close-button"
          icon={<div className="close-icon" />}
          aria-label={'Close'}
        />
      )}
    </>
  );

  const actionPanel = (
    <div ref={ref}>
      <div
        className={classNames(isModal ? 'aui--action-panel-backdrop' : 'hide', { 'visually-hidden': visuallyHidden })}
      />
      <div
        data-testid="action-panel-modal-wrapper"
        className={classNames('aui--action-panel-wrapper', {
          'aui--action-panel-modal-wrapper': isModal,
          'visually-hidden': visuallyHidden,
        })}
      >
        <div
          aria-modal={isModal ? 'true' : undefined}
          aria-label={title}
          role={isModal ? 'dialog' : undefined}
          data-testid="action-panel-wrapper"
          className={classNames('aui--action-panel', `is-${size}`, { 'action-modal': isModal }, className)}
          {...expandDts(dts)}
        >
          <DismissibleFocusTrap
            disabled={disableFocusTrap ?? !isModal}
            onEscape={isModal && !visuallyHidden ? onEscapeHandler : undefined}
          >
            <div
              data-testid="action-panel-header"
              className={classNames('aui--action-panel-header', { 'has-actions': actionButton })}
            >
              <div data-testid="action-panel-title" className="title">
                {title}
              </div>

              <span className="actions">
                {cancelButton ? cancelButton : defaultCancelButton}
                {actionButton}
              </span>
            </div>
            <div data-testid="action-panel-body" className="aui--action-panel-body">
              {children}
            </div>
          </DismissibleFocusTrap>
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
  /**
   * @param event
   * called before `onClose` is called, when pressing escape.
   *
   * can be prevented with `event.preventDefault()`
   */
  onEscapeClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  actionButton: PropTypes.node,
  cancelButton: PropTypes.node,
  isModal: PropTypes.bool,
  disableFocusTrap: PropTypes.bool,
  /**
   * Hides the modal with css, but keeps it mounted.
   * This should only be used if you need to launch an ActionPanel
   * from within another ActionPanel.
   */
  visuallyHidden: PropTypes.bool,
  dts: PropTypes.string,
};

ActionPanel.defaultProps = {
  size: 'large',
  actionButton: null,
  isModal: false,
  cancelButton: null,
};

export default ActionPanel;
