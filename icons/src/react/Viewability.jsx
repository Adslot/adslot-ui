import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgViewability = (props) => {
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
      <path fill="#231F20" d="M8 6.1C7 6.1 6.1 7 6.1 8 6.1 9 7 9.9 8 9.9 9 9.9 9.9 9 9.9 8 9.9 7 9 6.1 8 6.1z" />
      <path
        fill="#231F20"
        d="M15 7.7c-1.4-2.8-4.1-4.6-7-4.6-2.9 0-5.5 1.8-7 4.6L.9 8l.1.3c1.4 2.8 4.1 4.6 7 4.6 2.9 0 5.5-1.8 7-4.6l.1-.3-.1-.3zm-7 4c-2.3 0-4.5-1.4-5.8-3.7C3.5 5.7 5.7 4.3 8 4.3s4.5 1.4 5.8 3.7c-1.3 2.3-3.5 3.7-5.8 3.7z"
      />
    </svg>
  );
};

SvgViewability.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgViewability.displayName = 'Viewability';
export default SvgViewability;
