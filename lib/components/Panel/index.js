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

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Panel = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(Panel, _React$PureComponent);

  var _super = _createSuper(Panel);

  function Panel() {
    var _this;

    (0, _classCallCheck2.default)(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onHeaderClick", function () {
      return _this.props.onClick(_this.props.id);
    });
    return _this;
  }

  (0, _createClass2.default)(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          dts = _this$props.dts,
          icon = _this$props.icon,
          isCollapsed = _this$props.isCollapsed,
          title = _this$props.title;
      var classesCombined = (0, _classnames.default)(['panel-component', {
        collapsed: isCollapsed
      }, className]);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: classesCombined,
        "data-test-selector": dts
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "panel-component-header clearfix",
        onClick: this.onHeaderClick
      }, icon, title), /*#__PURE__*/_react.default.createElement("div", {
        className: "panel-component-content"
      }, children));
    }
  }]);
  return Panel;
}(_react.default.PureComponent);

Panel.propTypes = {
  id: _propTypes.default.string.isRequired,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  icon: _propTypes.default.node,
  title: _propTypes.default.node.isRequired,
  isCollapsed: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  children: _propTypes.default.node
};
var _default = Panel;
exports.default = _default;