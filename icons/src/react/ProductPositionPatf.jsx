import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionPatf = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="none"
        stroke="#E7E7E7"
        strokeMiterlimit={10}
        d="M45.6 33.3H18.2c-1 0-1.9 1.8-1.9 4.1v36.1c0 2.2.8 4.1 1.9 4.1h27.4c1 0 1.9-1.8 1.9-4.1V37.4c-.1-2.2-.9-4.1-1.9-4.1z"
      />
      <path
        fill="#D2D3D4"
        d="M81.8 43H54.4c-1 0-1.9 1.5-1.9 3.4v30.1c0 1.9.8 3.4 1.9 3.4h27.4c1 0 1.9-1.5 1.9-3.4V46.4c0-1.9-.8-3.4-1.9-3.4z"
      />
      <path fill={color} d="M83.7 60.5V35.2c0-1-.8-1.9-1.9-1.9H54.4c-1 0-1.9.8-1.9 1.9v25.3h31.2z" />
      <path d="M91.9 10.7H8.1c-1.7 0-3.1 1.4-3.1 3.1v72.4c0 1.7 1.4 3.1 3.1 3.1h83.7c1.7 0 3.1-1.4 3.1-3.1V13.8c.1-1.7-1.3-3.1-3-3.1zm-3.2 72.4H11.3v-54h77.5v54h-.1z" />
      <path fill="none" stroke="#F04F49" strokeWidth={1.5} strokeMiterlimit={10} d="M0 60h100" />
    </svg>
  );
};

SvgProductPositionPatf.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionPatf.displayName = 'ProductPositionPatf';
export default SvgProductPositionPatf;
