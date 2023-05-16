import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgUpload = (props) => {
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
      <path d="M7.7 1.7c.1-.1.2-.2.3-.2.1 0 .2.1.3.2l2.5 3.5c.1.1.1.3 0 .4 0 .1-.1.2-.3.2H8.9v4.6c0 .5-.4.9-.9.9s-.9-.4-.9-.9V5.8H5.5c-.2 0-.3-.1-.4-.2-.1-.1-.1-.3 0-.4l2.6-3.5Zm6.5 6.8c-.4 0-.8.3-.8.8V13H2.6V9.3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v4.4c0 .4.3.8.8.8h12.4c.4 0 .8-.3.8-.8V9.3c0-.4-.3-.8-.8-.8Z" />
    </svg>
  );
};

SvgUpload.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgUpload.displayName = 'Upload';
export default SvgUpload;
