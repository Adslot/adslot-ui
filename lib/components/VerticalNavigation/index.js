"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var MenuItem = function MenuItem(_ref) {
  var children = _ref.children;
  return children;
};

var VerticalNavigation = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(VerticalNavigation, _React$Component);

  var _super = _createSuper(VerticalNavigation);

  function VerticalNavigation(props) {
    var _this;

    (0, _classCallCheck2.default)(this, VerticalNavigation);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getActiveTabIndex", function (children) {
      var activeIndex = _lodash.default.findIndex(children, 'props.isActive');

      return activeIndex === -1 ? 0 : activeIndex;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderContent", function (_ref2) {
      var children = _ref2.children;

      var activeTabIndex = _this.getActiveTabIndex(children);

      var contentList = _react.default.Children.map(children, function (child, index) {
        if (!child.props.content) {
          // eslint-disable-next-line no-console
          console.warn('Navigation does not render MenuItem that have no content prop.');
          return null;
        }

        var contentClassnames = (0, _classnames.default)(['aui--vertical-navigation-component__content-item', {
          'aui--vertical-navigation-component__content-item-is-active': index === activeTabIndex
        }]);
        return /*#__PURE__*/_react.default.createElement("div", {
          "aria-label": "render-content",
          className: contentClassnames,
          "data-test-selector": child.props.dts
        }, child);
      });

      return _lodash.default.compact(contentList);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderMenu", function (_ref3) {
      var children = _ref3.children,
          isCollapsed = _ref3.isCollapsed;
      var menuList = [];

      var activeTabIndex = _this.getActiveTabIndex(children);

      _react.default.Children.forEach(children, function (child, index) {
        if (!child.props.content) {
          // eslint-disable-next-line no-console
          console.warn('Navigation does not render MenuItem that have no content prop.');
          return;
        }

        var classNames = (0, _classnames.default)(['aui--vertical-navigation-component__menu-item', {
          'aui--vertical-navigation-component__menu-item-is-active': index === activeTabIndex
        }]);
        menuList.push( /*#__PURE__*/_react.default.createElement("div", {
          "aria-label": "render-menu",
          key: "menu-item-".concat(_lodash.default.uniqueId()),
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

  (0, _createClass2.default)(VerticalNavigation, [{
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
      var componentClasses = (0, _classnames.default)('aui--vertical-navigation-component', className);
      var menuClasses = (0, _classnames.default)(['aui--vertical-navigation-component__menu', 'aui--vertical-navigation-component__menu-is-animated', {
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
  }]);
  return VerticalNavigation;
}(_react.default.Component);

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