import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts, invariant } from '../../lib/utils';
import { buttonSharedPropTypes, buttonSharedClasses } from '../Button';
import { colors } from '../Button';
import { variants } from '../Button';
import { sizes } from '../Button';

const Anchor = (props) => {
  const {
    href,
    color = 'default',
    variant,
    size,
    round,
    fullWidth,
    icon,
    children,
    className,
    disabled,
    dts,
    ...rest
  } = props;
  const isLink = variant === 'link' || className?.match(/\b(btn-link)\b/)?.[0];

  invariant(href, 'Anchor: should not be used without href. Use <Button/> for onClick-only actions.');
  invariant(
    !(round && (!icon || !_.isEmpty(children))),
    'Anchor: round can only be used with an icon and no children.'
  );
  invariant(
    !(icon && _.isEmpty(children) && !rest['aria-label'] && !rest['aria-labelledby']),
    'Anchor: an aria-label or aria-labelledby is required on icon anchors.'
  );
  invariant(
    !(isLink && (color !== 'default' || size === 'large')),
    'Anchor: anchors with the "link" variant do not inherit size and color properties.'
  );

  const baseClass = 'aui--anchor';

  const classes = classNames([
    baseClass,
    className,
    buttonSharedClasses({ size, variant, fullWidth, round, icon, children, disabled, color }),
  ]);

  return (
    <a
      data-testid="anchor-wrapper"
      href={disabled ? undefined : href}
      className={classes}
      {...expandDts(dts)}
      {...rest}
    >
      {
        <>
          {icon && <span className="aui-icon-container">{icon}</span>}
          {children && <span className="aui-children-container">{children}</span>}
        </>
      }
    </a>
  );
};

Anchor.propTypes = {
  color: PropTypes.oneOf(colors),
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes),
  ...buttonSharedPropTypes,
  href: PropTypes.string.isRequired,
};

export default Anchor;