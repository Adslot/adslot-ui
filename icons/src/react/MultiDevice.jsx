import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMultiDevice = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="none" d="M.4.4h15.2v15.2H.4z" />
      <path fill="none" d="M.4.4h15.2v15.2H.4z" />
      <path
        fill="#6d6d6d"
        d="M6.3 10.8c-.1 0-.2.1-.2.2l.2 1.1H5.1c-.1 0-.2.1-.2.2s.1.2.2.2h1.3c.2 0 .4-.2.4-.4L6.5 11c0-.2-.1-.2-.2-.2z"
      />
      <path
        fill="#6d6d6d"
        d="M8.7 3.3H1.2c-.5 0-.8.4-.8.8v5.2c0 .5.4.8.8.8h.3v1.7c0 .3.3.6.6.6H4c.3 0 .6-.3.6-.6v-1.7h4.1c.4 0 .8-.4.8-.8V4.1c0-.4-.3-.8-.8-.8zm-7.5.4h7.5c.2 0 .4.2.4.4v4.5H4.6v-.9c0-.3-.3-.6-.6-.6H2.1c-.3 0-.6.3-.6.6v1H.8V4.1c0-.2.2-.4.4-.4zm3 4.2H1.9v-.2c0-.1.1-.2.2-.2H4c.1 0 .2.1.2.2v.2zm-2.3.4h2.3v3H1.9v-3zm-.7 1.5c-.2 0-.4-.2-.4-.5V9h.8v.8h-.4zM4 12.1H2.1c-.1 0-.2-.1-.2-.2v-.2h2.3v.2c0 .1-.1.2-.2.2zm4.7-2.3H4.6V9h4.6v.3c-.1.3-.3.5-.5.5z"
      />
      <path fill="#fff" d="M8.3 6.7h6.4v4.6H8.3zm-.8 5h7.8v.5H7.5z" />
      <g fill="#6d6d6d" stroke="#6d6d6d">
        <path
          d="M8.2 11c.1 0 .2-.1.2-.2V6.9s0-.1.1-.1h6.1s.1 0 .1.1v3.9c0 .1.1.2.2.2s.2-.1.2-.2V6.9c0-.2-.2-.4-.4-.4H8.4c-.2 0-.4.2-.4.4v3.9c0 .2.1.2.2.2z"
          strokeWidth={0.076}
        />
        <path
          d="M15.5 11.4h-3.6c-.1 0-.2.1-.2.2v.1h-.5v-.1c0-.1-.1-.2-.2-.2H7.5c-.1 0-.2.1-.2.2v.4c0 .2.2.5.5.5h7.4c.2 0 .5-.2.5-.5v-.4c-.1-.1-.1-.2-.2-.2zm-.2.6c0 .1 0 .1-.1.1H7.8c-.1 0-.1 0-.1-.1v-.2h3.2c0 .1.2.3.3.3h.6c.2 0 .3-.1.3-.3h3.2v.2z"
          strokeWidth={0.038}
        />
      </g>
    </svg>
  );
};

SvgMultiDevice.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMultiDevice.displayName = 'MultiDevice';
export default SvgMultiDevice;
