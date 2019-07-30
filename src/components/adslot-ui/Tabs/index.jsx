/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from '../Tab';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: this.props.defaultActiveKey,
    };

    this.switchTab = this.switchTab.bind(this);
  }

  get isControlled() {
    const { activeKey, onSelect } = this.props;

    return !_.isNil(activeKey) && _.isFunction(onSelect);
  }

  get activeKey() {
    return this.isControlled ? this.props.activeKey : this.state.activeKey;
  }

  switchTab(key) {
    const { onSelect, activeKey } = this.props;
    return event => {
      event.preventDefault();

      if (this.isControlled && key !== activeKey) {
        onSelect(key);
      } else if (key !== this.state.activeKey) {
        this.setState({ activeKey: key });
      }
    };
  }

  render() {
    const { id, children } = this.props;

    const tabs = [];
    const content = React.Children.map(children, child => {
      if (_.get(child, 'type.innerName') !== Tab.innerName) {
        console.error('<Tabs /> children must be instances of <Tab />');
        return false;
      }

      // child must be a Tab instance at this point
      const tab = React.cloneElement(child, {
        show: this.activeKey === child.props.eventKey,
      });
      tabs.push(tab);

      return tab;
    });

    return (
      <div id={id}>
        <ul role="tablist" className="nav nav-tabs">
          {tabs.map(tab => (
            <li
              role="presentation"
              className={classnames(tab.props.tabClassName, { active: tab.props.show, disabled: tab.props.disabled })}
              key={tab.props.eventKey}
            >
              <a
                id={`${id}-tab-${tab.props.eventKey}`}
                role="tab"
                tabIndex={-1}
                aria-selected={tab.props.show}
                onClick={this.switchTab(tab.props.eventKey)}
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
  }
}

Tabs.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
};

export default Tabs;
