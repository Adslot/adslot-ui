import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgHighImpactInverse = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path
        d="M10.2 8.9c-.1-.1-.2-.1-.3-.1H8.7l2.8-4.9c.1-.1.1-.3 0-.4-.1-.1-.2-.2-.3-.2H9.9l1-2.5V.4c-.1-.1-.2-.2-.3-.2H6.7c-.1 0-.3.1-.3.2L4.5 5.9v.4c.1.1.2.2.3.2H6l-1.5 4.9v.4c.1.1.2.2.3.2h1.8v3.6c0 .2.1.3.3.4H7c.1 0 .2-.1.3-.2l2.9-6.3v-.6zm-2.9 5v-2.4c0-.2-.2-.4-.3-.4H5.4l1.5-4.9v-.4c-.1-.1-.2-.2-.3-.2H5.4L6.9 1h3.2l-1 2.5v.4c0 .1.2.2.3.2h1.2L7.7 8.9c-.1.1-.1.3 0 .4.1.2.2.2.3.2h1.3l-2 4.4z"
        fill="#fff"
      />
    </svg>
  );
};

SvgHighImpactInverse.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgHighImpactInverse.displayName = 'HighImpactInverse';
export default SvgHighImpactInverse;
