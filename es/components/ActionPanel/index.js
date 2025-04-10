import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { expandDts } from '../../utils';
import Button from '../Button';
const ActionPanel = /*#__PURE__*/React.forwardRef(({
  title,
  size = 'large',
  onClose,
  isModal = false,
  children,
  actionButton = null,
  cancelButton = null,
  visuallyHidden,
  className,
  dts
}, ref) => {
  const addBodyClass = classname => document.body.classList.add(classname);
  const removeBodyClass = classname => document.body.classList.remove(classname);
  React.useLayoutEffect(() => {
    if (isModal) addBodyClass('modal-open');
    return () => {
      if (visuallyHidden) return;
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal, visuallyHidden]);
  const defaultCancelButton = /*#__PURE__*/React.createElement(React.Fragment, null, actionButton ? /*#__PURE__*/React.createElement(Button, {
    onClick: onClose,
    className: "close-button",
    dts: "header-close-button"
  }, "Cancel") : /*#__PURE__*/React.createElement(Button, {
    onClick: onClose,
    className: classNames('close-button', 'close-svg-icon'),
    dts: "header-close-button",
    icon: /*#__PURE__*/React.createElement("div", {
      className: "close-icon"
    }),
    "aria-label": 'Close'
  }));
  const actionPanel = /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames(isModal ? 'aui--action-panel-backdrop' : 'hide', {
      'visually-hidden': visuallyHidden
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: classNames('aui--action-panel-wrapper', {
      'aui--action-panel-modal-wrapper': isModal,
      'visually-hidden': visuallyHidden
    })
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: classNames('aui--action-panel', `is-${size}`, {
      'action-modal': isModal
    }, className)
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: classNames('aui--action-panel-header', {
      'has-actions': actionButton
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "actions"
  }, cancelButton ? cancelButton : defaultCancelButton, actionButton)), /*#__PURE__*/React.createElement("div", {
    className: "aui--action-panel-body"
  }, children))));
  return isModal ? /*#__PURE__*/ReactDOM.createPortal(actionPanel, document.body) : actionPanel;
});
ActionPanel.propTypes = {
  title: PropTypes.node.isRequired,
  // large is intended to be used in a modal
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClose: PropTypes.func.isRequired,
  isModal: PropTypes.bool,
  children: PropTypes.node.isRequired,
  actionButton: PropTypes.node,
  cancelButton: PropTypes.node,
  /**
   * Hides the modal with css, but keeps it mounted.
   * This should only be used if you need to launch an ActionPanel
   * from within another ActionPanel.
   */
  visuallyHidden: PropTypes.bool,
  className: PropTypes.string,
  dts: PropTypes.string
};
export default ActionPanel;