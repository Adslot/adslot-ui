import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceConsoleWarning = (props) => {
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
        fill="#5D5E5F"
        d="M12 4.1H4.4C2.5 4.1 1 5.7 1 7.6c0 1.3 0 4.3 2.3 4.3 1.2 0 3.1-1.3 3.9-3h1.9c.8 1.6 2.7 3 3.9 3 2.3 0 2.3-3 2.3-4.3.1-1.9-1.4-3.5-3.3-3.5zm1.1 7.2c-.9 0-2.8-1.2-3.4-2.8 0-.1-.2-.2-.3-.2H7c-.1 0-.2.1-.3.2-.6 1.5-2.5 2.8-3.4 2.8-1.5 0-1.7-1.9-1.7-3.7 0-1.6 1.2-2.9 2.8-2.9H12c1.5 0 2.8 1.3 2.8 2.9 0 1.8-.2 3.7-1.7 3.7z"
      />
      <path
        fill="#5D5E5F"
        d="M4.3 5.9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5c-.1-.8-.7-1.5-1.5-1.5zm0 2.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9c-.1.5-.5.9-.9.9zM13.2 7.1h-.9v-.9c0-.2-.1-.3-.3-.3s-.3.1-.3.3v.9h-.9c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h.9v.9c0 .2.1.3.3.3s.3-.1.3-.3v-.9h.9c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3z"
      />
    </svg>
  );
};

SvgDeviceConsoleWarning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceConsoleWarning.displayName = 'DeviceConsoleWarning';
export default SvgDeviceConsoleWarning;
