import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceTablet = (props) => {
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
      <path d="M11.5 3h-7c-.2 0-.4.1-.4.3v9.3c0 .2.2.4.4.4h7c.2 0 .4-.2.4-.4V3.3c0-.2-.2-.3-.4-.3zM8 12.9c-.1 0-.2-.1-.2-.2s.1-.2.2-.2.2.1.2.2-.1.2-.2.2zm3.2-.7H4.8V3.8h6.3v8.4z" />
    </svg>
  );
};

SvgDeviceTablet.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceTablet.displayName = 'DeviceTablet';
export default SvgDeviceTablet;
