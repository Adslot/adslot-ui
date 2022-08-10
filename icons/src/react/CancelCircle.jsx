import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCancelCircle = (props) => {
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
      <path d="M4.1 4.1c-2.2 2.2-2.2 5.7 0 7.9s5.7 2.2 7.9 0 2.2-5.7 0-7.9-5.9-2.3-7.9 0zm5.2 3.8 2.1 2.1-1.4 1.4-2-2.1-2.1 2.1L4.5 10l2.1-2.1-2.1-2.1 1.4-1.4L8 6.6l2.1-2.1 1.4 1.4-2.2 2z" />
    </svg>
  );
};

SvgCancelCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCancelCircle.displayName = 'CancelCircle';
export default SvgCancelCircle;
