"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderArrowStyles = exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactPopper = require("react-popper");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// default arrow position in pixel from the corresponding popover edge
var DEFAULT_ARROW_POSITION = 12;
/**
 *
 * @param {string} placement
 * @param {object} arrowStyles            user-defined arrow styles
 * @param {Element} container             anchor container
 */

var renderArrowStyles = function renderArrowStyles(placement, arrowStyles) {
  var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var horizontalPosition = _lodash.default.get(container, 'clientWidth') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  var verticalPosition = _lodash.default.get(container, 'clientHeight') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  var calculatedArrowStyles = {};

  switch (true) {
    case _lodash.default.includes(['bottom-start', 'top-start'], placement) && !_lodash.default.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: horizontalPosition
      };
      break;

    case _lodash.default.includes(['bottom-end', 'top-end'], placement) && !_lodash.default.isNull(horizontalPosition):
      calculatedArrowStyles = {
        left: 'auto',
        right: horizontalPosition
      };
      break;

    case _lodash.default.includes(['left-start', 'right-start'], placement) && !_lodash.default.isNull(verticalPosition):
      calculatedArrowStyles = {
        top: verticalPosition
      };
      break;

    case _lodash.default.includes(['left-end', 'right-end'], placement) && !_lodash.default.isNull(verticalPosition):
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

exports.renderArrowStyles = renderArrowStyles;

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

  var _React$useState = _react.default.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      popperElement = _React$useState2[0],
      setPopperElement = _React$useState2[1];

  var _React$useState3 = _react.default.useState(null),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      arrowElement = _React$useState4[0],
      setArrowElement = _React$useState4[1];

  _react.default.useEffect(function () {
    if (popperElement && popperRef) popperRef(popperElement);
  }, [popperRef, popperElement]); // react-popper not using subsequent settings to overwrite preceding ones


  var defaultModifiers = [{
    name: 'arrow',
    options: {
      element: arrowElement
    }
  }];
  if (!_lodash.default.find(modifiers, {
    name: 'offset'
  })) defaultModifiers.push({
    name: 'offset',
    options: {
      offset: [0, 6]
    }
  });
  if (!_lodash.default.find(modifiers, {
    name: 'flip'
  })) defaultModifiers.push({
    name: 'flip',
    options: {
      altBoundary: true
    }
  });

  var _usePopper = (0, _reactPopper.usePopper)(refElement, popperElement, _objectSpread({
    modifiers: defaultModifiers.concat(modifiers),
    placement: popperPlacement,
    strategy: strategy
  }, wrapperStyles)),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes,
      update = _usePopper.update;

  var calculatedArrowStyles = renderArrowStyles(popperPlacement, arrowStyles, popperElement);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    placement: popperPlacement // for test only
    ,
    className: popoverClass,
    ref: setPopperElement,
    style: _objectSpread(_objectSpread({}, styles.popper), wrapperStyles)
  }, attributes.popper, {
    "data-test-selector": dts
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--popover-container"
  }, title ? /*#__PURE__*/_react.default.createElement("div", {
    className: "popover-title"
  }, title) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "popover-content"
  }, _lodash.default.isFunction(popoverContent) ? popoverContent({
    update: update
  }) : popoverContent)), /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: "aui--popover-arrow",
    "data-placement": _lodash.default.get(attributes, 'popper.data-popper-placement', popperPlacement)
  }, attributes.arrow, {
    ref: setArrowElement,
    style: _objectSpread(_objectSpread({}, styles.arrow), calculatedArrowStyles)
  })));
};

Popper.propTypes = {
  arrowStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  dts: _propTypes.default.string,
  modifiers: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: _propTypes.default.oneOf(_constants.popoverPlacements),
  strategy: _propTypes.default.oneOf(_constants.popoverStrategies),
  popoverClass: _propTypes.default.string,
  popoverContent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  refElement: _propTypes.default.instanceOf(Element),
  boundariesElement: _propTypes.default.instanceOf(Element),
  title: _propTypes.default.string,
  wrapperStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  popperRef: _propTypes.default.func
};
var _default = Popper;
exports.default = _default;