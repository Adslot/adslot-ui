import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgArrowUp = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#95c83d"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M9 12.1V7.5h1.7c.1 0 .3-.1.3-.2v-.4L8.4 3.2c-.2-.2-.4-.3-.6-.1 0 0-.1 0-.1.1L5 6.8v.4c.1.1.2.2.4.2h1.7V12c0 .6.4 1 .9 1s1-.4 1-.9z" />
    </svg>
  );
};

SvgArrowUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgArrowUp.displayName = 'ArrowUp';
export default SvgArrowUp;
