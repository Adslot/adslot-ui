import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingCustomSmall = (props) => {
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
      <path fill="none" d="M1 1h14v14H1z" />
      <g fill="#5a5a5a">
        <path d="M6.3 12.3c-.6 0-1.2-.1-1.8-.3v-.9c2.2-.9 2.6-1.2 2.7-1.5v-.5c0-.1 0-.1-.1-.1-.2-.2-.4-.5-.5-.9 0 0 0-.1-.1-.1 0-.1-.1-.1-.1-.2s0-.2.1-.3v-1c0-.8.4-1.2 1.3-1.2.2 0 .4 0 .6.1.1-.1.2-.2.4-.3-.3-.1-.6-.2-1-.2-1.1 0-1.7.6-1.7 1.6v.7c-.1.2-.2.4-.1.6 0 .2.1.4.2.5.1.4.3.7.5.9v.2c-.1.1-.4.4-2.4 1.2-.1.1-.3.3-.3.5v.7c-.6-.3-1.2-.8-1.6-1.3.1 0 .4-.1.6-.1.6-.1 1-.2 1.1-.5v-.5c0-.1-.1-.2-.2-.2-.5 0-.9-.1-1.1-.1.3-.5.4-1.4.4-1.7 0-.6.3-1 .8-1.3.5-.2 1-.2 1.4.1.1.1.2.1.3 0 .1-.1.1-.2 0-.3-.5-.4-1.2-.5-1.8-.2-.7.3-1.1.9-1.1 1.6-.1.7-.3 1.5-.4 1.6-.1.1-.2.1-.2.2s0 .1.1.2c0 0 .4.3 1.3.3v.2c-.1.1-1.4.3-1.5.3-.4-.7-.7-1.5-.7-2.4C1.4 5.1 3.6 3 6.3 3c1.4 0 2.7.6 3.6 1.6.2 0 .3-.1.5-.1-1-1.2-2.4-2-4.1-2C3.4 2.6 1 4.9 1 7.7c0 2.8 2.4 5.1 5.3 5.1 1.7 0 3.1-.8 4.1-1.9-.2 0-.3 0-.5-.1-.9.9-2.2 1.5-3.6 1.5z" />
        <path d="m14.9 12-2.4-2.6c.4-.4.6-.9.6-1.5.1-1.4-1-2.6-2.4-2.7-1.4-.1-2.6 1-2.7 2.4-.1 1.4 1 2.6 2.4 2.7.6 0 1.2-.2 1.6-.5l2.4 2.6c.1.1.1.1.2.1s.2 0 .2-.1c.2 0 .2-.2.1-.4zm-4.4-2.3c-1.1-.1-1.9-1-1.8-2.1.1-1.1 1-1.9 2.1-1.8 1.1.1 1.9 1 1.8 2.1-.1 1-1 1.8-2.1 1.8z" />
      </g>
    </svg>
  );
};

SvgTargetingCustomSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingCustomSmall.displayName = 'TargetingCustomSmall';
export default SvgTargetingCustomSmall;
