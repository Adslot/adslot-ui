import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { themes, popoverPlacements, popoverStrategies } from './constants';
import WithRef from './WithRef';
var triggerPropTypes = PropTypes.oneOf(['click', 'hover', 'focus', 'disabled']);

var Popover = function Popover(props) {
  var isOpen = props.isOpen;

  var _useState = useState(isOpen),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  React.useEffect(function () {
    setIsPopoverOpen(isOpen);
  }, [setIsPopoverOpen, isOpen]);
  var closePopover = React.useCallback(function () {
    return setIsPopoverOpen(false);
  }, [setIsPopoverOpen]);
  var openPopover = React.useCallback(function () {
    return setIsPopoverOpen(true);
  }, [setIsPopoverOpen]);
  var togglePopover = React.useCallback(function () {
    return setIsPopoverOpen(!isPopoverOpen);
  }, [setIsPopoverOpen, isPopoverOpen]);

  var onClick = function onClick() {
    return togglePopover();
  };

  var onFocus = function onFocus() {
    return openPopover();
  };

  var onBlur = function onBlur() {
    return closePopover();
  };

  var onMouseOver = function onMouseOver() {
    return openPopover();
  };

  var onMouseOut = function onMouseOut() {
    return closePopover();
  };

  var title = props.title,
      children = props.children,
      className = props.className,
      dts = props.dts,
      popoverContent = props.popoverContent,
      popperRef = props.popperRef;
  var elementClass = classnames('aui--popover-element', className);

  var triggers = _.flattenDeep([props.triggers]);

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      elementRef = _useState4[0],
      setReferenceElement = _useState4[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", Object.assign({
    className: elementClass,
    ref: setReferenceElement
  }, triggers.includes('disabled') ? {} : _objectSpread(_objectSpread(_objectSpread({}, triggers.includes('click') ? {
    onClick: onClick
  } : {}), triggers.includes('hover') ? {
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut
  } : {}), triggers.includes('focus') ? {
    onFocus: onFocus,
    onBlur: onBlur
  } : {})), children), /*#__PURE__*/React.createElement(WithRef, {
    popoverClassNames: props.popoverClassNames,
    wrapperStyles: props.wrapperStyles,
    dts: dts,
    title: title,
    theme: props.theme,
    popoverContent: popoverContent,
    refElement: elementRef,
    getContainer: props.getContainer,
    arrowStyles: props.arrowStyles,
    placement: props.placement,
    strategy: props.strategy,
    modifiers: props.modifiers,
    isOpen: isPopoverOpen,
    popperRef: popperRef
  }));
};

Popover.propTypes = {
  theme: PropTypes.oneOf(themes),
  title: PropTypes.node,
  className: PropTypes.string,
  popoverClassNames: PropTypes.string,

  /**
   *  arrow css styles, mainly for positioning the arrow
   */
  arrowStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  wrapperStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  children: PropTypes.node.isRequired,
  triggers: PropTypes.oneOfType([triggerPropTypes, PropTypes.arrayOf(triggerPropTypes)]),
  isOpen: PropTypes.bool,
  getContainer: PropTypes.func,
  popperRef: PropTypes.func,
  dts: PropTypes.string
};
Popover.defaultProps = {
  theme: 'light',
  placement: 'auto',
  strategy: 'absolute',
  triggers: 'hover',
  isOpen: false
};
Popover.WithRef = WithRef;
export default Popover;