import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgArrowDown = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#da4f49"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M7.07 3.93v4.61H5.34a.42.42 0 0 0-.34.22.58.58 0 0 0 0 .18.4.4 0 0 0 0 .23l2.66 3.67a.4.4 0 0 0 .64 0L11 9.17a.4.4 0 0 0 0-.41.42.42 0 0 0-.36-.22H8.93V3.93a.93.93 0 1 0-1.86 0z" />
    </svg>
  );
};

SvgArrowDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgArrowDown.displayName = 'ArrowDown';
export default SvgArrowDown;
