import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSponsorshipPackage = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill={color}
        d="M3.4 10.2h1.2c.2 0 .3-.1.3-.3s-.2-.3-.3-.3H3.4c-.2 0-.3.1-.3.3s.1.3.3.3zm3.4.6H3.4c-.2 0-.3.1-.3.3s.1.3.3.3h3.5c.2 0 .3-.1.3-.3s-.2-.3-.4-.3zm0 1.2H3.4c-.2 0-.3.1-.3.3s.1.3.3.3h3.5c.2 0 .3-.1.3-.3S7 12 6.8 12z"
      />
      <path
        fill={color}
        d="m15.2 4.7-2-3.4c-.1-.2-.2-.3-.4-.3H3.2c-.2 0-.3.1-.4.3l-2 3.4v.1c0 .1-.1.1-.1.2v9.5c0 .3.2.5.5.5h13.6c.3 0 .5-.2.5-.5V5c0-.1 0-.2-.1-.3zm-.9 9.3H1.7V5.5H6v-1H2.1L3.5 2h3.6l-.5 2.5v4.2h2.8V4.5L9 2h3.5l1.4 2.4h-3.8v1h4.2V14z"
      />
    </svg>
  );
};

SvgSponsorshipPackage.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSponsorshipPackage.displayName = 'SponsorshipPackage';
export default SvgSponsorshipPackage;
