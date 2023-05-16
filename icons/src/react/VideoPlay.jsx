import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgVideoPlay = (props) => {
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
      <path d="M14.3 4.9v-.2c-.2-.5-.6-.8-1.2-.8h.1s-2.2-.3-5.1-.3c-2.9 0-5.1.3-5.1.3-.5 0-1 .4-1.2.8v.2c-.2.6-.3 1.7-.3 3.1 0 1.4.1 2.5.2 3.1v.2c.2.5.6.8 1.2.8 0 0 2.2.3 5.1.3 2.9 0 5.1-.3 5.1-.3H13c.5 0 1-.4 1.2-.8v-.2c.1-.6.2-1.7.2-3.1.1-1.4 0-2.5-.1-3.1zM9.9 8.3l-2.6 1.9c-.1 0-.1.1-.2.1H7c-.1-.1-.2-.3-.2-.4V6.1c0-.1.1-.2.2-.3.1-.1.2 0 .3 0l2.6 1.9c.1.1.2.2.2.3 0 .1-.1.2-.2.3z" />
    </svg>
  );
};

SvgVideoPlay.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgVideoPlay.displayName = 'VideoPlay';
export default SvgVideoPlay;
