import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceDesktopWarning = (props) => {
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
        d="M2.4 10.6c.2 0 .3-.1.3-.3V3.7c0-.1.1-.1.1-.1h10.3c.1 0 .1.1.1.1v6.6c0 .2.1.3.3.3s.3-.1.3-.3V3.7c0-.4-.3-.7-.7-.7H2.8c-.4 0-.7.4-.7.7v6.6c0 .2.1.3.3.3zM14.7 11.2h-6c-.2 0-.3.1-.3.3v.1h-.9v-.2c0-.2-.1-.3-.3-.3h-6c-.2 0-.3.1-.3.3v.7c.1.5.4.9.8.9h12.5c.4 0 .8-.3.8-.8v-.7c-.1-.2-.2-.3-.3-.3zm-.3 1c0 .1-.1.2-.2.2H1.7c-.1 0-.2-.1-.2-.2v-.4H7c0 .2.2.4.5.4h.9c.3 0 .5-.2.5-.4h5.4v.4h.1z"
      />
    </svg>
  );
};

SvgDeviceDesktopWarning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceDesktopWarning.displayName = 'DeviceDesktopWarning';
export default SvgDeviceDesktopWarning;
