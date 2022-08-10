import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgExpandArrows = (props) => {
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
        d="M.6 15.3c.1.1.2.1.4.1l4.7-.7c.1 0 .2-.1.2-.1l.1-.1v-.1c0-.1 0-.3-.1-.4l-1.3-1.3 2.5-2.4c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-2.5 2.4-.6-.6L2 10s-.1 0-.1-.1h-.3c-.1 0-.3.2-.3.3l-.7 4.7c-.1.2-.1.3 0 .4zM15.4.6c-.1-.1-.2-.1-.4-.1l-4.7.7c-.1 0-.2.1-.2.1l-.1.1v.1c0 .1 0 .3.1.4l1.3 1.3-2.5 2.4c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l2.5-2.4.6.6.6.7s.1 0 .1.1h.3c.1 0 .3-.2.3-.3l.8-4.7c0-.1 0-.3-.1-.4z"
        fill={color}
      />
    </svg>
  );
};

SvgExpandArrows.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgExpandArrows.displayName = 'ExpandArrows';
export default SvgExpandArrows;
