import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBufferAdServer = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M1.2 1.2h13.6v13.6H1.2z" />
      <path
        fill="#5a5a5a"
        d="M12.1 9.4c.4 0 .8-.4.8-.8s-.4-.8-.8-.8-.8.4-.8.8.3.8.8.8zm0-1c.1 0 .2.1.2.2s-.1.2-.2.2-.2-.1-.2-.2.1-.2.2-.2zm0-4.3c.4 0 .8-.4.8-.8s-.4-.8-.8-.8-.8.4-.8.8.3.8.8.8zm0-1c.1 0 .2.1.2.2s-.1.2-.2.2-.2-.1-.2-.2.1-.2.2-.2z"
      />
      <path
        fill="#5a5a5a"
        d="M14.2 6.5H1.8c-.2 0-.3.1-.3.3v3.5c0 .2.1.3.3.3h12.4c.2 0 .3-.1.3-.3V6.8c0-.1-.1-.3-.3-.3zm-.3 3.6H2.1v-3h11.8v3zm.3-8.9H1.8c-.2 0-.3.1-.3.3V5c0 .2.1.3.3.3h12.4c.2 0 .3-.1.3-.3V1.5c0-.2-.1-.3-.3-.3zm-.3 3.6H2.1v-3h11.8v3zM3 13.6H1.5c-.2 0-.3.1-.3.3 0 .2.1.3.3.3H3c.2 0 .3-.1.3-.3 0-.1-.2-.3-.3-.3zm3.2 0H4.8c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h1.5c.2 0 .3-.1.3-.3-.1-.1-.2-.3-.4-.3zm5.1.1H9.8c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h1.5c.2 0 .3-.1.3-.3 0-.2-.2-.3-.3-.3zm3.2 0H13c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h1.5c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3zm-6.2-.5v-1.6c0-.2-.1-.3-.3-.3s-.3.1-.3.3v1.6c-.3.1-.5.4-.5.8s.4.8.8.8.8-.4.8-.8-.2-.7-.5-.8zm-.3 1c-.1 0-.2-.1-.2-.2s.1-.2.2-.2.2.1.2.2-.1.2-.2.2z"
      />
    </svg>
  );
};

SvgBufferAdServer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBufferAdServer.displayName = 'BufferAdServer';
export default SvgBufferAdServer;
