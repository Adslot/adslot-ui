import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPause = (props) => {
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
        d="M4.8 13.7c-.8 0-1.5-.7-1.5-1.5V3.8c0-.8.7-1.5 1.5-1.5s1.4.7 1.4 1.5v8.4c0 .8-.6 1.5-1.4 1.5zm6.4 0c-.8 0-1.5-.7-1.5-1.5V3.8c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v8.4c.1.8-.6 1.5-1.5 1.5z"
      />
      <path fill="none" d="M0 0h16v16H0z" />
    </svg>
  );
};

SvgPause.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPause.displayName = 'Pause';
export default SvgPause;
