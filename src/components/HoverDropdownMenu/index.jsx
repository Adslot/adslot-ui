import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import PopoverLinkItem from './PopoverLinkItem';
import './styles.scss';

const HoverDropdownMenu = ({ arrowPosition, headerText, popoverClassNames, hoverComponent, children }) => {
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

  const element = (
    <div data-testid="hover-dropdown-element" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      {hoverComponent}
    </div>
  );

  let placement;
  switch (arrowPosition) {
    case 'left':
      placement = 'bottom-start';
      break;
    case 'right':
      placement = 'bottom-end';
      break;
    case 'none':
    default:
      placement = 'bottom';
      break;
  }

  return (
    <div data-testid="hover-dropdown-wrapper" className="hover-dropdown">
      {children ? (
        <Popover
          popoverClassNames={popoverClassNames}
          placement={placement}
          triggers={['disabled']}
          isOpen={isOpen || mouseInPopover}
          title={headerText}
          popoverContent={<ul className="list-unstyled">{children}</ul>}
          popperRef={setPopperNode}
          arrowStyles={arrowPosition === 'none' ? { display: 'none' } : null}
        >
          {element}
        </Popover>
      ) : null}
    </div>
  );
};

HoverDropdownMenu.propTypes = {
  /**
   * allow more styling for popover
   */
  popoverClassNames: PropTypes.string,
  /**
   * Determine the placement of the popover
   */
  arrowPosition: PropTypes.oneOf(['left', 'right', 'none']),
  /**
   * If set to empty string, header will not be rendered.
   */
  headerText: PropTypes.string,
  hoverComponent: PropTypes.node.isRequired,
  children: PropTypes.node,
};

HoverDropdownMenu.defaultProps = {
  arrowPosition: 'left',
  headerText: '',
};

HoverDropdownMenu.Item = PopoverLinkItem;

export default HoverDropdownMenu;
