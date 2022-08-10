import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionTandem = (props) => {
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
      <path d="M96.5 6.3h-93C1.6 6.3 0 7.9 0 9.8v80.4c0 1.9 1.6 3.5 3.5 3.5h93.1c1.9 0 3.5-1.6 3.5-3.5V9.8c-.1-1.9-1.7-3.5-3.6-3.5zm-3.4 80.5H6.9V26.7H93v60.1z" />
      <path
        fill={color}
        stroke={color}
        strokeMiterlimit={10}
        d="M85.2 32.5H14.8c-1.2 0-2.1.9-2.1 2.1v4.7c0 1.2.9 2.1 2.1 2.1h70.5c1.2 0 2.1-.9 2.1-2.1v-4.7c-.1-1.2-1-2.1-2.2-2.1zM18.8 46.3h-4.2c-1.2 0-2.1.9-2.1 2.1V80c0 1.2.9 2.1 2.1 2.1h4.2c1.2 0 2.1-.9 2.1-2.1V48.3c0-1.1-1-2-2.1-2z"
      />
      <path
        fill="none"
        stroke="#E7E7E7"
        strokeMiterlimit={10}
        d="M68.5 46.3H27.7c-1.2 0-2.1.9-2.1 2.1V80c0 1.2.9 2.1 2.1 2.1h40.7c1.2 0 2.1-.9 2.1-2.1V48.3c.1-1.1-.9-2-2-2zm16.2 0h-7.2c-1.2 0-2.1.9-2.1 2.1V63c0 1.2.9 2.1 2.1 2.1h7.2c1.2 0 2.1-.9 2.1-2.1V48.3c0-1.1-.9-2-2.1-2z"
      />
      <path
        fill={color}
        stroke={color}
        strokeMiterlimit={10}
        d="M84.7 70h-7.2c-1.2 0-2.1.9-2.1 2.1v8c0 1.2.9 2.1 2.1 2.1h7.2c1.2 0 2.1-.9 2.1-2.1v-8c0-1.2-.9-2.1-2.1-2.1z"
      />
    </svg>
  );
};

SvgProductPositionTandem.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionTandem.displayName = 'ProductPositionTandem';
export default SvgProductPositionTandem;
