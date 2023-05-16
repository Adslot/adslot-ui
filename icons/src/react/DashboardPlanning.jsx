import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDashboardPlanning = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12.97 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#51a9c8"
        d="M10.71 4.59h.83a.16.16 0 0 0 .1 0l.9-.91a.21.21 0 0 0 .06-.1.12.12 0 0 0 0-.09l-1.08-1.11h-.09a.21.21 0 0 0-.1.06l-.9.9a.27.27 0 0 0-.06.1v.91a6.45 6.45 0 0 0-2.94-1.26V1.72H8a.15.15 0 0 0 .11 0 .1.1 0 0 0 .05-.08V.11A.1.1 0 0 0 8.08 0 .2.2 0 0 0 8 0H5a.2.2 0 0 0-.11 0 .1.1 0 0 0 0 .08V1.6a.1.1 0 0 0 0 .08.21.21 0 0 0 .11 0h.54v1.41a6.49 6.49 0 1 0 5.17 1.5zM6.48 15A5.49 5.49 0 1 1 12 9.51 5.49 5.49 0 0 1 6.48 15z"
      />
      <path fill="#51a9c8" d="M9.1 6.32 6.17 9.25a.4.4 0 1 0 .56.56l2.93-2.93a.4.4 0 0 0-.56-.56z" />
    </svg>
  );
};

SvgDashboardPlanning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDashboardPlanning.displayName = 'DashboardPlanning';
export default SvgDashboardPlanning;
