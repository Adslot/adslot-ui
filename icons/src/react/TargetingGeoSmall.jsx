import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingGeoSmall = (props) => {
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
      <path fill="none" d="M1 1h14v14H1z" />
      <path
        d="M9.9 12.1c-.2 0-.3.1-.4.2 0 .2.1.3.2.3 1.2.2 1.6.6 1.6.8 0 .4-1.3.9-3.4.9-2 0-3.4-.6-3.4-.9 0-.2.4-.6 1.6-.8.2 0 .3-.2.2-.3 0-.2-.2-.3-.4-.2-1.1.2-1.9.7-1.9 1.4 0 1 2 1.5 4 1.5s4-.5 4-1.5c0-.6-.8-1.1-2.1-1.4z"
        fill="#5a5a5a"
      />
      <g fill="#5a5a5a">
        <path d="M8 1C5.6 1 3.6 2.9 3.6 5.2c0 2.1 3.6 7.4 4 8 .1.1.2.2.4.2s.3-.1.4-.2c.4-.6 4-5.9 4-8 0-2.3-2-4.2-4.4-4.2zm0 11.1c-1.2-1.9-3.4-5.5-3.4-6.9 0-1.8 1.5-3.3 3.4-3.3s3.4 1.5 3.4 3.3c0 1.4-2.2 5.1-3.4 6.9z" />
        <path d="M8 3.5c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0-.7-.6-1.4-1.4-1.4zm0 1.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z" />
      </g>
    </svg>
  );
};

SvgTargetingGeoSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingGeoSmall.displayName = 'TargetingGeoSmall';
export default SvgTargetingGeoSmall;
