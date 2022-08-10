import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgComplianceShieldGreen = (props) => {
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
      <g fill="#5bb75b">
        <path d="M8 13.4c1.9-.7 3-3 3.6-5.4H8v5.4zM3.8 4.2c.1 1.3.3 2.6.6 3.8H8V2.6c-1.7.2-3.7.9-4.2 1.6z" />
        <path d="M13.7 3.8C13 1.8 8.6 1.1 8.1 1h-.2c-.5.1-4.9.8-5.6 2.8V4c0 .4.4 9.6 5.6 11h.2c5.3-1.4 5.6-10.6 5.6-11v-.2zM8 14C3.8 12.7 3.3 5 3.2 4 3.7 3 6.4 2.2 8 2c1.6.2 4.3 1 4.8 2.1-.1.9-.6 8.7-4.8 9.9z" />
      </g>
      <path fill="none" d="M1 1h14v14H1z" />
    </svg>
  );
};

SvgComplianceShieldGreen.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgComplianceShieldGreen.displayName = 'ComplianceShieldGreen';
export default SvgComplianceShieldGreen;
