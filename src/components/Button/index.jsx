/* eslint-disable react/prop-types */
// disable proptypes check because it doesn't take into consideration extended types
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/lib/Button';
import Spinner from '../Spinner';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const adslotButtonPropTypes = {
  /**
   * PropTypes.oneOf(['small', 'large'])
   */
  size: PropTypes.oneOf(['small', 'large']),
  inverse: PropTypes.bool,
  dts: PropTypes.string,
  isLoading: PropTypes.bool,
  /**
   * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
   */
  bsStyle: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link']),
};

const Button = props => {
  const { bsStyle, inverse, size, children, dts, className, isLoading, disabled } = props;
  const baseClass = 'aui--button';
  const classes = classNames(baseClass, className, {
    'btn-inverse': inverse && !/btn-inverse/.test(className),
    'btn-large': size === 'large',
    'aui--btn-default':
      (!bsStyle || bsStyle === 'default') &&
      (!className ||
        ['btn-default', 'btn-inverse', 'btn-default btn-inverse', 'btn-inverse btn-default'].includes(className)),
  });

  const renderSpinner = () =>
    isLoading ? (
      <div className="spinner-container">
        <Spinner size={_.includes(['lg', 'large'], props.bsSize) ? 'medium' : 'small'} />
      </div>
    ) : null;

  return (
    <BootstrapButton
      bsStyle={bsStyle}
      {..._.omit(props, _.keys(adslotButtonPropTypes))}
      disabled={isLoading || disabled}
      className={classes}
      {...expandDts(dts)}
    >
      {renderSpinner()}
      <div className={isLoading ? 'aui--button-children-container' : null}>{children}</div>
    </BootstrapButton>
  );
};

Button.propTypes = { ...adslotButtonPropTypes, ...BootstrapButton.propTypes };

Button.defaultProps = {
  inverse: false,
  isLoading: false,
  size: 'small',
};

export default Button;
