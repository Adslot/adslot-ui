import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDuplicate = (props) => {
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
        fill={color}
        d="m14.2 3.9-3-3.3c-.1-.1-.2-.1-.3-.1h-5c-.7 0-1.3.6-1.3 1.3v.6h.9v-.6c0-.2.2-.4.4-.4h4.5v3.2c0 .1.1.2.2.2h2.7v7c0 .2-.2.4-.4.4h-1.2v.9H13c.7 0 1.3-.6 1.3-1.3V4.2c0-.1 0-.2-.1-.3zm-3.3-2.2 2.5 2.7h-2.5V1.7z"
      />
      <path
        fill={color}
        d="M8.3 3c-.1-.1-.3-.1-.4-.1H3c-.7 0-1.3.6-1.3 1.3v10c0 .7.6 1.3 1.3 1.3h7.1c.7 0 1.3-.6 1.3-1.3V6.6c0-.1 0-.2-.1-.3L8.3 3zm2 3.6H8.2V4.3l2.1 2.3zm-.2 8H3c-.2 0-.4-.2-.4-.4v-10c0-.2.2-.4.4-.4h4.7v2.9c.1.2.2.3.3.3h2.5v7.2c0 .2-.2.4-.4.4z"
      />
    </svg>
  );
};

SvgDuplicate.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDuplicate.displayName = 'Duplicate';
export default SvgDuplicate;
