"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _constants = require("./constants");

var _WithRef = _interopRequireDefault(require("./WithRef"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var triggerPropTypes = _propTypes.default.oneOf(['click', 'hover', 'focus', 'disabled']);

var Popover = function Popover(props) {
  var isOpen = props.isOpen;

  var _useState = (0, _react.useState)(isOpen),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  _react.default.useEffect(function () {
    setIsPopoverOpen(isOpen);
  }, [setIsPopoverOpen, isOpen]);

  var closePopover = _react.default.useCallback(function () {
    return setIsPopoverOpen(false);
  }, [setIsPopoverOpen]);

  var openPopover = _react.default.useCallback(function () {
    return setIsPopoverOpen(true);
  }, [setIsPopoverOpen]);

  var togglePopover = _react.default.useCallback(function () {
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
  var elementClass = (0, _classnames.default)('aui--popover-element', className);

  var triggers = _lodash.default.flattenDeep([props.triggers]);

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      elementRef = _useState4[0],
      setReferenceElement = _useState4[1];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", Object.assign({
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
  } : {})), children), /*#__PURE__*/_react.default.createElement(_WithRef.default, {
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
  theme: _propTypes.default.oneOf(_constants.themes),
  title: _propTypes.default.node,
  className: _propTypes.default.string,
  popoverClassNames: _propTypes.default.string,

  /**
   *  arrow css styles, mainly for positioning the arrow
   */
  arrowStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  wrapperStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  modifiers: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: _propTypes.default.oneOf(_constants.popoverPlacements),
  strategy: _propTypes.default.oneOf(_constants.popoverStrategies),
  popoverContent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  children: _propTypes.default.node.isRequired,
  triggers: _propTypes.default.oneOfType([triggerPropTypes, _propTypes.default.arrayOf(triggerPropTypes)]),
  isOpen: _propTypes.default.bool,
  getContainer: _propTypes.default.func,
  popperRef: _propTypes.default.func,
  dts: _propTypes.default.string
};
Popover.defaultProps = {
  theme: 'light',
  placement: 'auto',
  strategy: 'absolute',
  triggers: 'hover',
  isOpen: false
};
Popover.WithRef = _WithRef.default;
var _default = Popover;
exports.default = _default;