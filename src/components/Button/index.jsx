import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { expandDts, invariant } from '../../utils';
import './styles.css';

export const buttonSharedClasses = ({ size, inverse, variant, fullWidth, round, icon, children, disabled, color }) => ({
  [`aui-${size}`]: sizes.includes(size) && variant !== 'link',
  [`aui-${color}`]: colors.includes(color) && variant !== 'link',
  'aui-inverse': inverse || (color === 'default' && _.isEmpty(variant)),
  [`aui-${variant}`]: variants.includes(variant),
  'aui-full-width': fullWidth,
  'aui-round': round && icon && _.isEmpty(children),
  'aui-icon': !_.isEmpty(icon) && _.isEmpty(children),
  disabled: disabled,
});

const Button = React.forwardRef((props, ref) => {
  const {
    color = 'default',
    size,
    variant,
    round,
    fullWidth,
    icon,
    children,
    className,
    disabled,
    dts,
    isLoading,
    iconPosition = 'left',
    inverse, // deprecated
    theme, // deprecated
    ...rest
  } = props;
  const isLink = variant === 'link' || className?.match(/\b(aui-link)\b/)?.[0];

  // eslint-disable-next-line react/prop-types
  invariant(!props.href, 'Button: should not be used for href links. Use an <Anchor/> instead.');
  invariant(!theme, 'Button: The theme prop has been deprecated. Please use color instead.');
  invariant(!inverse, 'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.');
  invariant(
    !(round && (!icon || !_.isEmpty(children))),
    'Button: round can only be used with an icon and no children.'
  );
  invariant(
    !(icon && _.isEmpty(children) && !rest['aria-label'] && !rest['aria-labelledby']),
    'Button: an aria-label or aria-labelledby is required on icon buttons.'
  );

  invariant(
    !(isLink && (color !== 'default' || size === 'large')),
    `Button: buttons with the "link" variant do not inherit size and color properties.${isLink} ${color} ${size}`
  );

  const baseClass = 'aui--button';

  const classes = classNames([
    baseClass,
    className,
    buttonSharedClasses({ size, inverse, variant, fullWidth, round, icon, children, disabled, color }),
  ]);

  const renderSpinner = () =>
    isLoading ? (
      <div data-testid="button-spinner-wrapper" className="spinner-container">
        <Spinner size={size === 'large' ? 'medium' : 'small'} />
      </div>
    ) : null;
  const renderIcon = () => (
    <span className={classNames('aui-icon-container', { 'is-loading': isLoading && !round })}>{icon}</span>
  );
  return (
    <button
      ref={ref}
      data-testid="button-wrapper"
      type="button"
      {...expandDts(dts)}
      {...rest}
      disabled={isLoading || disabled}
      className={classes}
    >
      {renderSpinner()}
      {
        <>
          {icon && iconPosition === 'left' && renderIcon()}
          {children && (
            <span className={classNames('aui-children-container', { 'is-loading': isLoading })}>{children}</span>
          )}
          {icon && iconPosition === 'right' && renderIcon()}
        </>
      }
    </button>
  );
});

export const colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
export const variants = ['solid', 'borderless', 'inverse', 'link'];
export const sizes = ['medium', 'large'];
export const positions = ['left', 'right'];

Button.propTypes = {
  isLoading: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes),
  iconPosition: PropTypes.oneOf(positions),
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
  round: PropTypes.bool,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.displayName = 'Button';

export default Button;
