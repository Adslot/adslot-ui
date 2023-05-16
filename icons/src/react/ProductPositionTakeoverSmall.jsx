import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionTakeoverSmall = (props) => {
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
      <path fill="#ff837e" d="M1.8 4H14v9.6H1.8z" />
      <path d="M12.5 13.7v-7c0-.2-.2-.3-.3-.3H3.9c-.2 0-.3.1-.3.3v7h8.9z" fill="#fff" />
      <path
        d="M7.5 9.7H4.6c-.1 0-.2.1-.2.2v2.5c0 .1.1.2.2.2h2.9c.1 0 .2-.1.2-.2V9.9c0-.1-.1-.2-.2-.2z"
        fill="#d3d3d3"
      />
      <path
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={0.546}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M8.8 10.2h2.3m-2.3 1h2.3m-2.3 1.1h2.3"
      />
      <path
        d="M4.7 8.9h6.5c.1 0 .3-.1.3-.3V7.5c0-.1-.1-.3-.3-.3H4.7c-.1 0-.3.1-.3.3v1.1c0 .2.1.3.3.3z"
        fill="#d3d3d3"
      />
      <path
        d="M14.1 2.1H1.9c-.1 0-.3.1-.3.3v11.2c0 .1.1.3.3.3h12.3c.1 0 .3-.1.3-.3V2.4c-.1-.1-.2-.3-.4-.3zm-.2.6v1.1H2.1V2.7h11.8zM2.1 13.3v-9h11.7v9.1H2.1z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgProductPositionTakeoverSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionTakeoverSmall.displayName = 'ProductPositionTakeoverSmall';
export default SvgProductPositionTakeoverSmall;
