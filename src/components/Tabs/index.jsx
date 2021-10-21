/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '../Tab';

const Tabs = ({ id, children, defaultActiveKey, activeKey, onSelect }) => {
  const [currentActiveKey, setCurrentActiveKey] = React.useState(defaultActiveKey);

  const isControlled = !_.isNil(activeKey) && _.isFunction(onSelect);
  const actualActiveKey = isControlled ? activeKey : currentActiveKey;

  const switchTab = (key) => {
    return (event) => {
      event.preventDefault();

      if (isControlled && key !== activeKey) {
        onSelect(key);
      } else if (key !== currentActiveKey) {
        setCurrentActiveKey(key);
      }
    };
  };

  const tabs = [];
  const content = React.Children.map(children, (child) => {
    if (_.get(child, 'type.innerName') !== Tab.innerName) {
      console.error('<Tabs /> children must be instances of <Tab />');
      return null;
    }

    // child must be a Tab instance at this point
    const tab = React.cloneElement(child, {
      show: actualActiveKey === child.props.eventKey,
    });
    tabs.push(tab);

    return tab;
  });

  return (
    <div data-testid="tablist-wrapper" id={id}>
      <ul role="tablist" className="nav nav-tabs">
        {tabs.map((tab) => (
          <li
            data-testid="tablist-item"
            role="presentation"
            className={classnames({ active: tab.props.show, disabled: tab.props.disabled }, tab.props.tabClassName)}
            key={tab.props.eventKey}
          >
            <a
              data-testid="tablist-a-tag"
              id={`${id}-tab-${tab.props.eventKey}`}
              role="tab"
              tabIndex={-1}
              aria-selected={tab.props.show}
              onClick={switchTab(tab.props.eventKey)}
              style={tab.props.disabled ? { pointerEvents: 'none' } : {}}
            >
              {tab.props.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">{content}</div>
    </div>
  );
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
  onSelect: PropTypes.func,
};

export default Tabs;
