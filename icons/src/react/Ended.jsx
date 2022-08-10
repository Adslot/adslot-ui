import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEnded = (props) => {
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
      <path d="M3 3h10v10H3z" />
    </svg>
  );
};

SvgEnded.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEnded.displayName = 'Ended';
export default SvgEnded;
