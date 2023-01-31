import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
const MenuItem = _ref => {
  let {
    children
  } = _ref;
  return children;
};
class VerticalNavigation extends React.Component {
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
  renderContent = _ref2 => {
    let {
      children
    } = _ref2;
    const activeTabIndex = this.getActiveTabIndex(children);
    const contentList = React.Children.map(children, (child, index) => {
      if (!child.props.content) {
        // eslint-disable-next-line no-console
        console.warn('Navigation does not render MenuItem that have no content prop.');
        return null;
      }
      const contentClassnames = classnames(['aui--vertical-navigation-component__content-item', {
        'aui--vertical-navigation-component__content-item-is-active': index === activeTabIndex
      }]);
      return /*#__PURE__*/React.createElement("div", {
        "aria-label": "render-content",
        className: contentClassnames,
        "data-test-selector": child.props.dts
      }, child);
    });
    return _.compact(contentList);
  };
  renderMenu = _ref3 => {
    let {
      children,
      isCollapsed
    } = _ref3;
    const menuList = [];
    const activeTabIndex = this.getActiveTabIndex(children);
    React.Children.forEach(children, (child, index) => {
      if (!child.props.content) {
        // eslint-disable-next-line no-console
        console.warn('Navigation does not render MenuItem that have no content prop.');
        return;
      }
      const classNames = classnames(['aui--vertical-navigation-component__menu-item', {
        'aui--vertical-navigation-component__menu-item-is-active': index === activeTabIndex
      }]);
      menuList.push( /*#__PURE__*/React.createElement("div", {
        "aria-label": "render-menu",
        key: `menu-item-${_.uniqueId()}`,
        className: classNames,
        onClick: child.props.onClick
      }, child.props.content({
        isCollapsed
      })));
    });
    return menuList;
  };
  render() {
    const {
      className,
      dts,
      collapsable,
      isCollapsed
    } = this.props;
    const componentClasses = classnames('aui--vertical-navigation-component', className);
    const menuClasses = classnames(['aui--vertical-navigation-component__menu', 'aui--vertical-navigation-component__menu-is-animated', {
      'aui--vertical-navigation-component__menu-is-collapsed': isCollapsed
    }]);
    return /*#__PURE__*/React.createElement("div", {
      className: componentClasses,
      "data-test-selector": dts
    }, /*#__PURE__*/React.createElement("div", {
      className: menuClasses
    }, collapsable ? /*#__PURE__*/React.createElement("div", {
      className: "aui--vertical-navigation-component__menu-item",
      onClick: this.props.onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "aui--vertical-navigation-component__menu-item-collapse"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aui--vertical-navigation-component__menu-item-collapse-icon"
    }))) : null, this.menuList), /*#__PURE__*/React.createElement("div", {
      className: "aui--vertical-navigation-component__content"
    }, this.contentList));
  }
}
VerticalNavigation.MenuItem = MenuItem;
VerticalNavigation.propTypes = {
  /**
   * 	control whether the MenuItem can be folded into a collapse icon (hamburger)
   */
  collapsable: PropTypes.bool,
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
  className: PropTypes.string
};
VerticalNavigation.defaultProps = {
  collapsable: true,
  isCollapsed: false
};
export default VerticalNavigation;