import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgChevronDown = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        d="M5 7.4a.73.73 0 0 1-.52-.22L1.16 3.86a.73.73 0 0 1 0-1 .72.72 0 0 1 1 0L5 5.62l2.8-2.8a.74.74 0 1 1 1 1L5.52 7.18A.74.74 0 0 1 5 7.4z"
        fill="#ababab"
      />
    </svg>
  );
};

SvgChevronDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgChevronDown.displayName = 'ChevronDown';
export default SvgChevronDown;
