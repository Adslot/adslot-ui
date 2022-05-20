"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Popper = _interopRequireDefault(require("./Popper"));

var _constants = require("./constants");

var WithRefM = function WithRefM(_ref) {
  var theme = _ref.theme,
      title = _ref.title,
      dts = _ref.dts,
      popoverClassNames = _ref.popoverClassNames,
      popoverContent = _ref.popoverContent,
      refElement = _ref.refElement,
      modifiers = _ref.modifiers,
      wrapperStyles = _ref.wrapperStyles,
      placement = _ref.placement,
      strategy = _ref.strategy,
      isOpen = _ref.isOpen,
      arrowStyles = _ref.arrowStyles,
      getContainer = _ref.getContainer,
      popperRef = _ref.popperRef;
  var themeClass = _lodash.default.includes(_constants.themes, theme) ? "popover-".concat(theme) : 'popover-light';
  var popoverClass = (0, _classnames.default)('aui--popover-wrapper', themeClass, popoverClassNames);
  var boundariesElement = getContainer ? getContainer() : document.body;
  if (!isOpen) return null;
  return /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement(_Popper.default, {
    refElement: refElement,
    popoverClass: popoverClass,
    wrapperStyles: wrapperStyles,
    dts: dts,
    title: title,
    popoverContent: popoverContent,
    boundariesElement: boundariesElement,
    arrowStyles: arrowStyles,
    placement: placement,
    strategy: strategy,
    modifiers: modifiers,
    popperRef: popperRef
  }), boundariesElement);
};

var WithRef = /*#__PURE__*/_react.default.memo(WithRefM);

WithRef.propTypes = {
  refElement: _propTypes.default.instanceOf(HTMLElement),
  title: _propTypes.default.string,
  theme: _propTypes.default.oneOf(_constants.themes),
  popoverClassNames: _propTypes.default.string,
  getContainer: _propTypes.default.func,
  arrowStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  wrapperStyles: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  modifiers: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
  // eslint-disable-line react/forbid-prop-types
  placement: _propTypes.default.oneOf(_constants.popoverPlacements),
  strategy: _propTypes.default.oneOf(_constants.popoverStrategies),
  popoverContent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  isOpen: _propTypes.default.bool,
  popperRef: _propTypes.default.func,
  dts: _propTypes.default.string
};
WithRef.defaultProps = {
  theme: 'light',
  placement: 'auto'
};
var _default = WithRef;
exports.default = _default;