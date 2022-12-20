import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import PopoverLinkItem from './PopoverLinkItem';
import './styles.css';

const HoverDropdownMenu = ({ arrowPosition, headerText, hoverComponent, children }) => {
  const element = <div data-testid="hover-dropdown-element">{hoverComponent}</div>;

  return (
    <div data-testid="hover-dropdown-wrapper" className="hover-dropdown">
      {children && children.length > 0 ? (
        <Popover
          placement={`bottom-${arrowPosition === 'left' ? 'start' : 'end'}`}
          contentHoverable
          title={headerText}
          popoverContent={<ul className="list-unstyled">{children}</ul>}
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
