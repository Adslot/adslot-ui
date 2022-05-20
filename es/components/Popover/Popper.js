import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { usePopper } from 'react-popper';
import { popoverPlacements, popoverStrategies } from './constants'; // default arrow position in pixel from the corresponding popover edge

var DEFAULT_ARROW_POSITION = 12;
/**
 *
 * @param {string} placement
 * @param {object} arrowStyles            user-defined arrow styles
 * @param {Element} container             anchor container
 */

export var renderArrowStyles = function renderArrowStyles(placement, arrowStyles) {
  var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var horizontalPosition = _.get(container, 'clientWidth') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  var verticalPosition = _.get(container, 'clientHeight') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  var calculatedArrowStyles = {};

  switch (true) {
    case _.includes(['bottom-start', 'top-start'], placement) && !_.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: horizontalPosition
      };
      break;

    case _.includes(['bottom-end', 'top-end'], placement) && !_.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: 'auto',
        right: horizontalPosition
      };
      break;

    case _.includes(['left-start', 'right-start'], placement) && !_.isNull(verticalPosition):
      calculatedArrowStyles = {
        top: verticalPosition
      };
      break;

    case _.includes(['left-end', 'right-end'], placement) && !_.isNull(verticalPosition):
      calculatedArrowStyles = {
        top: 'auto',
        bottom: verticalPosition
      };
      break;

    default:
      calculatedArrowStyles = {};
  }

  return _objectSpread(_objectSpread({}, calculatedArrowStyles), arrowStyles);
};

var Popper = function Popper(_ref) {
  var arrowStyles = _ref.arrowStyles,
      dts = _ref.dts,
      popperPlacement = _ref.placement,
      strategy = _ref.strategy,
      popoverClass = _ref.popoverClass,
      popoverContent = _ref.popoverContent,
      title = _ref.title,
      wrapperStyles = _ref.wrapperStyles,
      refElement = _ref.refElement,
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? [] : _ref$modifiers,
      popperRef = _ref.popperRef;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      popperElement = _React$useState2[0],
      setPopperElement = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      arrowElement = _React$useState4[0],
      setArrowElement = _React$useState4[1];

  React.useEffect(function () {
    if (popperElement && popperRef) popperRef(popperElement);
  }, [popperRef, popperElement]); // react-popper not using subsequent settings to overwrite preceding ones

  var defaultModifiers = [{
    name: 'arrow',
    options: {
      element: arrowElement
    }
  }];
  if (!_.find(modifiers, {
    name: 'offset'
  })) defaultModifiers.push({
    name: 'offset',
    options: {
      offset: [0, 6]
    }
  });
  if (!_.find(modifiers, {
    name: 'flip'
  })) defaultModifiers.push({
    name: 'flip',
    options: {
      altBoundary: true
    }
  });

  var _usePopper = usePopper(refElement, popperElement, _objectSpread({
    modifiers: defaultModifiers.concat(modifiers),
    placement: popperPlacement,
    strategy: strategy
  }, wrapperStyles)),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes,
      update = _usePopper.update;

  var calculatedArrowStyles = renderArrowStyles(popperPlacement, arrowStyles, popperElement);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    placement: popperPlacement // for test only
    ,
    className: popoverClass,
    ref: setPopperElement,
    style: _objectSpread(_objectSpread({}, styles.popper), wrapperStyles)
  }, attributes.popper, {
    "data-test-selector": dts
  }), /*#__PURE__*/React.createElement("div", {
    className: "aui--popover-container"
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "popover-title"
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: "popover-content"
  }, _.isFunction(popoverContent) ? popoverContent({
    update: update
  }) : popoverContent)), /*#__PURE__*/React.createElement("div", Object.assign({
    className: "aui--popover-arrow",
    "data-placement": _.get(attributes, 'popper.data-popper-placement', popperPlacement)
  }, attributes.arrow, {
    ref: setArrowElement,
    style: _objectSpread(_objectSpread({}, styles.arrow), calculatedArrowStyles)
  })));
};

Popper.propTypes = {
  arrowStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  dts: PropTypes.string,
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverClass: PropTypes.string,
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  refElement: PropTypes.instanceOf(Element),
  boundariesElement: PropTypes.instanceOf(Element),
  title: PropTypes.string,
  wrapperStyles: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  popperRef: PropTypes.func
};
export default Popper;