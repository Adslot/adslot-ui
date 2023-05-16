import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBarChart = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 55"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        stroke="#76c8b3"
        strokeMiterlimit={10}
        strokeWidth={3}
        d="M1.5 0v21.26M6.89 4.86v16.4M12.28 8.85v12.41M17.68 1.12v20.14"
      />
    </svg>
  );
};

SvgBarChart.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBarChart.displayName = 'BarChart';
export default SvgBarChart;
