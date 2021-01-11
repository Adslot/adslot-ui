import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const Nav = ({ stacked, className, onSelect, activeKey, barPosition, children, dts }) => {
  let navItems = [];

  React.Children.forEach(children, child => {
    navItems.push(React.cloneElement(child, { onSelect, activeKey: activeKey }));
  });

  return (
    <nav data-testid="nav-component-wrapper" {...expandDts(dts)}>
      <ul
        data-testid="nav-component"
        className={classnames('aui--nav', 'nav-borderless', `${barPosition}-bar`, { stacked: stacked }, className)}
      >
        {navItems}
      </ul>
    </nav>
  );
};

export const NavItem = ({ className, disabled, activeKey, eventKey, href, onSelect, children }) => {
  const onItemClick = () => {
    onSelect(eventKey);
  };

  return (
    <li
      data-testid="nav-item-component"
      role="presentation"
      className={classnames('aui--nav-item', { active: activeKey === eventKey, disabled }, className)}
      onClick={disabled ? _.noop : onItemClick}
    >
      {href ? (
        <a data-testid="nav-item-anchor" role="button" href={href}>
          {children}
        </a>
      ) : (
        children
      )}
    </li>
  );
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
  dts: PropTypes.string,
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
  href: PropTypes.string,
};

Nav.defaultProps = {
  stacked: false,
  barPosition: 'bottom',
};

Nav.displayName = 'Navigation';

export default Nav;
