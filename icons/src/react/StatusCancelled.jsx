import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusCancelled = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#5a5a5a"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle cx={8} cy={8} r={7} />
      <path
        d="m6.07 6.07 3.86 3.86m0-3.86L6.07 9.93"
        stroke="#fff"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        fill="none"
      />
    </svg>
  );
};

SvgStatusCancelled.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusCancelled.displayName = 'StatusCancelled';
export default SvgStatusCancelled;
