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
  const { bsSize, bsStyle, children, className, disabled, dts, href, inverse, isLoading, size, target } = props;
  const baseClass = 'aui--button';
  const classes = classNames(
    baseClass,
    {
      'btn-inverse': inverse && !/btn-inverse/.test(className),
      'btn-large': size === 'large' || _.includes(['lg', 'large'], bsSize),
      [`btn-${bsStyle}`]: !_.isEmpty(bsStyle),
      'has-anchor': href,
    },
    className
  );

  const renderSpinner = () =>
    isLoading ? (
      <div data-testid="button-spinner-wrapper" className="spinner-container">
        <Spinner size={_.includes(['lg', 'large'], bsSize) ? 'medium' : 'small'} />
      </div>
    ) : null;

  const renderChildren = () =>
    href ? (
      <a
        data-testid="button-anchor"
        className="aui--button-anchor"
        href={href}
        target={target}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ) : (
      children
    );

  return (
    <button
      data-testid="button-wrapper"
      disabled={isLoading || disabled}
      className={classes}
      {...expandDts(dts)}
      {..._.omit(props, _.keys(adslotButtonPropTypes))}
    >
      {renderSpinner()}
      <div className={classNames('aui--button-children-container', { 'is-loading': isLoading })}>
        {renderChildren()}
      </div>
    </button>
  );
};

const adslotButtonPropTypes = {
  /**
   * PropTypes.oneOf(['lg', 'large', 'sm', 'small'])
   */
  bsSize: PropTypes.oneOf(['lg', 'large', 'sm', 'small']),
  /**
   * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
   */
  bsStyle: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'link']),
  className: PropTypes.string,
  dts: PropTypes.string,
  href: PropTypes.string,
  /**
   * The target attribute specifies where to open the linked document when there is a defined 'href',
   * PropTypes.oneOf(['_blank', '_self', '_parent', '_top'])
   */
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  inverse: PropTypes.bool,
  isLoading: PropTypes.bool,
  /**
   * PropTypes.oneOf(['small', 'large'])
   */
  size: PropTypes.oneOf(['small', 'large']),
};

Button.propTypes = { ...adslotButtonPropTypes };

Button.defaultProps = {
  inverse: false,
  isLoading: false,
  size: 'small',
  bsStyle: 'default',
  target: '_self',
};

export default Button;
