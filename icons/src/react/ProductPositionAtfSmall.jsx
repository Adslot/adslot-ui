import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionAtfSmall = (props) => {
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
      <path
        d="M14.3 2.2H2.1c-.1 0-.3.1-.3.3v11.1c0 .1.1.3.3.3h12.2c.1 0 .3-.1.3-.3V2.5c-.1-.2-.2-.3-.3-.3zm-.3.5v1.1H2.4V2.7H14zM2.4 13.3v-9H14v9H2.4z"
        fill="#5a5a5a"
      />
      <path d="M3.7 7h9c.1 0 .3-.1.3-.3v-1c0-.1-.1-.3-.3-.3h-9c-.1 0-.3.1-.3.3v1.1c0 .1.1.2.3.2z" fill="#ff837e" />
      <path
        d="M7.4 8.5H3.7c-.1 0-.3.1-.3.3V12c0 .1.1.3.3.3h3.7c.1 0 .3-.1.3-.3V8.8c-.1-.1-.2-.3-.3-.3zm-.3 3.2H3.9V9.1h3.2v2.6z"
        fill="#d3d3d3"
      />
      <path
        fill="none"
        stroke="#ff837e"
        strokeWidth={0.528}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M1 7.8h14"
      />
      <path
        d="M8.7 8.8h3.8M8.7 9.9h3.8m-3.8 1h3.8M8.7 12h3.8"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={0.528}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
    </svg>
  );
};

SvgProductPositionAtfSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionAtfSmall.displayName = 'ProductPositionAtfSmall';
export default SvgProductPositionAtfSmall;
