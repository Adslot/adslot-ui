import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductDetails = (props) => {
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
      <g fill="#5a5a5a">
        <path d="M11.6 2.2H10v-.9c0-.2-.1-.3-.2-.3-.2 0-.3.1-.3.3v.9H8.3v-.9c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3v.9H6.5v-.9c0-.2-.1-.3-.3-.3-.1 0-.2.1-.2.3v.9H4.4c-.9 0-1.7.8-1.7 1.7v9.5c0 .9.7 1.7 1.7 1.7h7.2c.9 0 1.7-.8 1.7-1.7V3.8c0-.9-.8-1.6-1.7-1.6zm1.1 11.1c0 .6-.5 1.1-1.1 1.1H4.4c-.6 0-1.1-.5-1.1-1.1V3.8c0-.6.5-1.1 1.1-1.1H6V3c0 .2.1.3.3.3.2 0 .3-.1.3-.3v-.3h1.2V3c0 .2.1.3.3.3.2 0 .3-.1.3-.3v-.3h1.2V3c0 .2.1.3.3.3 0 0 .1-.1.1-.3v-.3h1.5c.6 0 1.1.5 1.1 1.1v9.5z" />
        <path d="M10.6 5.7H5.4c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h5.2c.2 0 .3-.1.3-.3 0-.2-.2-.3-.3-.3zm0 2.3H5.4c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h5.2c.2 0 .3-.1.3-.3 0-.2-.2-.3-.3-.3zm0 2.3H5.4c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h5.2c.2 0 .3-.1.3-.3 0-.1-.2-.3-.3-.3z" />
      </g>
    </svg>
  );
};

SvgProductDetails.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductDetails.displayName = 'ProductDetails';
export default SvgProductDetails;
