import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdunitSize = (props) => {
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
        d="M14.7 1H1.3c-.2 0-.3.1-.3.3v13.4c0 .2.1.3.3.3h13.4c.2 0 .3-.1.3-.3V1.3c0-.2-.1-.3-.3-.3z"
        fill="#5a5a5a"
      />
      <path
        d="M3.5 12.6h3.3c.2 0 .3-.1.3-.3s-.1-.2-.3-.2H4.3l7.8-7.8v2.5c0 .2.1.3.3.3.2 0 .3-.1.3-.3V3.5c0-.1-.1-.1-.2-.2H9.2c-.2 0-.3.2-.3.3s.1.3.3.3h2.5l-7.8 7.8V9.2c0-.2-.1-.3-.3-.3-.1 0-.3.1-.3.3v3.3c.1.1.1.1.2.1z"
        fill="#fff"
      />
    </svg>
  );
};

SvgAdunitSize.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdunitSize.displayName = 'AdunitSize';
export default SvgAdunitSize;
