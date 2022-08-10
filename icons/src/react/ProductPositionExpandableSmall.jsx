import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionExpandableSmall = (props) => {
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
        d="M14.1 2.1H1.9c-.1 0-.3.1-.3.3v11.2c0 .1.1.3.3.3h12.3c.1 0 .3-.1.3-.3V2.4c-.1-.1-.2-.3-.4-.3zm-.2.6v1.1H2.1V2.7h11.8zM2.1 13.3v-9h11.7v9.1H2.1z"
        fill="#5a5a5a"
      />
      <path
        d="M5.7 9.5h4.6m-4.6 1h4.6m-4.6 1.1h4.6"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={0.51}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <path d="M12.5 5.1h-9c-.2 0-.3.1-.3.2v3c0 .1.2.2.3.2h8.9c.2 0 .3-.1.3-.2v-3c.1-.1-.1-.2-.2-.2z" fill="#ff837e" />
      <path
        d="M12.1 5.7s-.1 0 0 0l-.4.4-.4-.4h-.1v.1l.4.4-.4.4v.1l.4-.4.4.3v-.1l-.4-.4.5-.4c0 .1 0 0 0 0z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.24}
        strokeMiterlimit={10}
      />
      <path
        d="M4.6 9.1h-1c-.1 0-.3.1-.3.3V12c0 .1.1.3.3.3h1.1c.1 0 .3-.1.3-.3V9.3c-.1-.1-.2-.2-.4-.2zm-.2 2.6h-.6V9.6h.5v2.1zm8.1-2.6h-1.1c-.1 0-.3.1-.3.3V12c0 .1.1.3.3.3h1.1c.1 0 .3-.1.3-.3V9.3c0-.1-.1-.2-.3-.2zm-.2 2.6h-.5V9.6h.5v2.1z"
        fill="#d3d3d3"
      />
    </svg>
  );
};

SvgProductPositionExpandableSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionExpandableSmall.displayName = 'ProductPositionExpandableSmall';
export default SvgProductPositionExpandableSmall;
