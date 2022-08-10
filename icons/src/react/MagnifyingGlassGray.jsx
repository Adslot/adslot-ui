import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMagnifyingGlassGray = (props) => {
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
      <path
        fill="#D3D3D3"
        d="m13.8 12.1-3.5-3.5c-.4.6-.9 1.2-1.5 1.6l3.5 3.5c.3.3.9.3 1.3 0l.3-.3c.3-.3.3-.9-.1-1.3z"
      />
      <path
        fill="#6D6E71"
        d="M10.2 6.1c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4c2.2.1 4-1.8 4-4zM6.1 9.2C4.4 9.2 3 7.8 3 6.1 3 4.4 4.4 3 6.1 3c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1z"
      />
    </svg>
  );
};

SvgMagnifyingGlassGray.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMagnifyingGlassGray.displayName = 'MagnifyingGlassGray';
export default SvgMagnifyingGlassGray;
