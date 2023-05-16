import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTag = (props) => {
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
        d="m15 7.7-3.9-2.5c-.2-.1-.5-.1-.7.2-.1.2-.1.5.2.7l3.2 2-3.2 1.9c-.2.1-.3.4-.2.7.1.2.3.2.4.2.1 0 .2 0 .3-.1L15 8.6c.2-.1.2-.3.2-.4.1-.2 0-.4-.2-.5zM5.5 10.1 2.3 8l3.2-1.9c.2-.1.3-.4.2-.7-.2-.2-.5-.3-.7-.2L1 7.6c-.1.1-.2.2-.2.4s.1.3.2.4l4 2.5c0 .1.1.1.2.1.2 0 .3-.1.4-.2.2-.3.1-.6-.1-.7zM9.4 3.7c-.3-.1-.6.1-.7.4l-2.3 7.5c-.1.3.1.7.4.8H7c.3 0 .5-.2.6-.4l2.3-7.5c0-.4-.2-.7-.5-.8z"
      />
    </svg>
  );
};

SvgTag.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTag.displayName = 'Tag';
export default SvgTag;
