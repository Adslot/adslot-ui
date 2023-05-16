import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCreative = (props) => {
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
      <path d="M7.7 9.4 5 6.4 3.1 10v1h9.3c-1.2-1-3.7-3.3-3.7-3.3l-1 1.7zM11 7.2c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9c-.1.5.3.9.9.9zM1 3v10h14V3H1zm13 1v8H2V4h12z" />
    </svg>
  );
};

SvgCreative.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCreative.displayName = 'Creative';
export default SvgCreative;
