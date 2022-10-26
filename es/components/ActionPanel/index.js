import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { expandDts } from '../../lib/utils';
import Button from '../Button';
const ActionPanel = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    title,
    className,
    size,
    onClose,
    children,
    visuallyHidden,
    actionButton,
    isModal,
    closeIcon,
    cancelText,
    dts
  } = props;

  const addBodyClass = classname => document.body.classList.add(classname);

  const removeBodyClass = classname => document.body.classList.remove(classname);

  React.useLayoutEffect(() => {
    if (isModal) addBodyClass('modal-open');
    return () => {
      if (visuallyHidden) return;
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal, visuallyHidden]);
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
  }, actionButton ? /*#__PURE__*/React.createElement(Button, {
    onClick: onClose,
    className: "close-button",
    dts: "header-close-button"
  }, cancelText) : /*#__PURE__*/React.createElement(Button, {
    onClick: onClose,
    className: classNames('close-button', 'close-svg-icon'),
    dts: "header-close-button",
    icon: closeIcon,
    "aria-label": 'Close'
  }), actionButton)), /*#__PURE__*/React.createElement("div", {
    className: "aui--action-panel-body"
  }, children))));
  return isModal ? /*#__PURE__*/ReactDOM.createPortal(actionPanel, document.body) : actionPanel;
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

  /**
   * Hides the modal with css, but keeps it mounted.
   * This should only be used if you need to launch an ActionPanel
   * from within another ActionPanel.
   */
  visuallyHidden: PropTypes.bool,
  dts: PropTypes.string
};
ActionPanel.defaultProps = {
  size: 'large',
  actionButton: null,
  isModal: false,
  closeIcon: /*#__PURE__*/React.createElement("div", {
    className: "close-icon"
  }),
  cancelText: 'Cancel'
};
export default ActionPanel;