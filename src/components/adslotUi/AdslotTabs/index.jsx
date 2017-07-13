import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Tabs as BsTabs } from 'react-bootstrap';
import './styles.scss';

const Tabs = (props) => {
  const { adslotStyle } = props;
  const bsTabsProps = _.omit(props, ['adslotStyle']);

  switch (adslotStyle) {
    case 'chevron': {
      const className = _([props.className, 'chevron-tabs-component']).compact().join(' ');
      return (<BsTabs {...bsTabsProps} className={className}>
        {React.Children.map(props.children, (tab) => { // eslint-disable-line
          const tabClassName = _([tab.props.tabClassName, 'chevron-tab-component']).compact().join(' ');
          return React.cloneElement(tab, { tabClassName });
        })}
      </BsTabs>);
    }

    default: {
      return (<BsTabs {...bsTabsProps}>{props.children}</BsTabs>);
    }
  }
};

Tabs.propTypes = _.assign({}, BsTabs.propTypes, {
  adslotStyle: PropTypes.oneOf(['default', 'chevron']),
});

Tabs.defaultProps = {
  adslotStyle: 'default',
};

export default Tabs;
