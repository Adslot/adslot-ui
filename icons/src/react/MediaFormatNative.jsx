import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMediaFormatNative = (props) => {
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
      <path d="M14.7 1.6H1.3c-.2 0-.3.1-.3.3v12.2c0 .2.1.3.3.3h13.4c.2 0 .3-.1.3-.3V1.9c0-.2-.1-.3-.3-.3zm-.3.6v1.2H1.6V2.2h12.8zM1.6 13.8V3.9h12.8v9.9H1.6z" />
      <path d="M12.7 9.9H3c-.2 0-.3.1-.3.3V12c0 .2.1.3.3.3h9.6c.2 0 .3-.1.3-.3v-1.8c.1-.2-.1-.3-.2-.3zm-.3 1.8H3.3v-1.3h9.1v1.3zM7.2 8.8H2.9c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2zM7.2 7.3H2.9c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2zM7.2 5.9H2.9c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2zM12.8 8.8H8.5c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2zM12.8 7.3H8.5c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2zM12.8 5.9H8.5c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2z" />
    </svg>
  );
};

SvgMediaFormatNative.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMediaFormatNative.displayName = 'MediaFormatNative';
export default SvgMediaFormatNative;
