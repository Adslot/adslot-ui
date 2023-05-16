import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCancel = (props) => {
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
      <path d="M12 3 8 7 4 3H3v1l4 4-4 4v1h1l4-4 4 4h1v-1L9 8l4-4V3h-1z" />
    </svg>
  );
};

SvgCancel.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCancel.displayName = 'Cancel';
export default SvgCancel;
