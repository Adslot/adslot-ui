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

var _Tab = _interopRequireDefault(require("../Tab"));

/* eslint-disable jsx-a11y/anchor-is-valid */
const Tabs = _ref => {
  let {
    id,
    children,
    defaultActiveKey,
    activeKey,
    onSelect
  } = _ref;

  const [currentActiveKey, setCurrentActiveKey] = _react.default.useState(defaultActiveKey);

  const isControlled = !_lodash.default.isNil(activeKey) && _lodash.default.isFunction(onSelect);

  const actualActiveKey = isControlled ? activeKey : currentActiveKey;

  const switchTab = key => {
    return event => {
      event.preventDefault();

      if (isControlled && key !== activeKey) {
        onSelect(key);
      } else if (key !== currentActiveKey) {
        setCurrentActiveKey(key);
      }
    };
  };

  const tabs = _react.default.Children.map(children, child => {
    if (!child) return;

    if (child.type !== _Tab.default) {
      console.error('<Tabs /> children must be instances of <Tab />');
      return;
    } // child must be a Tab instance at this point


    return /*#__PURE__*/_react.default.cloneElement(child, {
      show: actualActiveKey === child.props.eventKey
    });
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    id: id
  }, /*#__PURE__*/_react.default.createElement("ul", {
    role: "tablist",
    className: "nav nav-tabs"
  }, _react.default.Children.map(tabs, tab => /*#__PURE__*/_react.default.createElement("li", {
    role: "presentation",
    className: (0, _classnames.default)({
      active: tab.props.show,
      disabled: tab.props.disabled
    }, tab.props.tabClassName),
    key: tab.props.eventKey
  }, /*#__PURE__*/_react.default.createElement("a", {
    id: `${id}-tab-${tab.props.eventKey}`,
    role: "tab",
    tabIndex: -1,
    "aria-selected": tab.props.show,
    onClick: switchTab(tab.props.eventKey),
    style: tab.props.disabled ? {
      pointerEvents: 'none'
    } : {}
  }, tab.props.title)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "tab-content"
  }, tabs));
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