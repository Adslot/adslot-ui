import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgReporting = (props) => {
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
      <path fill="#D3D3D3" d="M14.1 13.5H2c-.3 0-.5.2-.5.5s.2.5.5.5h12.1c.3 0 .5-.2.5-.5s-.3-.5-.5-.5z" />
      <path
        fill="#6D6E71"
        d="M3.6 12.7h1.8c.2 0 .3-.1.3-.3V9.1c0-.2-.1-.3-.3-.3H3.6c-.2 0-.3.1-.3.3v3.4c0 .1.1.2.3.2zM7.1 10.3c-.2 0-.3.1-.3.3v1.8c0 .2.1.3.3.3h1.8c.2 0 .3-.1.3-.3v-1.8c0-.2-.1-.3-.3-.3H7.1zM10.6 6.9c-.2 0-.3.1-.3.3v5.3c0 .2.1.3.3.3h1.8c.2 0 .3-.1.3-.3V7.1c0-.2-.1-.3-.3-.3h-1.8z"
      />
      <path
        fill="#D3D3D3"
        d="m4.3 5.6 3.1 2.5c.1.1.2.1.2.1.1 0 .2 0 .3-.1l4-4.6.7.5c.1 0 .1.1.2.1h.1c.1-.1.1-.2.1-.3l.1-1.9c0-.1 0-.2-.1-.2-.1-.1-.2-.1-.2-.1l-1.8.5c-.1 0-.2.1-.2.2s0 .2.1.3l.5.4-3.8 4.4-2.9-2.3c-.1-.2-.3-.1-.5 0-.1.2-.1.4.1.5z"
      />
    </svg>
  );
};

SvgReporting.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgReporting.displayName = 'Reporting';
export default SvgReporting;
