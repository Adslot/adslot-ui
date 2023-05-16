import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceMobile = (props) => {
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
      <path d="M10.1 3H5.9c-.4 0-.8.3-.8.7v8.6c0 .4.3.7.7.7H10c.4 0 .7-.3.7-.7V3.7c.2-.4-.2-.7-.6-.7zm-2.6.6h1v.3h-1v-.3zm.5 9.1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5zm2.3-1.3H5.7V4.6h4.6v6.8z" />
    </svg>
  );
};

SvgDeviceMobile.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceMobile.displayName = 'DeviceMobile';
export default SvgDeviceMobile;
