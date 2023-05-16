import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProduct = (props) => {
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
      <g fill="#5a5a5a">
        <path d="M15 1.2H1c-.2 0-.3.1-.3.3v12.7c0 .2.1.3.3.3h14c.2 0 .3-.1.3-.3V1.5c0-.1-.2-.3-.3-.3zm-.3.6V3H1.3V1.8h13.4zM1.3 14V3.7h13.3V14H1.3z" />
        <path d="M4.7 5.5H2.8c-.2 0-.3.1-.3.3v6.7c0 .2.1.3.3.3h1.8c.2 0 .3-.1.3-.3V5.8c.1-.2-.1-.3-.2-.3zm-.4 6.6H3.1v-6h1.2v6zm8.8-6.6H6.5c-.2 0-.3.1-.3.3v6.7c0 .2.1.3.3.3h6.7c.2 0 .3-.1.3-.3V5.8c-.1-.2-.2-.3-.4-.3zm-.3 6.6h-6v-6h6.1v6z" />
      </g>
    </svg>
  );
};

SvgProduct.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProduct.displayName = 'Product';
export default SvgProduct;
