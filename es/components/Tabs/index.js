import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '../Tab';

var Tabs = function Tabs(_ref) {
  var id = _ref.id,
      children = _ref.children,
      defaultActiveKey = _ref.defaultActiveKey,
      activeKey = _ref.activeKey,
      onSelect = _ref.onSelect;

  var _React$useState = React.useState(defaultActiveKey),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      currentActiveKey = _React$useState2[0],
      setCurrentActiveKey = _React$useState2[1];

  var isControlled = !_.isNil(activeKey) && _.isFunction(onSelect);

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
  var content = React.Children.map(children, function (child) {
    if (_.get(child, 'type.innerName') !== Tab.innerName) {
      console.error('<Tabs /> children must be instances of <Tab />');
      return null;
    } // child must be a Tab instance at this point


    var tab = /*#__PURE__*/React.cloneElement(child, {
      show: actualActiveKey === child.props.eventKey
    });
    tabs.push(tab);
    return tab;
  });
  return /*#__PURE__*/React.createElement("div", {
    id: id
  }, /*#__PURE__*/React.createElement("ul", {
    role: "tablist",
    className: "nav nav-tabs"
  }, tabs.map(function (tab) {
    return /*#__PURE__*/React.createElement("li", {
      role: "presentation",
      className: classnames({
        active: tab.props.show,
        disabled: tab.props.disabled
      }, tab.props.tabClassName),
      key: tab.props.eventKey
    }, /*#__PURE__*/React.createElement("a", {
      id: "".concat(id, "-tab-").concat(tab.props.eventKey),
      role: "tab",
      tabIndex: -1,
      "aria-selected": tab.props.show,
      onClick: switchTab(tab.props.eventKey),
      style: tab.props.disabled ? {
        pointerEvents: 'none'
      } : {}
    }, tab.props.title));
  })), /*#__PURE__*/React.createElement("div", {
    className: "tab-content"
  }, content));
};

Tabs.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,

  /**
   * string or number
   */
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * string or number
   */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * (selectedTabKey) => {...}
   */
  onSelect: PropTypes.func
};
export default Tabs;