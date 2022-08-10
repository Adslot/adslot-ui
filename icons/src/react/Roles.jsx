import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgRoles = (props) => {
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
        d="M1.4 11.3c.6.6 1.5.8 2.2.5l.8.8c.1.1.1.1.2.1h.8l.2 1.1c0 .1.1.2.2.3l.9.2.2.7c0 .1.1.2.3.2h1.1c.1 0 .2-.1.3-.2l.3-.6c0-.1 0-.2-.1-.3L5 10.3c.2-.7 0-1.5-.6-2.1-.8-.8-2.2-.8-3.1 0-.8.8-.8 2.2.1 3.1zm.4-2.7C2.4 8 3.4 8 4 8.6c.4.4.6 1.1.4 1.6 0 .1 0 .2.1.3l3.6 3.6-.1.4h-.6l-.2-.7c0-.1-.1-.2-.2-.2l-.8-.2-.2-1.1c0-.2-.1-.2-.3-.3h-.9l-.8-.8c-.1-.1-.2-.1-.3-.1-.6.3-1.3.1-1.7-.3-.8-.6-.8-1.6-.2-2.2zM8.6 12.7c0-.2.1-.3.3-.3h5.6c.1 0 .1 0 .1-.1v-1.5s0-.1-.1-.1c-3.6-1.4-4.2-2-4.3-2.4v-.6c0-.1 0-.2.1-.2.4-.4.6-.9.8-1.5 0-.1.1-.1.1-.2.1-.1.2-.3.3-.4 0-.2 0-.4-.1-.5 0-.1-.1-.1-.1-.2V3.5c0-1.3-.8-2-2.2-2-1.4 0-2.1.7-2.1 2v1.3c0 .1 0 .1-.1.2s-.1.3-.1.5.1.3.3.4c0 .1 0 .1.1.2.1.6.4 1.1.8 1.4v.9c-.1.5-1.5 1.3-1.8 1.5-.2.1-.4 0-.5-.1-.1-.1 0-.3.1-.4.6-.3 1.4-.9 1.6-1.1v-.4c-.3-.4-.6-1-.8-1.6-.2-.1-.4-.4-.4-.7 0-.3 0-.6.2-.9V3.5c0-1.6 1-2.6 2.8-2.6 1.7 0 2.8 1 2.8 2.6v1.2c.2.3.2.6.2.9 0 .3-.2.6-.4.8-.2.6-.5 1.1-.8 1.5v.4c.1.2.7.7 3.9 1.9.3.1.5.4.5.7v1.5c0 .4-.3.7-.7.7H8.9c-.2-.1-.3-.2-.3-.4z"
        fill="#5a5a5a"
      />
      <path
        d="M2.9 9.3s.1.1.1.2 0 .2-.1.2-.2.1-.2.1c-.1 0-.2 0-.2-.1-.1-.1-.1-.1-.1-.2s0-.2.1-.2c.1-.2.3-.2.4 0z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgRoles.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgRoles.displayName = 'Roles';
export default SvgRoles;
