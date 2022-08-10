import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionPatfSmall = (props) => {
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
      <path
        d="M12.7 5.6H9c-.1 0-.3.1-.3.3V12c0 .1.1.3.3.3h3.7c.1 0 .3-.1.3-.3V5.8c-.1-.1-.2-.2-.3-.2zm-.3 6.2H9.2V6.1h3.2v5.7z"
        fill="#d3d3d3"
      />
      <path
        d="M3.6 5.8h3.9m-3.9 1h3.9M3.6 8.9h3.9m-3.9 1h3.9M3.6 11h3.9m-3.9 1h3.9"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={0.528}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <path d="M13 7.8v-2c0-.1-.1-.3-.3-.3H9c-.1 0-.3.1-.3.3v2H13z" fill="#ff837e" />
      <path
        fill="none"
        stroke="#ff837e"
        strokeWidth={0.528}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M1 7.8h14"
      />
    </svg>
  );
};

SvgProductPositionPatfSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionPatfSmall.displayName = 'ProductPositionPatfSmall';
export default SvgProductPositionPatfSmall;
