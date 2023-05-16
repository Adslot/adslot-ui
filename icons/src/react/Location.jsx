import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgLocation = (props) => {
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
      <path d="M8.2.2c-2.2 0-4 1.8-4 4s4 9.5 4 9.5 4-7.3 4-9.5-1.8-4-4-4zm0 5.3C7.5 5.5 7 4.9 7 4.2 7 3.6 7.5 3 8.2 3s1.2.5 1.2 1.2-.6 1.3-1.2 1.3zm7.4 10.3H.4l1.7-6.9h2.6c.2.3.4.7.6 1.1H3l-1.2 4.7h12.4L13 10h-1.9l.5-1.1h2.3l1.7 6.9z" />
    </svg>
  );
};

SvgLocation.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgLocation.displayName = 'Location';
export default SvgLocation;
