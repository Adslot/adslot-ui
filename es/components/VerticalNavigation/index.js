import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

var MenuItem = function MenuItem(_ref) {
  var children = _ref.children;
  return children;
};

var VerticalNavigation = /*#__PURE__*/function (_React$Component) {
  _inherits(VerticalNavigation, _React$Component);

  var _super = _createSuper(VerticalNavigation);

  function VerticalNavigation(props) {
    var _this;

    _classCallCheck(this, VerticalNavigation);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getActiveTabIndex", function (children) {
      var activeIndex = _.findIndex(children, 'props.isActive');

      return activeIndex === -1 ? 0 : activeIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "renderContent", function (_ref2) {
      var children = _ref2.children;

      var activeTabIndex = _this.getActiveTabIndex(children);

      var contentList = React.Children.map(children, function (child, index) {
        if (!child.props.content) {
          // eslint-disable-next-line no-console
          console.warn('Navigation does not render MenuItem that have no content prop.');
          return null;
        }

        var contentClassnames = classnames(['aui--vertical-navigation-component__content-item', {
          'aui--vertical-navigation-component__content-item-is-active': index === activeTabIndex
        }]);
        return /*#__PURE__*/React.createElement("div", {
          "aria-label": "render-content",
          className: contentClassnames,
          "data-test-selector": child.props.dts
        }, child);
      });
      return _.compact(contentList);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMenu", function (_ref3) {
      var children = _ref3.children,
          isCollapsed = _ref3.isCollapsed;
      var menuList = [];

      var activeTabIndex = _this.getActiveTabIndex(children);

      React.Children.forEach(children, function (child, index) {
        if (!child.props.content) {
          // eslint-disable-next-line no-console
          console.warn('Navigation does not render MenuItem that have no content prop.');
          return;
        }

        var classNames = classnames(['aui--vertical-navigation-component__menu-item', {
          'aui--vertical-navigation-component__menu-item-is-active': index === activeTabIndex
        }]);
        menuList.push( /*#__PURE__*/React.createElement("div", {
          "aria-label": "render-menu",
          key: "menu-item-".concat(_.uniqueId()),
          className: classNames,
          onClick: child.props.onClick
        }, child.props.content({
          isCollapsed: isCollapsed
        })));
      });
      return menuList;
    });

    _this.menuList = _this.renderMenu(props);
    _this.contentList = _this.renderContent(props);
    return _this;
  }

  _createClass(VerticalNavigation, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      this.menuList = this.renderMenu(nextProps); // only render collapse/expand

      if (nextProps.isCollapsed !== this.props.isCollapsed) {
        return true;
      }

      this.contentList = this.renderContent(nextProps);
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          dts = _this$props.dts,
          collapsable = _this$props.collapsable,
          isCollapsed = _this$props.isCollapsed;
      var componentClasses = classnames('aui--vertical-navigation-component', className);
      var menuClasses = classnames(['aui--vertical-navigation-component__menu', 'aui--vertical-navigation-component__menu-is-animated', {
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
  }]);

  return VerticalNavigation;
}(React.Component);

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