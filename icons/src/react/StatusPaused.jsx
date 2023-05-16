import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusPaused = (props) => {
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
        d="M6.25 5.99v4.02m3.5-4.02v4.02"
        stroke="#fff"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        fill="none"
      />
    </svg>
  );
};

SvgStatusPaused.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusPaused.displayName = 'StatusPaused';
export default SvgStatusPaused;
