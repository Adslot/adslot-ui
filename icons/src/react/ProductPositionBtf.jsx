import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionBtf = (props) => {
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
      <path d="M91.9 10.7H8.1c-1.7 0-3.1 1.4-3.1 3.1v72.4c0 1.7 1.4 3.1 3.1 3.1h83.7c1.7 0 3.1-1.4 3.1-3.1V13.8c.1-1.7-1.3-3.1-3-3.1zm-3.2 72.4H11.3V29h77.5v54.1z" />
      <path
        fill={color}
        d="M18.1 78.6h63.4c1 0 1.9-.8 1.9-1.9V65.6c0-1-.8-1.9-1.9-1.9H18.1c-1 0-1.9.8-1.9 1.9v11.1c0 1.1.8 1.9 1.9 1.9z"
      />
      <path
        fill="none"
        stroke="#E7E7E7"
        strokeMiterlimit={10}
        d="M54.3 60.1h27.4c1 0 1.9-.8 1.9-1.9V35.7c0-1-.8-1.9-1.9-1.9H54.3c-1 0-1.9.8-1.9 1.9v22.5c.1 1.1.9 1.9 1.9 1.9zm-36.2 0h27.4c1 0 1.9-.8 1.9-1.9V35.7c0-1-.8-1.9-1.9-1.9H18.1c-1 0-1.9.8-1.9 1.9v22.5c0 1.1.8 1.9 1.9 1.9z"
      />
      <path fill="none" stroke="#F04F49" strokeWidth={1.5} strokeMiterlimit={10} d="M0 60h100" />
    </svg>
  );
};

SvgProductPositionBtf.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionBtf.displayName = 'ProductPositionBtf';
export default SvgProductPositionBtf;
