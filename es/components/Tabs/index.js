/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '../Tab';
const Tabs = _ref => {
  let {
    id,
    children,
    defaultActiveKey,
    activeKey,
    onSelect
  } = _ref;
  const [currentActiveKey, setCurrentActiveKey] = React.useState(defaultActiveKey);
  const isControlled = !_.isNil(activeKey) && _.isFunction(onSelect);
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
  const tabs = React.Children.map(children, child => {
    if (!child) return;
    if (child.type !== Tab) {
      console.error('<Tabs /> children must be instances of <Tab />');
      return;
    }

    // child must be a Tab instance at this point
    return /*#__PURE__*/React.cloneElement(child, {
      show: actualActiveKey === child.props.eventKey
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    id: id
  }, /*#__PURE__*/React.createElement("ul", {
    role: "tablist",
    className: "nav nav-tabs"
  }, React.Children.map(tabs, tab => /*#__PURE__*/React.createElement("li", {
    role: "presentation",
    className: classnames({
      active: tab.props.show,
      disabled: tab.props.disabled
    }, tab.props.tabClassName),
    key: tab.props.eventKey
  }, /*#__PURE__*/React.createElement("a", {
    id: `${id}-tab-${tab.props.eventKey}`,
    role: "tab",
    tabIndex: -1,
    "aria-selected": tab.props.show,
    onClick: switchTab(tab.props.eventKey),
    style: tab.props.disabled ? {
      pointerEvents: 'none'
    } : {}
  }, tab.props.title)))), /*#__PURE__*/React.createElement("div", {
    className: "tab-content"
  }, tabs));
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