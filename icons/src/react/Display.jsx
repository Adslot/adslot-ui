import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDisplay = (props) => {
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
      <path fill="none" d="M1 1h14v14H1z" />
      <g fill="#5d5e5f">
        <path d="M14.7 1.6H1.3c-.2 0-.3.1-.3.3v12.2c0 .2.1.3.3.3h13.4c.2 0 .3-.1.3-.3V1.9c0-.2-.1-.3-.3-.3zm-.3.6v1.2H1.6V2.2h12.8zM1.6 13.8V3.9h12.8v9.9H1.6z" />
        <path d="M4.2 5.7H3c-.1 0-.3.1-.3.3v6.4c0 .2.1.3.3.3h1.2c.2 0 .3-.1.3-.3V6c0-.2-.2-.3-.3-.3zm-.3 6.4h-.6V6.3h.6v5.8zm9-6.4h-1.2c-.2 0-.3.1-.3.3v6.4c0 .2.1.3.3.3h1.2c.2 0 .3-.1.3-.3V6c0-.2-.1-.3-.3-.3zm-.3 6.4H12V6.3h.6v5.8zM10 5.7H5.9c-.1 0-.3.1-.3.3v6.4c0 .2.1.3.3.3H10c.2 0 .3-.1.3-.3V6c0-.2-.1-.3-.3-.3zm-.3 6.4H6.2V6.3h3.5v5.8z" />
      </g>
    </svg>
  );
};

SvgDisplay.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDisplay.displayName = 'Display';
export default SvgDisplay;
