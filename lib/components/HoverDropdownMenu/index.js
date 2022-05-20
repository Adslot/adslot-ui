"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Popover = _interopRequireDefault(require("../Popover"));

var _PopoverLinkItem = _interopRequireDefault(require("./PopoverLinkItem"));

var HoverDropdownMenu = function HoverDropdownMenu(_ref) {
  var arrowPosition = _ref.arrowPosition,
      headerText = _ref.headerText,
      hoverComponent = _ref.hoverComponent,
      children = _ref.children;

  var _React$useState = _react.default.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      popperNode = _React$useState2[0],
      setPopperNode = _React$useState2[1];

  var _React$useState3 = _react.default.useState(false),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      isOpen = _React$useState4[0],
      setIsOpen = _React$useState4[1];

  var _React$useState5 = _react.default.useState(false),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      mouseInPopover = _React$useState6[0],
      setMouseInPopover = _React$useState6[1];

  var closeMenu = _lodash.default.debounce(function () {
    setIsOpen(false);
  }, 100);

  var popoverEnterHandler = _react.default.useCallback(function () {
    return setMouseInPopover(true);
  }, [setMouseInPopover]);

  var popoverLeaveHandler = _react.default.useCallback(function () {
    setMouseInPopover(false);
    closeMenu();
  }, [setMouseInPopover, closeMenu]);

  _react.default.useEffect(function () {
    if (popperNode) {
      popperNode.addEventListener('mouseenter', popoverEnterHandler);
      popperNode.addEventListener('mouseleave', popoverLeaveHandler);
    }
  }, [popperNode, popoverEnterHandler, popoverLeaveHandler]);

  var openMenu = function openMenu() {
    setIsOpen(true);
    setMouseInPopover(false);
  };

  var element = /*#__PURE__*/_react.default.createElement("div", {
    onMouseEnter: openMenu,
    onMouseLeave: closeMenu
  }, hoverComponent);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "hover-dropdown"
  }, children && children.length > 0 ? /*#__PURE__*/_react.default.createElement(_Popover.default, {
    placement: "bottom-".concat(arrowPosition === 'left' ? 'start' : 'end'),
    triggers: ['disabled'],
    isOpen: isOpen || mouseInPopover,
    title: headerText,
    popoverContent: /*#__PURE__*/_react.default.createElement("ul", {
      className: "list-unstyled"
    }, children),
    popperRef: setPopperNode
  }, element) : null);
};

HoverDropdownMenu.propTypes = {
  /**
   * Determine the placement of the popover
   */
  arrowPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * If set to empty string, header will not be rendered.
   */
  headerText: _propTypes.default.string,
  hoverComponent: _propTypes.default.element.isRequired,
  children: _propTypes.default.node
};
HoverDropdownMenu.defaultProps = {
  arrowPosition: 'left',
  headerText: ''
};
HoverDropdownMenu.Item = _PopoverLinkItem.default;
var _default = HoverDropdownMenu;
exports.default = _default;