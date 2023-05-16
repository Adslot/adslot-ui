import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMediaFormatEmail = (props) => {
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
      <path d="M10.9 8.6h1.9c.3 0 .5-.2.5-.5V5.5c0-.3-.2-.5-.5-.5h-1.9c-.3 0-.5.2-.5.5v2.6c0 .3.2.5.5.5zm.1-3h1.7V8H11V5.6zM3 11h4c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H3c-.2 0-.3.1-.3.3 0 .2.2.3.3.3zM3 9.2h4c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H3c-.2 0-.3.1-.3.3 0 .2.2.3.3.3zM3 7.4h1.7c.2 0 .3-.1.3-.3s-.1-.3-.3-.3H3c-.2 0-.3.1-.3.3 0 .1.2.3.3.3z" />
      <path d="M14.8 3.3H1.2c-.2 0-.3.1-.3.3v8.9c0 .2.1.3.3.3h13.6c.2 0 .3-.1.3-.3V3.6c0-.2-.2-.3-.3-.3zm-.2 8.8H1.5V3.9h13l.1 8.2z" />
    </svg>
  );
};

SvgMediaFormatEmail.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMediaFormatEmail.displayName = 'MediaFormatEmail';
export default SvgMediaFormatEmail;
