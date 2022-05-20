import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import PopoverLinkItem from './PopoverLinkItem';

var HoverDropdownMenu = function HoverDropdownMenu(_ref) {
  var arrowPosition = _ref.arrowPosition,
      headerText = _ref.headerText,
      hoverComponent = _ref.hoverComponent,
      children = _ref.children;

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      popperNode = _React$useState2[0],
      setPopperNode = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isOpen = _React$useState4[0],
      setIsOpen = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      mouseInPopover = _React$useState6[0],
      setMouseInPopover = _React$useState6[1];

  var closeMenu = _.debounce(function () {
    setIsOpen(false);
  }, 100);

  var popoverEnterHandler = React.useCallback(function () {
    return setMouseInPopover(true);
  }, [setMouseInPopover]);
  var popoverLeaveHandler = React.useCallback(function () {
    setMouseInPopover(false);
    closeMenu();
  }, [setMouseInPopover, closeMenu]);
  React.useEffect(function () {
    if (popperNode) {
      popperNode.addEventListener('mouseenter', popoverEnterHandler);
      popperNode.addEventListener('mouseleave', popoverLeaveHandler);
    }
  }, [popperNode, popoverEnterHandler, popoverLeaveHandler]);

  var openMenu = function openMenu() {
    setIsOpen(true);
    setMouseInPopover(false);
  };

  var element = /*#__PURE__*/React.createElement("div", {
    onMouseEnter: openMenu,
    onMouseLeave: closeMenu
  }, hoverComponent);
  return /*#__PURE__*/React.createElement("div", {
    className: "hover-dropdown"
  }, children && children.length > 0 ? /*#__PURE__*/React.createElement(Popover, {
    placement: "bottom-".concat(arrowPosition === 'left' ? 'start' : 'end'),
    triggers: ['disabled'],
    isOpen: isOpen || mouseInPopover,
    title: headerText,
    popoverContent: /*#__PURE__*/React.createElement("ul", {
      className: "list-unstyled"
    }, children),
    popperRef: setPopperNode
  }, element) : null);
};

HoverDropdownMenu.propTypes = {
  /**
   * Determine the placement of the popover
   */
  arrowPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * If set to empty string, header will not be rendered.
   */
  headerText: PropTypes.string,
  hoverComponent: PropTypes.element.isRequired,
  children: PropTypes.node
};
HoverDropdownMenu.defaultProps = {
  arrowPosition: 'left',
  headerText: ''
};
HoverDropdownMenu.Item = PopoverLinkItem;
export default HoverDropdownMenu;