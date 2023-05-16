import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgGridSquares = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M2.5 2.5h7v7h-7zm9 0h7v7h-7zm9 0h7v7h-7zm-18 9h7v7h-7zm9 0h7v7h-7zm9 0h7v7h-7zm-18 9h7v7h-7zm9 0h7v7h-7zm9 0h7v7h-7z" />
    </svg>
  );
};

SvgGridSquares.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgGridSquares.displayName = 'GridSquares';
export default SvgGridSquares;
