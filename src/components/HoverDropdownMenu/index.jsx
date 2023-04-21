import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import PopoverLinkItem from './PopoverLinkItem';
import { useDebounce } from '../../hooks/useDebounce';
import './styles.css';

const HoverDropdownMenu = ({ arrowPosition, headerText, hoverComponent, children }) => {
  const [popperNode, setPopperNode] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mouseInPopover, setMouseInPopover] = React.useState(false);

  const [setIsOpenDebouncily, , cancel] = useDebounce(setIsOpen, 100);

  const closeMenu = React.useCallback(() => {
    setIsOpenDebouncily(false);
  }, [setIsOpenDebouncily]);

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
    cancel();
    setIsOpen(true);
    setMouseInPopover(false);
  };

  const element = (
    <div data-testid="hover-dropdown-element" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      {hoverComponent}
    </div>
  );

  return (
    <div data-testid="hover-dropdown-wrapper" className="hover-dropdown">
      {children && children.length > 0 ? (
        <Popover
          placement={`bottom-${arrowPosition === 'left' ? 'start' : 'end'}`}
          triggers={['disabled']}
          isOpen={isOpen || mouseInPopover}
          title={headerText}
          popoverContent={<ul className="list-unstyled">{children}</ul>}
          popperRef={setPopperNode}
        >
          {element}
        </Popover>
      ) : null}
    </div>
  );
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
  children: PropTypes.node,
};

HoverDropdownMenu.defaultProps = {
  arrowPosition: 'left',
  headerText: '',
};

HoverDropdownMenu.Item = PopoverLinkItem;

export default HoverDropdownMenu;
