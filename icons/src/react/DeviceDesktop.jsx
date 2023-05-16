import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceDesktop = (props) => {
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
      <path d="M14.2 11.8V3.5c0-.3-.2-.6-.5-.6H2.2c-.3 0-.5.3-.5.6v8.3H0v.7c0 .3.2.6.5.6h15c.3 0 .5-.3.5-.6v-.7h-1.8zm-5.1.2H6.9v-.4H9v.4zm4.1-.9H2.8v-7h10.4v7z" />
    </svg>
  );
};

SvgDeviceDesktop.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceDesktop.displayName = 'DeviceDesktop';
export default SvgDeviceDesktop;
