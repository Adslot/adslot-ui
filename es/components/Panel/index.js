import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

var Panel = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Panel, _React$PureComponent);

  var _super = _createSuper(Panel);

  function Panel() {
    var _this;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onHeaderClick", function () {
      return _this.props.onClick(_this.props.id);
    });

    return _this;
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          dts = _this$props.dts,
          icon = _this$props.icon,
          isCollapsed = _this$props.isCollapsed,
          title = _this$props.title;
      var classesCombined = classnames(['panel-component', {
        collapsed: isCollapsed
      }, className]);
      return /*#__PURE__*/React.createElement("div", {
        className: classesCombined,
        "data-test-selector": dts
      }, /*#__PURE__*/React.createElement("div", {
        className: "panel-component-header clearfix",
        onClick: this.onHeaderClick
      }, icon, title), /*#__PURE__*/React.createElement("div", {
        className: "panel-component-content"
      }, children));
    }
  }]);

  return Panel;
}(React.PureComponent);

Panel.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};
export default Panel;