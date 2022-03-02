/* eslint-disable react/prop-types */
// disable proptypes check because it doesn't take into consideration extended types
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { expandDts, invariant } from '../../lib/utils';
import './styles.scss';

const Button = (props) => {
  const {
    color,
    size,
    variant,
    round,
    fullWidth,
    icon,
    href,
    children,
    className,
    disabled,
    dts,
    isLoading,
    inverse, // deprecated
    theme, // deprecated
    ...rest
  } = props;
  const isLink = variant === 'link';
  const themeColor = theme || color;

  invariant(!theme, 'Button: The theme prop has been deprecated. Please use color instead.');
  invariant(!inverse, 'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.');
  (!icon || !_.isEmpty(children)) && invariant(!round, 'Button: round can only be used with an icon and no children.');
  icon && invariant(!_.isEmpty(children) || rest['aria-label'], 'Button: an aria-label is required on icon buttons.');
  isLink &&
    invariant(
      color === 'default' && size !== 'large',
      'Button: buttons with the "link" variant do not inherit size and color properties.'
    );

  const baseClass = 'aui--button';

  const classes = classNames([
    baseClass,
    className,
    {
      [`btn-${size}`]: sizes.includes(size) && !isLink,
      [`btn-${themeColor}`]: colors.includes(themeColor) && !isLink,
      'btn-inverse': inverse || (themeColor === 'default' && _.isEmpty(variant)),
      [`btn-${variant}`]: variants.includes(variant),
      'btn-full-width': fullWidth,
      'btn-round': round && icon && _.isEmpty(children),
      'btn-icon': !_.isEmpty(icon) && _.isEmpty(children),
      'aui--button-anchor': href,
    },
  ]);

  const renderSpinner = () =>
    isLoading ? (
      <div data-testid="button-spinner-wrapper" className="spinner-container">
        <Spinner size={size === 'large' ? 'medium' : 'small'} />
      </div>
    ) : null;

  const anchorProps = href
    ? {
        href: href,
        rel: 'noopener noreferrer',
        target: '_self',
      }
    : { type: 'button' };

  const Component = href && !disabled ? 'a' : 'button';

  return (
    <Component
      data-testid="button-wrapper"
      disabled={isLoading || disabled}
      className={classes}
      {...expandDts(dts)}
      {...anchorProps}
      {...rest}
    >
      {renderSpinner()}
      {
        <>
          {icon && (
            <span className={classNames('aui--button-icon-container', { 'is-loading': isLoading && !round })}>
              {icon}
            </span>
          )}
          {children && (
            <span className={classNames('aui--button-children-container', { 'is-loading': isLoading })}>
              {children}
            </span>
          )}
        </>
      }
    </Component>
  );
};

const colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
const variants = ['solid', 'borderless', 'inverse', 'link'];
const sizes = ['medium', 'large'];

const adslotButtonPropTypes = {
  /**
   * default, primary, secondary, success, danger, warning, info
   **/
  color: PropTypes.oneOf(colors),
  /**
   * solid, borderless, inverse, link
   */
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes),
  round: PropTypes.bool,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  dts: PropTypes.string,
  href: PropTypes.string,
  isLoading: PropTypes.bool,
  /**
   * @deprecated
   * Please use the `color` prop instead.
   */
  theme: PropTypes.string,
  /**
   * @deprecated
   * Please use `variant="inverse"` instead.
   */
  inverse: PropTypes.bool,
};

Button.propTypes = { ...adslotButtonPropTypes };

Button.defaultProps = {
  color: 'default',
};

export default Button;
