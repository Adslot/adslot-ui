import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

const MenuItem = ({ children }) => children;

class VerticalNavigation extends React.Component {
  static propTypes = {
    isCollapsed: PropTypes.bool,
    /**
     * event handler for clicking on the collapse/expand button
     * </br>
     * const onClick = () => ...
     */
    onClick: PropTypes.func,
    /**
     * 	render `data-test-selector` onto the component. It can be useful for testing.
     */
    dts: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    isCollapsed: false,
  };

  constructor(props) {
    super(props);
    this.menuList = this.renderMenu(props);
    this.contentList = this.renderContent(props);
  }

  shouldComponentUpdate(nextProps) {
    this.menuList = this.renderMenu(nextProps);

    // only render collapse/expand
    if (nextProps.isCollapsed !== this.props.isCollapsed) {
      return true;
    }

    this.contentList = this.renderContent(nextProps);
    return true;
  }

  getActiveTabIndex = children => {
    const activeIndex = _.findIndex(children, 'props.isActive');
    return activeIndex === -1 ? 0 : activeIndex;
  };

  renderContent = ({ children }) => {
    const activeTabIndex = this.getActiveTabIndex(children);
    const contentList = React.Children.map(children, (child, index) => {
      if (!child.props.content) {
        // eslint-disable-next-line no-console
        console.warn('Navigation does not render MenuItem that have no content prop.');
        return null;
      }

      const contentClassnames = classnames([
        'aui--vertical-navigation-component__content-item',
        { 'aui--vertical-navigation-component__content-item-is-active': index === activeTabIndex },
      ]);

      return (
        <div className={contentClassnames} data-test-selector={child.props.dts}>
          {child}
        </div>
      );
    });

    return _.compact(contentList);
  };

  renderMenu = ({ children, isCollapsed }) => {
    const menuList = [];
    const activeTabIndex = this.getActiveTabIndex(children);

    React.Children.forEach(children, (child, index) => {
      if (!child.props.content) {
        // eslint-disable-next-line no-console
        console.warn('Navigation does not render MenuItem that have no content prop.');
        return;
      }

      const classNames = classnames([
        'aui--vertical-navigation-component__menu-item',
        { 'aui--vertical-navigation-component__menu-item-is-active': index === activeTabIndex },
      ]);
      menuList.push(
        <div key={`menu-item-${_.uniqueId()}`} className={classNames} onClick={child.props.onClick}>
          {child.props.content({ isCollapsed })}
        </div>
      );
    });

    return menuList;
  };

  render() {
    const { className, dts, isCollapsed } = this.props;
    const componentClasses = classnames('aui--vertical-navigation-component', className);

    const menuClasses = classnames([
      'aui--vertical-navigation-component__menu',
      'aui--vertical-navigation-component__menu-is-animated',
      {
        'aui--vertical-navigation-component__menu-is-collapsed': isCollapsed,
      },
    ]);

    return (
      <div className={componentClasses} data-test-selector={dts}>
        <div className={menuClasses}>
          <div className="aui--vertical-navigation-component__menu-item" onClick={this.props.onClick}>
            <div className="aui--vertical-navigation-component__menu-item-collapse">
              <div className="aui--vertical-navigation-component__menu-item-collapse-icon" />
            </div>
          </div>
          {this.menuList}
        </div>
        <div className="aui--vertical-navigation-component__content">{this.contentList}</div>
      </div>
    );
  }
}

VerticalNavigation.MenuItem = MenuItem;

export default VerticalNavigation;
