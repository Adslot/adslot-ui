import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var Nav = function Nav(_ref) {
  var stacked = _ref.stacked,
      className = _ref.className,
      onSelect = _ref.onSelect,
      activeKey = _ref.activeKey,
      barPosition = _ref.barPosition,
      children = _ref.children,
      dts = _ref.dts;
  var navItems = [];
  React.Children.forEach(children, function (child) {
    navItems.push( /*#__PURE__*/React.cloneElement(child, {
      onSelect: onSelect,
      activeKey: activeKey
    }));
  });
  return /*#__PURE__*/React.createElement("nav", expandDts(dts), /*#__PURE__*/React.createElement("ul", {
    className: classnames('aui--nav', 'nav-borderless', "".concat(barPosition, "-bar"), {
      stacked: stacked
    }, className)
  }, navItems));
};

export var NavItem = function NavItem(_ref2) {
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

  return /*#__PURE__*/React.createElement("li", {
    role: "presentation",
    className: classnames('aui--nav-item', {
      active: activeKey === eventKey,
      disabled: disabled
    }, className),
    onClick: disabled ? _.noop : onItemClick
  }, href ? /*#__PURE__*/React.createElement("a", {
    role: "button",
    href: href
  }, children) : children);
};
Nav.propTypes = {
  /**
   * NavItems are be positioned horizontally or vertically.
   */
  stacked: PropTypes.bool,
  className: PropTypes.string,

  /**
   * A callback fired when any children is selected.
   * e.g. onSelect = {(eventKey) => console.log(eventKey)}
   * where the eventKey is the unique key of each child.
   */
  onSelect: PropTypes.func,

  /**
   * A key for the current active item
   */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,

  /**
   * define the position (styling) of the active item bar
   */
  barPosition: PropTypes.oneOf(['top', 'bottom', 'none']),

  /**
   * render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: PropTypes.string
};
NavItem.propTypes = {
  /**
   * Disable one menu item.
   */
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,

  /**
   * A key for each item, and can be used in onSelect
   */
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Define the href of the <a />
   */
  href: PropTypes.string
};
Nav.defaultProps = {
  stacked: false,
  barPosition: 'bottom'
};
Nav.displayName = 'Navigation';
export default Nav;