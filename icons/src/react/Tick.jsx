import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTick = (props) => {
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
      <path d="M14.5 2.1C10.4 4.6 7.3 7.9 6 9.5L2.7 6.9 1.2 8.1 7 14c1-2.5 4.1-7.5 8-11l-.5-.9z" />
    </svg>
  );
};

SvgTick.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTick.displayName = 'Tick';
export default SvgTick;
