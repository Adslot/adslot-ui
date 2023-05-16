import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEmailEmpty = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      enableBackground="new 0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M0 0h16v16H0z" fill="none" />
      <path
        d="M11 8.6h2c.3 0 .5-.2.5-.5V5.4c0-.3-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5v2.7c0 .3.2.5.5.5zm.1-3.1h1.8V8h-1.8V5.5zM2.8 11.1H7c.2 0 .3-.1.3-.3s-.1-.3-.3-.3H2.8c-.2 0-.3.1-.3.3s.2.3.3.3zM2.8 9.2H7c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H2.8c-.2 0-.3.1-.3.3 0 .2.2.3.3.3zM2.8 7.4h1.8c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H2.8c-.2 0-.3.1-.3.3 0 .1.2.3.3.3z"
        fill="#5a5a5a"
      />
      <path
        d="M15.1 3.1H.9c-.2 0-.3.1-.3.3v9.2c0 .2.1.3.3.3H15c.2 0 .3-.1.3-.3V3.4c.1-.2-.1-.3-.2-.3zm-.3 9.2H1.2V3.7h13.5v8.6z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgEmailEmpty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEmailEmpty.displayName = 'EmailEmpty';
export default SvgEmailEmpty;
