import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMagnifyingGlassMediaSchedule = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#4794ae"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle cx={6.1} cy={6.2} r={5.1} />
      <circle fill="#B1D3F0" cx={6.1} cy={6.2} r={4.1} />
      <path
        opacity={0.8}
        d="M14.7 13.2 12 10.5l-.4.4L10 9.4c-.2.3-.4.5-.7.7l1.6 1.5-.4.4 2.7 2.7c.4.4 1 .4 1.4 0 .5-.5.5-1.1.1-1.5z"
      />
    </svg>
  );
};

SvgMagnifyingGlassMediaSchedule.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMagnifyingGlassMediaSchedule.displayName = 'MagnifyingGlassMediaSchedule';
export default SvgMagnifyingGlassMediaSchedule;
