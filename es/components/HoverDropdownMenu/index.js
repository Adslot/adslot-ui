import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import PopoverLinkItem from './PopoverLinkItem';

const HoverDropdownMenu = _ref => {
  let {
    arrowPosition,
    headerText,
    hoverComponent,
    children
  } = _ref;
  const [popperNode, setPopperNode] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mouseInPopover, setMouseInPopover] = React.useState(false);

  const closeMenu = _.debounce(() => {
    setIsOpen(false);
  }, 100);

  const popoverEnterHandler = React.useCallback(() => setMouseInPopover(true), [setMouseInPopover]);
  const popoverLeaveHandler = React.useCallback(() => {
    setMouseInPopover(false);
    closeMenu();
  }, [setMouseInPopover, closeMenu]);
  React.useEffect(() => {
    if (popperNode) {
      popperNode.addEventListener('mouseenter', popoverEnterHandler);
      popperNode.addEventListener('mouseleave', popoverLeaveHandler);
    }
  }, [popperNode, popoverEnterHandler, popoverLeaveHandler]);

  const openMenu = () => {
    setIsOpen(true);
    setMouseInPopover(false);
  };

  const element = /*#__PURE__*/React.createElement("div", {
    onMouseEnter: openMenu,
    onMouseLeave: closeMenu
  }, hoverComponent);
  return /*#__PURE__*/React.createElement("div", {
    className: "hover-dropdown"
  }, children && children.length > 0 ? /*#__PURE__*/React.createElement(Popover, {
    placement: `bottom-${arrowPosition === 'left' ? 'start' : 'end'}`,
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