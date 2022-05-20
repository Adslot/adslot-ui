import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
var ActionPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      size = props.size,
      onClose = props.onClose,
      children = props.children,
      actionButton = props.actionButton,
      isModal = props.isModal,
      closeIcon = props.closeIcon,
      cancelText = props.cancelText;

  var addBodyClass = function addBodyClass(classname) {
    return document.body.classList.add(classname);
  };

  var removeBodyClass = function removeBodyClass(classname) {
    return document.body.classList.remove(classname);
  };

  useEffect(function () {
    if (isModal) addBodyClass('modal-open');
    return function () {
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal]);
  var actionPanel = /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: isModal ? 'aui--action-panel-backdrop' : 'hide'
  }), /*#__PURE__*/React.createElement("div", {
    className: classNames('aui--action-panel-wrapper', {
      'aui--action-panel-modal-wrapper': isModal
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames('aui--action-panel', "is-".concat(size), {
      'action-modal': isModal
    }, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames('aui--action-panel-header', {
      'has-actions': actionButton
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onClose,
    className: classNames('close-button', {
      'close-svg-icon': !actionButton
    }),
    dts: "header-close-button",
    icon: !actionButton ? closeIcon : undefined,
    "aria-label": !actionButton ? 'Close' : undefined
  }, actionButton && cancelText), actionButton)), /*#__PURE__*/React.createElement("div", {
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
  cancelText: PropTypes.string
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