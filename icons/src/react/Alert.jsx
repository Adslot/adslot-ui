import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAlert = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        d="M26.588 24.645c-.4.7-1.1 1.1-1.8 1.1h-19.5c-1.2 0-2.1-1-2.1-2.1 0-.4.1-.7.3-1l9.8-17.2c.6-1 1.9-1.4 2.9-.8.3.2.6.5.8.8l9.8 17.2c.2.6.2 1.4-.2 2z"
        fill="#fff"
      />
      <g fill="#da4f49">
        <path d="m27.614 22.04-9.8-17.2c-.9-1.5-2.9-2.1-4.4-1.2-.5.3-.9.7-1.2 1.2l-9.8 17.2c-.9 1.6-.3 3.5 1.2 4.4.5.3 1 .4 1.6.4h19.6c1.8 0 3.2-1.4 3.2-3.2 0-.6-.2-1.1-.4-1.6zm-1 2.6c-.4.7-1.1 1.1-1.8 1.1h-19.5c-1.2 0-2.1-1-2.1-2.1 0-.4.1-.7.3-1l9.8-17.2c.6-1 1.9-1.4 2.9-.8.3.2.6.5.8.8l9.8 17.2c.2.6.2 1.4-.2 2z" />
        <path d="M15.014 9.84c-.3 0-.5.2-.5.5v7.8c0 .3.3.5.6.5s.5-.2.5-.5v-7.8c-.1-.3-.3-.5-.6-.5zm0 11.2c-.3 0-.5.2-.5.5v.3c0 .3.3.5.6.5s.5-.2.5-.5v-.3c-.1-.3-.3-.5-.6-.5z" />
      </g>
    </svg>
  );
};

SvgAlert.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAlert.displayName = 'Alert';
export default SvgAlert;
