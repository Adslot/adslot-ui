import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCtaArrow = (props) => {
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
      <path d="M8 15.5C3.9 15.5.5 12.1.5 8S3.9.5 8 .5s7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5zM8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
      <path d="M4 9c-.6 0-1-.4-1-1s.4-1 1-1h4.8L7.6 5.7c-.4-.4-.3-1 .1-1.4.4-.4 1-.3 1.4.1L12.3 8l-3.2 3.7c-.4.4-1 .5-1.4.1s-.5-1-.1-1.4L8.8 9H4z" />
    </svg>
  );
};

SvgCtaArrow.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCtaArrow.displayName = 'CtaArrow';
export default SvgCtaArrow;
