import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlus = (props) => {
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
      <path d="M8 2c-.3 0-.6.3-.6.6v4.8H2.6c-.3 0-.6.3-.6.6s.3.6.6.6h4.8v4.8c0 .3.3.6.6.6.2 0 .3-.1.4-.2.1-.1.2-.3.2-.4V8.6h4.8c.2 0 .3-.1.4-.2.1-.1.2-.2.2-.4 0-.3-.3-.6-.6-.6H8.6V2.6c0-.3-.3-.6-.6-.6z" />
    </svg>
  );
};

SvgPlus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlus.displayName = 'Plus';
export default SvgPlus;
