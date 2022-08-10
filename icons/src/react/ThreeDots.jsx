import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgThreeDots = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <circle fill={color} cx={13.7} cy={8} r={1.8} />
      <circle fill={color} cx={8} cy={8} r={1.8} />
      <circle fill={color} cx={2.3} cy={8} r={1.8} />
    </svg>
  );
};

SvgThreeDots.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgThreeDots.displayName = 'ThreeDots';
export default SvgThreeDots;
