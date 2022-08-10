import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCrossInverse = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#fff"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M4 11.3 7.3 8 4.1 4.7l.8-.7L8 7.2 11.1 4l.7.7-3.1 3.2 3.3 3.3-.7.8L8 8.7 4.7 12l-.7-.7z" />
    </svg>
  );
};

SvgCrossInverse.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCrossInverse.displayName = 'CrossInverse';
export default SvgCrossInverse;
