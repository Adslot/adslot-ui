import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPendingChange = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 8"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle fill="#f7931e" cx={4} cy={4} r={4} />
    </svg>
  );
};

SvgPendingChange.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPendingChange.displayName = 'PendingChange';
export default SvgPendingChange;
