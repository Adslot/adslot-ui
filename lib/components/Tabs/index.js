"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Tab = _interopRequireDefault(require("../Tab"));

/* eslint-disable jsx-a11y/anchor-is-valid */
var Tabs = function Tabs(_ref) {
  var id = _ref.id,
      children = _ref.children,
      defaultActiveKey = _ref.defaultActiveKey,
      activeKey = _ref.activeKey,
      onSelect = _ref.onSelect;

  var _React$useState = _react.default.useState(defaultActiveKey),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      currentActiveKey = _React$useState2[0],
      setCurrentActiveKey = _React$useState2[1];

  var isControlled = !_lodash.default.isNil(activeKey) && _lodash.default.isFunction(onSelect);

  var actualActiveKey = isControlled ? activeKey : currentActiveKey;

  var switchTab = function switchTab(key) {
    return function (event) {
      event.preventDefault();

      if (isControlled && key !== activeKey) {
        onSelect(key);
      } else if (key !== currentActiveKey) {
        setCurrentActiveKey(key);
      }
    };
  };

  var tabs = [];

  var content = _react.default.Children.map(children, function (child) {
    if (_lodash.default.get(child, 'type.innerName') !== _Tab.default.innerName) {
      console.error('<Tabs /> children must be instances of <Tab />');
      return null;
    } // child must be a Tab instance at this point


    var tab = /*#__PURE__*/_react.default.cloneElement(child, {
      show: actualActiveKey === child.props.eventKey
    });

    tabs.push(tab);
    return tab;
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    id: id
  }, /*#__PURE__*/_react.default.createElement("ul", {
    role: "tablist",
    className: "nav nav-tabs"
  }, tabs.map(function (tab) {
    return /*#__PURE__*/_react.default.createElement("li", {
      role: "presentation",
      className: (0, _classnames.default)({
        active: tab.props.show,
        disabled: tab.props.disabled
      }, tab.props.tabClassName),
      key: tab.props.eventKey
    }, /*#__PURE__*/_react.default.createElement("a", {
      id: "".concat(id, "-tab-").concat(tab.props.eventKey),
      role: "tab",
      tabIndex: -1,
      "aria-selected": tab.props.show,
      onClick: switchTab(tab.props.eventKey),
      style: tab.props.disabled ? {
        pointerEvents: 'none'
      } : {}
    }, tab.props.title));
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "tab-content"
  }, content));
};

Tabs.propTypes = {
  id: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired,

  /**
   * string or number
   */
  defaultActiveKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * string or number
   */
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * (selectedTabKey) => {...}
   */
  onSelect: _propTypes.default.func
};
var _default = Tabs;
exports.default = _default;