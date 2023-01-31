"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Popover = _interopRequireDefault(require("../Popover"));
var _PopoverLinkItem = _interopRequireDefault(require("./PopoverLinkItem"));
const HoverDropdownMenu = _ref => {
  let {
    arrowPosition,
    headerText,
    hoverComponent,
    children
  } = _ref;
  const [popperNode, setPopperNode] = _react.default.useState(null);
  const [isOpen, setIsOpen] = _react.default.useState(false);
  const [mouseInPopover, setMouseInPopover] = _react.default.useState(false);
  const closeMenu = _lodash.default.debounce(() => {
    setIsOpen(false);
  }, 100);
  const popoverEnterHandler = _react.default.useCallback(() => setMouseInPopover(true), [setMouseInPopover]);
  const popoverLeaveHandler = _react.default.useCallback(() => {
    setMouseInPopover(false);
    closeMenu();
  }, [setMouseInPopover, closeMenu]);
  _react.default.useEffect(() => {
    if (popperNode) {
      popperNode.addEventListener('mouseenter', popoverEnterHandler);
      popperNode.addEventListener('mouseleave', popoverLeaveHandler);
    }
  }, [popperNode, popoverEnterHandler, popoverLeaveHandler]);
  const openMenu = () => {
    setIsOpen(true);
    setMouseInPopover(false);
  };
  const element = /*#__PURE__*/_react.default.createElement("div", {
    onMouseEnter: openMenu,
    onMouseLeave: closeMenu
  }, hoverComponent);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "hover-dropdown"
  }, children && children.length > 0 ? /*#__PURE__*/_react.default.createElement(_Popover.default, {
    placement: `bottom-${arrowPosition === 'left' ? 'start' : 'end'}`,
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