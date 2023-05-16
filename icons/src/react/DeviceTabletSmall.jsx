import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeviceTabletSmall = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M1 1h14v14H1z" />
      <g fill="#5a5a5a">
        <path d="M12.9 1H3.1c-.5 0-1 .4-1 .8v12.3c0 .5.4.8.9.8h9.8c.5 0 .9-.4.9-.8V1.8c.1-.4-.3-.8-.8-.8zm.3 13.2c0 .1-.1.3-.3.3H3.1c-.2 0-.3-.1-.3-.3V1.8c0-.1.1-.3.3-.3h9.8c.2 0 .3.1.3.3v12.4z" />
        <path d="M12.4 2.2H3.6c-.2 0-.3.1-.3.3V13c0 .2.1.3.3.3h8.7c.2 0 .3-.1.3-.3V2.5c0-.2-.1-.3-.2-.3zm-.3 10.5H3.9V2.8h8.2v9.9zm-4.3.9c-.1.1-.1.1-.1.2s0 .2.1.2c.1.1.1.1.2.1s.2 0 .2-.1c.1-.1.1-.1.1-.2s0-.2-.1-.2c-.1-.1-.3-.1-.4 0z" />
      </g>
    </svg>
  );
};

SvgDeviceTabletSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeviceTabletSmall.displayName = 'DeviceTabletSmall';
export default SvgDeviceTabletSmall;
