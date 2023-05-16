import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingGeo = (props) => {
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
      <path d="M8.2.8c-2 0-3.6 1.7-3.6 3.7 0 2.1 3.6 8.8 3.6 8.8s3.6-6.7 3.6-8.8c0-2-1.6-3.7-3.6-3.7zm0 4.9c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .5-.5 1.1-1.1 1.1z" />
      <path d="M13.3 8.8h-2c-.1.3-.3.6-.4 1h1.7l1.1 4.4H2.4l1.1-4.4h2.1c-.2-.4-.3-.7-.4-1H2.7l-1.6 6.4h13.6l-1.4-6.4z" />
    </svg>
  );
};

SvgTargetingGeo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingGeo.displayName = 'TargetingGeo';
export default SvgTargetingGeo;
