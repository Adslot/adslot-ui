import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgGlobe = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#5a5a5a"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm.9 12.9c-.2 0-.4 0-.6.1v-2.7h2.2c-.4 1.3-1 2.2-1.6 2.6zm-3.4-2.6h2.2V14c-.2 0-.4 0-.5-.1-.7-.4-1.3-1.3-1.7-2.6zM2 8.3h2.4c0 .9.1 1.7.3 2.4h-2C2.3 10 2 9.2 2 8.3zm5.2-6.2c.1-.1.3-.1.5-.1v2.7H5.5c.4-1.2 1-2.2 1.7-2.6zm3.3 2.6H8.3V2c.2 0 .4 0 .6.1.7.4 1.2 1.4 1.6 2.6zm.2.6c.2.7.3 1.6.3 2.4H8.3V5.3h2.4zm-3 0v2.4H5c0-.8.1-1.7.3-2.4h2.4zM4.4 7.7H2c0-.9.3-1.7.6-2.4h2.1c-.2.7-.2 1.6-.3 2.4zm.6.6h2.7v2.4H5.3c-.1-.7-.2-1.5-.3-2.4zm3.3 2.4V8.3H11c0 .9-.1 1.7-.3 2.4H8.3zm3.3-2.4H14c0 .9-.3 1.7-.7 2.4h-2c.2-.7.3-1.5.3-2.4zm0-.6c0-.8-.1-1.7-.3-2.4h2.1c.3.7.6 1.5.6 2.4h-2.4zm1.4-3h-1.9c-.3-1-.7-1.8-1.1-2.4 1.3.5 2.3 1.3 3 2.4zM6 2.3c-.5.6-.9 1.5-1.1 2.4H3c.7-1.1 1.7-1.9 3-2.4zm-3 9h1.9c.3.9.7 1.7 1.1 2.3-1.2-.4-2.3-1.2-3-2.3zm7 2.3c.5-.6.8-1.4 1.1-2.3H13c-.7 1.1-1.7 1.9-3 2.3z" />
    </svg>
  );
};

SvgGlobe.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgGlobe.displayName = 'Globe';
export default SvgGlobe;
