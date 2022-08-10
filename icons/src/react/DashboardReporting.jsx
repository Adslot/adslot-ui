import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDashboardReporting = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17.22 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <rect fill="#51a9c8" x={2.06} y={7.78} width={3.12} height={5.68} rx={0.84} ry={0.84} />
      <rect fill="#51a9c8" y={14.58} width={17.22} height={1.42} rx={0.69} ry={0.69} />
      <path
        fill="#51a9c8"
        d="M7.73 9.84a.83.83 0 0 0-.84.83v1.95a.83.83 0 0 0 .84.83h1.44a.83.83 0 0 0 .84-.83v-1.95a.83.83 0 0 0-.84-.83zM14 5.37h-1.44a.84.84 0 0 0-.84.83v6.42a.84.84 0 0 0 .84.83H14a.83.83 0 0 0 .83-.83V6.2a.83.83 0 0 0-.83-.83zM1.81 5.87l1.77-1.71 4.65 2.49a.32.32 0 0 0 .16 0 .36.36 0 0 0 .23-.08l5.31-4.68.52.52h.05a.2.2 0 0 0 .14-.08.52.52 0 0 0 .1-.18l.76-2a.12.12 0 0 0 0-.13h-.14l-2.11.77a.35.35 0 0 0-.12.07c-.05.05-.1.13-.07.19v.05l.34.34-5.05 4.49-4.66-2.49a.33.33 0 0 0-.4.05l-2 1.89a.34.34 0 0 0 0 .48.35.35 0 0 0 .52.01z"
      />
    </svg>
  );
};

SvgDashboardReporting.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDashboardReporting.displayName = 'DashboardReporting';
export default SvgDashboardReporting;
