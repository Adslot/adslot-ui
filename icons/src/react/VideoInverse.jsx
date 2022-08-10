import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgVideoInverse = (props) => {
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
      <path d="M0 0h16v16H0z" fill="none" />
      <path d="M1 1h14v14H1z" fill="none" />
      <path
        d="M7.8 5.9c-.1-.1-.3-.1-.4-.1-.3 0-.6.2-.6.5v3.4c0 .3.3.6.6.6.1 0 .2 0 .3-.1L10 8.5c.1-.1.2-.3.2-.5s-.1-.4-.2-.5L7.8 5.9zm-.4 3.8V6.4L9.7 8 7.4 9.7z"
        fill="#fff"
      />
      <path
        d="M13.8 3.5c-.5-.3-1.5-.6-5.8-.6-4.6 0-5.3.4-5.6.6C1.2 4.2 1 7.2 1 8.1c0 1.1.2 3.7 1.4 4.5.3.2.9.6 5.6.6 4.3 0 5.4-.4 5.8-.7 1.1-.8 1.2-3.1 1.2-4.4 0-1.1-.1-3.8-1.2-4.6zm-.4 8.5c-.5.4-2.3.5-5.4.5-2 0-4.6-.1-5.3-.5-.8-.5-1.1-2.4-1.1-4 0-1.7.4-3.6 1.1-4 .7-.4 3.2-.5 5.3-.5 3.1 0 4.9.2 5.4.6.7.5 1 2.5 1 4 0 2-.4 3.4-1 3.9z"
        fill="#fff"
      />
    </svg>
  );
};

SvgVideoInverse.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgVideoInverse.displayName = 'VideoInverse';
export default SvgVideoInverse;
