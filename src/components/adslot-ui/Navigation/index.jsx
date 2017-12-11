/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { expandDts } from 'lib/utils';

import './styles.scss';

class NavigationComponent extends React.PureComponent {
  render() {
    const { barPosition, children, dts } = this.props;

    const classes = `${barPosition}-bar`;
    const navProps = _.omit(this.props, ['barPosition']);

    return (
      <Nav {...navProps} {...expandDts(dts)} bsClass="nav-borderless" className={classes}>
        {children}
      </Nav>
    );
  }
}

NavigationComponent.propTypes = _.assign({}, Nav.propTypes, {
  barPosition: PropTypes.oneOf(['top', 'bottom']),
  dts: PropTypes.string,
});

NavigationComponent.defaultProps = {
  barPosition: 'bottom',
};

export default NavigationComponent;
