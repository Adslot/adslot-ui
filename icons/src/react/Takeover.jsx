import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTakeover = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 130"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="none" d="M0 0h131.2v130H0z" />
      <path fill="#e8e8e8" d="M109.1 36.4 130 58.5V130H50.6l-37-35.7 5.1-3.1h2.7v-1.4z" />
      <path fill="#fff" d="M22.9 36.4H109v53.4H22.9z" />
      <path
        d="M76.2 91.2c0 .5-.4 1-1 1H56c-.5 0-1-.4-1-1H14c-.4 0-.8.4-.8.8v1.5c0 2.2 7.9 2.4 10 2.4h64.9l-3.2-4.7h-8.7z"
        fill="#3f3e40"
      />
      <path d="M117.2 91.2H84.9l3.2 4.7H108c2.2 0 10-.2 10-2.4V92c0-.4-.3-.8-.8-.8z" fill="#59565b" />
      <path d="M25.8 87.4v-48h24.3l-2.8-4.2H24.1c-1.5 0-2.7 1.2-2.7 2.7v52.7h63.2l-2.2-3.3H25.8z" fill="#3f3e40" />
      <path
        d="M109.8 38c0-1.5-1.2-2.7-2.7-2.7H47.3l2.8 4.2h55.3v47.9h-23l2.2 3.3h25.2V38zm-44.2-.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z"
        fill="#59565b"
      />
      <path fill="#f24d48" d="M25.8 39.5h79.6v47.9H25.8z" />
      <path d="M87.3 87.5H43.2V51.7c0-.3.2-.5.5-.5h43.1c.3 0 .5.2.5.5v35.8z" fill="#fff" />
      <path
        d="M62.9 67.8H48.1c-.4 0-.6.3-.6.6v12.8c0 .4.3.6.6.6h14.8c.4 0 .6-.3.6-.6V68.5c.1-.4-.2-.7-.6-.7z"
        fill="#d3d3d3"
      />
      <path
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={2.694}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M69.3 69.9h11.3m-11.3 5.3h11.3m-11.3 5.3h11.3"
      />
      <path
        d="M48.3 63.6h33.1c.4 0 .8-.4.8-.8v-6.3c0-.4-.4-.8-.8-.8H48.3c-.4 0-.8.4-.8.8v6.3c0 .4.3.8.8.8z"
        fill="#d3d3d3"
      />
    </svg>
  );
};

SvgTakeover.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTakeover.displayName = 'Takeover';
export default SvgTakeover;
