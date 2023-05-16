import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlacement = (props) => {
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
      <path d="M15.4 1.4H.6c-.4 0-.6.2-.6.6v12.3c0 .3.2.5.6.5h14.9c.3 0 .6-.2.6-.5V2c-.1-.4-.3-.6-.7-.6zM1.1 13.7V3.4h13.7v10.3H1.1z" />
      <path d="M13.6 4.8H2.4c-.2 0-.3.1-.3.3v1.2c0 .2.1.3.3.3h11.3c.2 0 .3-.1.3-.3V5.1c-.1-.2-.2-.3-.4-.3zM7.2 7.5H2.3c-.2 0-.3.1-.3.3v4.3c0 .1.2.2.3.2h4.9c.2 0 .3-.1.3-.3V7.7c0-.1-.2-.2-.3-.2zm-.3 4.3H2.6V8.2h4.2v3.6zm6.7-4.3H8.8c-.2 0-.3.1-.3.3v4.3c0 .2.1.3.3.3h4.9c.2 0 .3-.1.3-.3V7.7c-.1-.1-.2-.2-.4-.2zm-.2 4.3H9.1V8.2h4.2v3.6z" />
    </svg>
  );
};

SvgPlacement.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlacement.displayName = 'Placement';
export default SvgPlacement;
