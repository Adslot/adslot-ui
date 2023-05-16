import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDeliveryReporting = (props) => {
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
        fill="#231F20"
        d="M13.1 6.2 10.3 10c.2.1.5.3.6.5l2.8-3.7c-.2-.3-.4-.4-.6-.6zM6.5 6.2c-.2.2-.4.4-.6.4l2.9 3.7c.2-.2.4-.4.6-.5L6.5 6.2zM4.2 6 2.5 7.4c.3.2.4.4.5.6l1.7-1.5c-.2-.1-.4-.3-.5-.5zM6.2 5.8c.1-.1.1-.3.1-.4 0-.5-.4-.9-.9-.9s-.9.4-.9.9v.3c.1.2.3.5.5.6.1.1.2.1.4.1h.2c.3-.1.5-.3.6-.6zM10.6 10.7c0-.1-.1-.1-.1-.2l-.1-.1-.1-.1c-.1 0-.1 0-.2-.1h-.2c-.1 0-.3 0-.4.1-.1 0-.1.1-.2.1l-.1.1s-.1.1-.1.2c-.1.1-.1.3-.1.4 0 .5.4.9.9.9s.9-.4.9-.9c0-.1-.1-.3-.2-.4zM14.2 4.5c-.5 0-.9.4-.9.9 0 .2 0 .3.1.4.1.2.3.4.6.5h.2c.5 0 .9-.4.9-.9s-.4-.9-.9-.9zM2.2 7.7c-.1-.1-.2-.1-.4-.1-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9"
      />
    </svg>
  );
};

SvgDeliveryReporting.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDeliveryReporting.displayName = 'DeliveryReporting';
export default SvgDeliveryReporting;
