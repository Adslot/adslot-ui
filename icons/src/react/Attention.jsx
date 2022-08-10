import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAttention = (props) => {
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
      <path d="M8 1 .5 14h15L8 1zm.8 10.9H7.2v-1.5h1.6v1.5zM8.4 10h-.8L7 6.1V4h2v2.1L8.4 10z" />
    </svg>
  );
};

SvgAttention.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAttention.displayName = 'Attention';
export default SvgAttention;
