"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

const MenuItem = _ref => {
  let {
    children
  } = _ref;
  return children;
};

class VerticalNavigation extends _react.default.Component {
  constructor(props) {
    super(props);
    this.menuList = this.renderMenu(props);
    this.contentList = this.renderContent(props);
  }

  shouldComponentUpdate(nextProps) {
    this.menuList = this.renderMenu(nextProps); // only render collapse/expand

    if (nextProps.isCollapsed !== this.props.isCollapsed) {
      return true;
    }

    this.contentList = this.renderContent(nextProps);
    return true;
  }

  getActiveTabIndex = children => {
    const activeIndex = _lodash.default.findIndex(children, 'props.isActive');

    return activeIndex === -1 ? 0 : activeIndex;
  };
  renderContent = _ref2 => {
    let {
      children
    } = _ref2;
    const activeTabIndex = this.getActiveTabIndex(children);

    const contentList = _react.default.Children.map(children, (child, index) => {
      if (!child.props.content) {
        // eslint-disable-next-line no-console
        console.warn('Navigation does not render MenuItem that have no content prop.');
        return null;
      }

      const contentClassnames = (0, _classnames.default)(['aui--vertical-navigation-component__content-item', {
        'aui--vertical-navigation-component__content-item-is-active': index === activeTabIndex
      }]);
      return /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": "render-content",
        className: contentClassnames,
        "data-test-selector": child.props.dts
      }, child);
    });

    return _lodash.default.compact(contentList);
  };
  renderMenu = _ref3 => {
    let {
      children,
      isCollapsed
    } = _ref3;
    const menuList = [];
    const activeTabIndex = this.getActiveTabIndex(children);

    _react.default.Children.forEach(children, (child, index) => {
      if (!child.props.content) {
        // eslint-disable-next-line no-console
        console.warn('Navigation does not render MenuItem that have no content prop.');
        return;
      }

      const classNames = (0, _classnames.default)(['aui--vertical-navigation-component__menu-item', {
        'aui--vertical-navigation-component__menu-item-is-active': index === activeTabIndex
      }]);
      menuList.push( /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": "render-menu",
        key: `menu-item-${_lodash.default.uniqueId()}`,
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
    const componentClasses = (0, _classnames.default)('aui--vertical-navigation-component', className);
    const menuClasses = (0, _classnames.default)(['aui--vertical-navigation-component__menu', 'aui--vertical-navigation-component__menu-is-animated', {
      'aui--vertical-navigation-component__menu-is-collapsed': isCollapsed
    }]);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: componentClasses,
      "data-test-selector": dts
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: menuClasses
    }, collapsable ? /*#__PURE__*/_react.default.createElement("div", {
      className: "aui--vertical-navigation-component__menu-item",
      onClick: this.props.onClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "aui--vertical-navigation-component__menu-item-collapse"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "aui--vertical-navigation-component__menu-item-collapse-icon"
    }))) : null, this.menuList), /*#__PURE__*/_react.default.createElement("div", {
      className: "aui--vertical-navigation-component__content"
    }, this.contentList));
  }

}

VerticalNavigation.MenuItem = MenuItem;
VerticalNavigation.propTypes = {
  /**
   * 	control whether the MenuItem can be folded into a collapse icon (hamburger)
   */
  collapsable: _propTypes.default.bool,
  isCollapsed: _propTypes.default.bool,

  /**
   * event handler for clicking on the collapse/expand button
   * </br>
   * const onClick = () => ...
   */
  onClick: _propTypes.default.func,

  /**
   * 	render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: _propTypes.default.string,
  className: _propTypes.default.string
};
VerticalNavigation.defaultProps = {
  collapsable: true,
  isCollapsed: false
};
var _default = VerticalNavigation;
exports.default = _default;