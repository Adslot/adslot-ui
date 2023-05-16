import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgClassification = (props) => {
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
      <g fill="#5a5a5a">
        <path d="M7.8 9h.4L15 5c.1-.1.2-.2.2-.3 0-.1-.1-.2-.2-.3L8.1.8h-.3L1 4.5c-.1.1-.1.2-.1.3-.1.1 0 .2.1.3L7.8 9zM8 1.5l6.2 3.3L8 8.4 1.8 4.8 8 1.5z" />
        <path d="M13.3 6.7c-.1-.1-.3 0-.4.1-.1.1 0 .3.1.4l1.2.8L8 11.6 1.8 8 3 7.2c.2-.1.2-.2.1-.4-.1-.1-.2-.2-.4-.1L1 7.7c-.1 0-.1.1-.1.3 0 .1.1.2.2.3l6.8 4h.4l6.8-4c.1-.1.2-.2.2-.3 0-.1-.1-.2-.2-.3l-1.8-1z" />
        <path d="M13.3 10c-.1-.1-.3 0-.4.1-.1.1 0 .3.1.4l1.2.7L8 14.8l-6.2-3.6 1.2-.7c.1-.1.2-.3.1-.4-.1-.2-.2-.2-.4-.1L1 11c-.1.1-.2.2-.2.3 0 .1.1.2.2.3l6.8 4h.4l6.8-4c.1-.1.2-.2.2-.3 0-.1-.1-.2-.2-.3l-1.7-1zM8.6 2.7c-.1-.1-.3-.2-.4-.1L4.6 4.5c-.2.1-.2.3-.1.4.1.1.2.2.3.2h.1l3.6-1.9c.1-.1.2-.3.1-.5zm1.6.9c-.1-.2-.3-.2-.4-.1l-3.6 2c-.2 0-.3.2-.2.4.1.1.2.1.3.1h.1L10 4c.2-.1.3-.2.2-.4zM9.7 6c.2-.1.2-.3.1-.4-.1-.2-.3-.2-.4-.1l-1.7.8c-.1.1-.2.3-.1.5.1.1.2.2.3.2H8l1.7-1z" />
      </g>
    </svg>
  );
};

SvgClassification.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgClassification.displayName = 'Classification';
export default SvgClassification;
