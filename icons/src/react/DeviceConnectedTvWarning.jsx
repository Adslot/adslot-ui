import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceConnectedTvWarning = (props) => {
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
        fill="#FFF"
        d="M13.7 2H2.2C1.5 2 1 2.6 1 3.3v8c0 .7.6 1.2 1.2 1.2h11.5c.7 0 1.2-.6 1.2-1.2v-8c.1-.7-.5-1.3-1.2-1.3zm.7 9.3c0 .4-.3.7-.7.7H2.2c-.4 0-.7-.3-.7-.7v-8c0-.4.3-.7.7-.7h11.5c.4 0 .7.3.7.7v8zM11.1 14H4.9c-.2 0-.3-.2-.3-.4s.2-.4.3-.4h6.2c.2 0 .3.2.3.4s-.1.4-.3.4z"
      />
    </svg>
  );
};

SvgDeviceConnectedTvWarning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceConnectedTvWarning.displayName = 'DeviceConnectedTvWarning';
export default SvgDeviceConnectedTvWarning;
