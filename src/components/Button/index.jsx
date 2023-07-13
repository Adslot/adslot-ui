import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { expandDts } from '../../utils';
import invariant from '../../invariant';
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

/**
 * Use buttons to trigger actions, drive direction, accomplish tasks or to link. Buttons assist the user to complete tasks confidently and to feel secure about the next action they are taking.
 */
const Button = ({
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
  inverse, // deprecated
  theme, // deprecated
  ...rest
}) => {
  const isLink = variant === 'link' || className?.match(/\b(aui-link)\b/)?.[0];

  invariant(!rest.href, 'Button: should not be used for href links. Use an <Anchor/> instead.');
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
    `Button: buttons with the "link" variant do not inherit size and color properties.`
  );

  const renderSpinner = () =>
    isLoading ? (
      <div data-testid="button-spinner-wrapper" className="spinner-container">
        <Spinner size={size === 'large' ? 'medium' : 'small'} />
      </div>
    ) : null;

  return (
    <button
      data-testid="button-wrapper"
      type="button"
      {...expandDts(dts)}
      {...rest}
      disabled={isLoading || disabled}
      className={classNames(
        'aui--button',
        className,
        buttonSharedClasses({ size, inverse, variant, fullWidth, round, icon, children, disabled, color })
      )}
    >
      {renderSpinner()}
      {icon && <span className={classNames('aui-icon-container', { 'is-loading': isLoading && !round })}>{icon}</span>}
      {children && (
        <span className={classNames('aui-children-container', { 'is-loading': isLoading })}>{children}</span>
      )}
    </button>
  );
};

export const colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
export const variants = ['solid', 'borderless', 'inverse', 'link'];
export const sizes = ['medium', 'large'];

Button.propTypes = {
  /**
   * Controls the main display mode for the button.
   */
  variant: PropTypes.oneOf(variants),
  /**
   * Controls the main color for the button.
   */
  color: PropTypes.oneOf(colors),
  /**
   * Controls the size for the button.
   */
  size: PropTypes.oneOf(sizes),
  /**
   * Controls if the button should render a spinner.
   * When set to true, the button will be disabled as well.
   */
  isLoading: PropTypes.bool,
  /**
   * Controls if the button is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Controls if the button should expand to its closet container
   */
  fullWidth: PropTypes.bool,
  /**
   * Controls if the button should be circular.
   * Only allowed when the button has no `children` and `icon` is given.
   */
  round: PropTypes.bool,
  /**
   * Controls the icon to be displayed for the button.
   */
  icon: PropTypes.node,
  /**
   * Controls the main content to be displayed within the button.
   * When both children and icon are given, icon will be on the left.
   */
  children: PropTypes.node,
  /**
   * Adds additional class names to the button
   */
  className: PropTypes.string,
  /**
   * Adds `data-test-selector` to the button
   */
  dts: PropTypes.string,
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

export default Button;
