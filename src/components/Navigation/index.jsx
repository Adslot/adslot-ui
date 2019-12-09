/* eslint-disable react/prop-types */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const NavigationComponent = props => {
  const { barPosition, children, dts } = props;
  const classes = `${barPosition}-bar`;
  const navProps = _.omit(props, ['barPosition']);

  return (
    <Nav {...navProps} {...expandDts(dts)} bsClass="nav-borderless" className={classes}>
      {children}
    </Nav>
  );
};

NavigationComponent.propTypes = _.assign({}, Nav.propTypes, {
  barPosition: PropTypes.oneOf(['top', 'bottom']),
  dts: PropTypes.string,
});

NavigationComponent.defaultProps = {
  barPosition: 'bottom',
};

export default NavigationComponent;
