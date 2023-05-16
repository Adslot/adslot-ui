import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMagnifier = (props) => {
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
        d="M10.1 9c.7-.9 1.1-1.9 1.1-3.1C11.2 3.1 8.9.8 6.1.8S1 3.1 1 5.9 3.3 11 6.1 11c1.2 0 2.2-.4 3.1-1.1l4.9 4.9c.1.1.3.2.4.2.2 0 .3-.1.4-.2.2-.2.2-.6 0-.8l-4.8-5zM2.3 5.9C2.3 3.8 4 2 6.1 2S10 3.8 10 5.9 8.3 9.8 6.2 9.8 2.3 8.1 2.3 5.9z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgMagnifier.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMagnifier.displayName = 'Magnifier';
export default SvgMagnifier;
