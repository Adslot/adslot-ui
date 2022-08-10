import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSupport = (props) => {
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
      <path d="M14 11.4c.2-.6.2-1.1 0-1.6-.2-.3-.4-.4-.7-.5-.1-.2-.2-.3-.4-.4 0-.3.1-1 .1-1.5 0-.4.1-.7.1-.9v-.1H12.8c-.7.2-2-1-2.6-1.9-.2-.3-.3-.4-.4-.3-.1 0-.2.1-.3.2-.2.8-3.8 1.6-6.3 1.9h-.1v.2c0 .2 0 .5.1.8-.2.6-.1 1.3-.2 1.6-.3.2-.5.6-.5 1 0 .5.4 1 .9 1.1.4 2.3 3 4.1 4.6 4.1 1.3 0 2.8-.9 3.8-2.3 1-.1 1.9-.5 2.2-1.4zm-.6-.3c-.2.5-.6.8-1.2 1 .2-.4.3-.7.4-1.1.4-.1.8-.5.9-.9.1.3.1.7-.1 1zM8 14.6c-1.4 0-3.8-1.7-4-3.8 0-.2-.2-.3-.3-.3-.3 0-.5-.2-.5-.5 0-.2.1-.4.3-.5.1 0 .1-.1.2-.2.1-.4.1-1.2 0-1.9v-.5c1.2-.2 5-.8 6.2-1.9.5.6 1.6 1.8 2.6 1.8 0 .2 0 .3-.1.5-.1.9-.2 1.5-.1 1.9 0 .1.1.2.2.2.2.1.3.3.3.5 0 .3-.2.5-.5.5-.2 0-.3.1-.3.3 0 .6-.3 1.1-.6 1.6-.5.1-1.1.1-1.9.1-.1-.2-.4-.4-.7-.4h-.2c-.5 0-.8.3-.8.8 0 .4.4.8.8.8h.2c.3 0 .6-.2.8-.4h1.3c-.9.8-2.1 1.4-2.9 1.4zm.8-1.7h-.2c-.1 0-.2-.1-.2-.1 0-.1.1-.1.2-.1h.2c.1 0 .2.1.2.1s-.1.1-.2.1z" />
      <path d="M7.3 12.4h-.5c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h.4c.2 0 .3-.1.3-.3.1-.1-.1-.3-.2-.3z" />
      <path d="M14.7 5.4C13.2.8 9.8 1 9.3 1 8.8.9 6 .3 3.7 1.8 2.2 2.7 1.3 4.3.9 6.4c-.7 4.2-.7 6.2.2 7.1.7.7 1.9.7 3 .6.2 0 .3-.2.3-.4s-.2-.3-.4-.3c-1.4.2-2.1.1-2.5-.4-.7-.8-.7-2.7 0-6.6.3-2 1.2-3.4 2.5-4.2 2.2-1.4 5.1-.7 5.1-.7h.1c.1 0 3.4-.5 4.8 3.9 1.1 3.6 1.3 6.1.3 7.2-.5.6-1.3.9-2.5.8-.2 0-.3.1-.4.3 0 .2.1.3.3.4h.6c1.1 0 2-.3 2.5-1 1.2-1.2 1.1-3.9-.1-7.7z" />
      <path d="M7.1 9c0-.2-.1-.3-.3-.3h-.7c-.1 0-.3.1-.3.3 0 .2.1.3.3.3h.6c.2 0 .4-.1.4-.3zm2.2.3h.6c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3h-.6c-.1 0-.3.1-.3.3 0 .2.2.3.3.3z" />
    </svg>
  );
};

SvgSupport.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSupport.displayName = 'Support';
export default SvgSupport;
