import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMultiflightPackage = (props) => {
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
        d="M15.2 1.8s0-.1-.1-.1h-.3L1 8.1c-.1 0-.2.2-.2.3 0 .1.1.3.2.3l4.3 1.4 1.8 4c0 .1.1.1.1.1s.1.1.2.1h.1c.1 0 .1 0 .2-.1l.1-.1 1.6-2.7 4.4 1.4c.1 0 .2 0 .3-.1s.2-.2.2-.3l.9-10.6c0 .1 0 .1 0 0zm-2.6 1.6-7 6.1-3.4-1.2 10.4-4.9zm-4.2 7.7.4.1-.5.9.1-1zm-.6-.7-.4 2.3L6.1 10l6.1-5.3-4.4 5.7zm5.8 1.7-4.2-1.4-.7-.3 5.7-7.3-.8 9z"
        fill={color}
      />
    </svg>
  );
};

SvgMultiflightPackage.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMultiflightPackage.displayName = 'MultiflightPackage';
export default SvgMultiflightPackage;
