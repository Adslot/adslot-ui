import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingGeoEmpty = (props) => {
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
      <path fill="#49AECB" d="M2 2.7V12L7.3 2H2.7c-.3 0-.7.3-.7.7z" />
      <path fill="#00B7E4" d="M2.7 14H12L5.4 8.8" />
      <path fill="#0192B9" d="M9 2 5.9 7.8l7.8 5.9s.4-.3.4-.5V2.7c0-.4-.3-.7-.7-.7H9z" />
      <path fill="#BCE5F1" d="M5.9 7.8 9 2H7.3L2 12v1.2c0 .5.7.8.7.8l2.7-5.2L12 14h1.1c.3 0 .6-.3.6-.3" />
      <path fill="#FFF" d="M10.8 6.1c0 .8-1.5 3.6-1.5 3.6S7.8 6.9 7.8 6.1s.6-1.5 1.5-1.5 1.5.6 1.5 1.5z" />
      <circle fill="#00B7E4" cx={9.3} cy={6.1} r={0.6} />
    </svg>
  );
};

SvgTargetingGeoEmpty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingGeoEmpty.displayName = 'TargetingGeoEmpty';
export default SvgTargetingGeoEmpty;
