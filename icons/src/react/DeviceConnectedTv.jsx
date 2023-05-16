import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceConnectedTv = (props) => {
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
      <path d="M14.2 1.2H1.8c-.7 0-1.3.6-1.3 1.3v8.6c0 .7.6 1.3 1.3 1.3h12.3c.7 0 1.3-.6 1.3-1.3V2.5c.1-.7-.5-1.3-1.2-1.3zm0 9.9c0 .1 0 .1 0 0l-12.4.1s-.1 0-.1-.1V2.5c0-.1 0-.1.1-.1h12.3s.1 0 .1.1v8.6zm-2.9 2.1H4.7c-.2 0-.4.2-.4.4s.2.4.4.4h6.6c.2 0 .4-.2.4-.4s-.2-.4-.4-.4z" />
    </svg>
  );
};

SvgDeviceConnectedTv.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceConnectedTv.displayName = 'DeviceConnectedTv';
export default SvgDeviceConnectedTv;
