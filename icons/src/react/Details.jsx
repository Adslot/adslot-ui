import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDetails = (props) => {
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
      <path d="M14.9 12.3H5.7c-.4 0-.7.3-.7.7 0 .4.3.6.6.6h9.2c.4 0 .6-.3.6-.6.1-.4-.2-.7-.5-.7z" />
      <path d="M14.9 7.4H5.7c-.4 0-.7.3-.7.7 0 .4.3.6.6.6h9.2c.4 0 .6-.3.6-.6.1-.4-.2-.7-.5-.7zM5.7 3.8h9.2c.4 0 .6-.3.6-.6s-.3-.6-.6-.6H5.7c-.4-.1-.7.2-.7.5 0 .4.3.7.7.7zM2.7 1.7H1.1c-.3 0-.6.3-.6.7V4c0 .4.3.6.6.6h1.6c.4 0 .6-.3.6-.6V2.4c0-.4-.2-.7-.6-.7zM2.7 6.6H1.1c-.4 0-.6.3-.6.6v1.6c0 .4.3.6.6.6h1.6c.4 0 .6-.3.6-.6V7.3c0-.4-.2-.7-.6-.7zM2.7 11.6H1.1c-.4 0-.6.3-.6.6v1.5c0 .4.3.6.6.6h1.6c.4 0 .6-.3.6-.6v-1.6c0-.3-.2-.5-.6-.5z" />
    </svg>
  );
};

SvgDetails.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDetails.displayName = 'Details';
export default SvgDetails;
