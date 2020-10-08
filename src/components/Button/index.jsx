/* eslint-disable react/prop-types */
// disable proptypes check because it doesn't take into consideration extended types
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { expandDts } from '../../lib/utils';
import './styles.scss';

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
    [`btn-${bsStyle}`]: !_.isEmpty(bsStyle),
  });

  const renderSpinner = () =>
    isLoading ? (
      <div data-testid="button-spinner-wrapper" className="spinner-container">
        <Spinner size={_.includes(['lg', 'large'], props.bsSize) ? 'medium' : 'small'} />
      </div>
    ) : null;

  return (
    <button
      data-testid="button-wrapper"
      disabled={isLoading || disabled}
      className={classes}
      {...expandDts(dts)}
      {..._.omit(props, _.keys(adslotButtonPropTypes))}
    >
      {renderSpinner()}
      <div className={isLoading ? 'aui--button-children-container' : null}>{children}</div>
    </button>
  );
};

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
  className: PropTypes.string,
};

Button.propTypes = { ...adslotButtonPropTypes };

Button.defaultProps = {
  inverse: false,
  isLoading: false,
  size: 'small',
};

export default Button;
