import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdserverGam = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="none" d="M.1.1h40.2v40H.1z" />
      <path fill="none" d="M3.2 3.1h34v34h-34z" />
      <path
        d="M36.2 22.3 22.4 36.2c-1.3 1.3-3.3 1.3-4.6 0-1.3-1.3-1.3-3.3 0-4.6l13.9-13.9c1.3-1.3 3.3-1.3 4.6 0 1.2 1.3 1.2 3.3-.1 4.6zM24.8 10.9l-6.9 6.9 4.6 4.6 6.9-6.9c1.3-1.3 1.3-3.3 0-4.6-1.3-1.3-3.3-1.3-4.6 0z"
        fill="#f9bc15"
      />
      <path
        d="m15.5 29.3 6.9-6.9-4.6-4.6-6.9 6.9c-1.3 1.3-1.3 3.3 0 4.6s3.4 1.3 4.6 0zM22.6 8.6 8.7 22.5c-1.3 1.3-3.3 1.3-4.6 0s-1.3-3.3 0-4.6L18 4c1.3-1.3 3.3-1.3 4.6 0 1.2 1.3 1.2 3.4 0 4.6z"
        fill="#5079bc"
      />
      <circle cx={20.1} cy={33.9} fill="#36a852" r={3.2} />
      <circle cx={20.2} cy={20.1} fill="#36a852" r={3.2} />
      <circle cx={20.3} cy={6.3} r={3.2} fill="#36a852" />
    </svg>
  );
};

SvgAdserverGam.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdserverGam.displayName = 'AdserverGam';
export default SvgAdserverGam;
