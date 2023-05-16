import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMinusComment = (props) => {
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
      <path d="M8.1 2c-3.9-.1-7 2.3-7.1 5.3 0 1 .3 2 1 2.9 1.1 1.4-.1 3.8-.1 3.8l3.5-1.5c.8.2 1.6.4 2.5.4 3.9.1 7-2.3 7.1-5.3.1-3-3-5.5-6.9-5.6M5 8V6h6v2H5z" />
    </svg>
  );
};

SvgMinusComment.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMinusComment.displayName = 'MinusComment';
export default SvgMinusComment;
