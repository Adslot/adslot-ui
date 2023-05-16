import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgServer = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M36.1 16.5H5.3c-.4 0-.7.3-.7.7V26c0 .4.3.7.7.7h30.8c.4 0 .7-.3.7-.7v-8.8c0-.4-.3-.7-.7-.7zm-.8 8.8H6V18h29.3v7.3z" />
      <path d="M30.2 23.5c1.1 0 1.9-.9 1.9-1.9 0-1.1-.9-1.9-1.9-1.9s-1.9.9-1.9 1.9c0 1.1.8 1.9 1.9 1.9zm0-2.4c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.3-.5.5-.5zM36.1 3.3H5.3c-.4 0-.7.3-.7.7v8.8c0 .4.3.7.7.7h30.8c.4 0 .7-.3.7-.7V4c0-.4-.3-.7-.7-.7zm-.8 8.8H6V4.8h29.3v7.3z" />
      <path d="M30.2 10.3c1.1 0 1.9-.9 1.9-1.9 0-1.1-.9-1.9-1.9-1.9s-1.9.9-1.9 1.9c0 1.1.8 1.9 1.9 1.9zm0-2.4c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.3-.5.5-.5zM7.5 34.1H3.8c-.4 0-.7.3-.7.7s.3.7.7.7h3.7c.4 0 .7-.3.7-.7 0-.3-.3-.7-.7-.7zM15.6 34.1h-3.7c-.4 0-.7.3-.7.7s.3.7.7.7h3.7c.4 0 .7-.3.7-.7 0-.3-.3-.7-.7-.7zM28 34.1h-3.7c-.4 0-.7.3-.7.7s.3.7.7.7H28c.4 0 .7-.3.7-.7.1-.3-.3-.7-.7-.7zM36 34.1h-3.7c-.4 0-.7.3-.7.7s.3.7.7.7H36c.4 0 .7-.3.7-.7.1-.3-.3-.7-.7-.7zM20.6 33v-3.9c0-.4-.3-.7-.7-.7s-.7.3-.7.7V33c-.8.3-1.3 1-1.3 1.9 0 1.1.9 2 2 2s2-.9 2-2c0-.9-.5-1.6-1.3-1.9zm-.7 2.4c-.3 0-.6-.2-.6-.6 0-.3.2-.6.6-.6.3 0 .6.3.6.6-.1.4-.3.6-.6.6z" />
    </svg>
  );
};

SvgServer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgServer.displayName = 'Server';
export default SvgServer;
