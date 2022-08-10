import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionBtfSmall = (props) => {
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
        d="M14.3 2.2H2.1c-.1 0-.3.1-.3.2v11.1c0 .1.1.3.3.3h12.1c.1 0 .3-.1.3-.3V2.4c0-.1-.1-.2-.2-.2zm-.3.5v1.1H2.4V2.7H14zM2.4 13.3v-9H14v9H2.4z"
        fill="#5a5a5a"
      />
      <path
        d="M7.4 8.6H3.7c-.1 0-.3.1-.3.3V12c0 .1.1.3.3.3h3.7c.1 0 .3-.1.3-.3V8.9c-.1-.2-.2-.3-.3-.3z"
        fill="#ff837e"
      />
      <path
        d="M9.1 5.6h3.8M9.1 6.7h3.8M9.1 8.8h3.8m-3.8 1h3.8m-3.8 1.1h3.8m-3.8 1h3.8M3.4 5.6h3.8M3.4 6.7h3.8"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={0.528}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <path
        fill="none"
        stroke="#ff837e"
        strokeWidth={0.528}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M1.2 7.8h14"
      />
    </svg>
  );
};

SvgProductPositionBtfSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionBtfSmall.displayName = 'ProductPositionBtfSmall';
export default SvgProductPositionBtfSmall;
