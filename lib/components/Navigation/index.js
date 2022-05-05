"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavItem = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var Nav = function Nav(_ref) {
  var stacked = _ref.stacked,
      className = _ref.className,
      onSelect = _ref.onSelect,
      activeKey = _ref.activeKey,
      barPosition = _ref.barPosition,
      children = _ref.children,
      dts = _ref.dts;
  var navItems = [];

  _react.default.Children.forEach(children, function (child) {
    navItems.push( /*#__PURE__*/_react.default.cloneElement(child, {
      onSelect: onSelect,
      activeKey: activeKey
    }));
  });

  return /*#__PURE__*/_react.default.createElement("nav", (0, _utils.expandDts)(dts), /*#__PURE__*/_react.default.createElement("ul", {
    className: (0, _classnames.default)('aui--nav', 'nav-borderless', "".concat(barPosition, "-bar"), {
      stacked: stacked
    }, className)
  }, navItems));
};

var NavItem = function NavItem(_ref2) {
  var className = _ref2.className,
      disabled = _ref2.disabled,
      activeKey = _ref2.activeKey,
      eventKey = _ref2.eventKey,
      href = _ref2.href,
      onSelect = _ref2.onSelect,
      children = _ref2.children;

  var onItemClick = function onItemClick() {
    onSelect(eventKey);
  };

  return /*#__PURE__*/_react.default.createElement("li", {
    role: "presentation",
    className: (0, _classnames.default)('aui--nav-item', {
      active: activeKey === eventKey,
      disabled: disabled
    }, className),
    onClick: disabled ? _lodash.default.noop : onItemClick
  }, href ? /*#__PURE__*/_react.default.createElement("a", {
    role: "button",
    href: href
  }, children) : children);
};

exports.NavItem = NavItem;
Nav.propTypes = {
  /**
   * NavItems are be positioned horizontally or vertically.
   */
  stacked: _propTypes.default.bool,
  className: _propTypes.default.string,

  /**
   * A callback fired when any children is selected.
   * e.g. onSelect = {(eventKey) => console.log(eventKey)}
   * where the eventKey is the unique key of each child.
   */
  onSelect: _propTypes.default.func,

  /**
   * A key for the current active item
   */
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  children: _propTypes.default.node,

  /**
   * define the position (styling) of the active item bar
   */
  barPosition: _propTypes.default.oneOf(['top', 'bottom', 'none']),

  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: _propTypes.default.string
};
NavItem.propTypes = {
  /**
   * Disable one menu item.
   */
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  children: _propTypes.default.node,

  /**
   * A key for each item, and can be used in onSelect
   */
  eventKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Define the href of the <a />
   */
  href: _propTypes.default.string
};
Nav.defaultProps = {
  stacked: false,
  barPosition: 'bottom'
};
Nav.displayName = 'Navigation';
var _default = Nav;
exports.default = _default;