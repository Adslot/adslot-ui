"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _constants = require("./constants");
var _WithRef = _interopRequireDefault(require("./WithRef"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react/jsx-indent */

const triggerPropTypes = _propTypes.default.oneOf(['click', 'hover', 'focus', 'disabled']);
const Popover = props => {
  const {
    isOpen
  } = props;
  const [isPopoverOpen, setIsPopoverOpen] = (0, _react.useState)(isOpen);
  _react.default.useEffect(() => {
    setIsPopoverOpen(isOpen);
  }, [setIsPopoverOpen, isOpen]);
  const closePopover = _react.default.useCallback(() => setIsPopoverOpen(false), [setIsPopoverOpen]);
  const openPopover = _react.default.useCallback(() => setIsPopoverOpen(true), [setIsPopoverOpen]);
  const togglePopover = _react.default.useCallback(() => setIsPopoverOpen(!isPopoverOpen), [setIsPopoverOpen, isPopoverOpen]);
  const onClick = () => togglePopover();
  const onFocus = () => openPopover();
  const onBlur = () => closePopover();
  const onMouseOver = () => openPopover();
  const onMouseOut = () => closePopover();
  const {
    title,
    children,
    className,
    dts,
    popoverContent,
    popperRef
  } = props;
  const elementClass = (0, _classnames.default)('aui--popover-element', className);
  const triggers = _lodash.default.flattenDeep([props.triggers]);
  const [elementRef, setReferenceElement] = (0, _react.useState)(null);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", Object.assign({
    className: elementClass,
    ref: setReferenceElement
  }, triggers.includes('disabled') ? {} : {
    ...(triggers.includes('click') ? {
      onClick
    } : {}),
    ...(triggers.includes('hover') ? {
      onMouseOver,
      onMouseOut
    } : {}),
    ...(triggers.includes('focus') ? {
      onFocus,
      onBlur
    } : {})
  }), children), /*#__PURE__*/_react.default.createElement(_WithRef.default, {
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