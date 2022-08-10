import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusUpdated = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill={color}
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="none"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.9 5.4-4.1 5.2-1.7-2"
      />
      <path d="M8 14.7c-3.7 0-6.6-3-6.6-6.7s3-6.6 6.6-6.6 6.7 3 6.7 6.6-3 6.7-6.7 6.7z" fill="#fff" />
      <path
        d="M8 1.7c3.5 0 6.3 2.8 6.3 6.3s-2.8 6.3-6.3 6.3S1.7 11.5 1.7 8 4.5 1.7 8 1.7M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"
        fill="#5a5a5a"
      />
      <path
        d="M4.1 10.1v1.7c0 .1 0 .2.1.3.1.1.2.1.3.1h1.7c.1 0 .2 0 .3-.1l5.8-5.8c.1-.1.1-.4 0-.5L10.6 4c-.1-.1-.4-.1-.5 0L8.9 5.1 4.2 9.8c0 .1-.1.2-.1.3zm6.2-5.4 1.2 1.2-.7.7-1.1-1.2.6-.7zm-5.4 5.5 4.3-4.3 1.2 1.2L6 11.4H4.8l.1-1.2zm0 0"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgStatusUpdated.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusUpdated.displayName = 'StatusUpdated';
export default SvgStatusUpdated;
