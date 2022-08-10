import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSite = (props) => {
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
        fill="#5a5a5a"
        d="M8.1.7C4 .7.8 4 .8 8s3.3 7.3 7.3 7.3S15.4 12 15.4 8 12.1.7 8.1.7zM9 14.2c-.2 0-.4 0-.6.1v-2.8h2.3c-.4 1.2-1 2.2-1.7 2.7zm-3.5-2.7h2.3v2.8c-.2 0-.4 0-.6-.1-.7-.5-1.3-1.4-1.7-2.7zM1.8 8.3h2.5c0 .9.1 1.8.3 2.5H2.5c-.4-.7-.6-1.6-.7-2.5zm5.4-6.5c.2 0 .4 0 .6-.1v2.8H5.5c.4-1.2 1-2.2 1.7-2.7zm3.5 2.8H8.4V1.8c.2 0 .4 0 .6.1.7.4 1.3 1.4 1.7 2.7zm.2.6c.1.8.2 1.6.3 2.5H8.4V5.2h2.5zm-3.1 0v2.5H5c0-.9.1-1.7.3-2.5h2.5zM4.4 7.7H1.8c0-.9.3-1.7.7-2.5h2.2c-.2.8-.3 1.6-.3 2.5zm.6.6h2.8v2.5H5.3c-.2-.7-.3-1.6-.3-2.5zm3.4 2.5V8.3h2.8c0 .9-.1 1.8-.3 2.5H8.4zm3.4-2.5h2.5c0 .9-.3 1.8-.7 2.5h-2.1c.2-.7.3-1.6.3-2.5zm0-.6c0-.9-.1-1.7-.3-2.5h2.1c.4.8.7 1.6.7 2.5h-2.5zm1.5-3.1h-1.9c-.3-1-.7-1.8-1.2-2.5 1.3.5 2.4 1.4 3.1 2.5zM6 2.1c-.5.6-.9 1.5-1.2 2.5h-2c.8-1.1 1.9-2 3.2-2.5zm-3.1 9.4h1.9c.3 1 .7 1.8 1.2 2.4-1.3-.5-2.4-1.3-3.1-2.4zm7.3 2.4c.5-.6.9-1.4 1.2-2.4h1.9c-.8 1.1-1.8 1.9-3.1 2.4z"
      />
    </svg>
  );
};

SvgSite.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSite.displayName = 'Site';
export default SvgSite;
