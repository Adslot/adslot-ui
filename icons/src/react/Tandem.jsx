import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTandem = (props) => {
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
      <path fill="#e8e8e8" d="M109.1 36.4 130 58.5V130H50.6l-37-35.7 5.1-3.1h2.7v-1.6z" />
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
      <path d="M25.8 87.4v-48h79.6v47.9H25.8z" fill="#fff" />
      <path
        d="M71.7 43.6H40.1c-.6 0-1 .3-1 .7v4.8c0 .4.4.7 1 .7h31.6c.6 0 1-.3 1-.7v-4.8c0-.3-.4-.7-1-.7zm18.2 0H76.8c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h13.1c.6 0 1-.4 1-1v-20c0-.5-.5-1-1-1z"
        fill="#f24d48"
      />
      <path
        d="M89.9 67.8H76.8c-.6 0-1 .4-1 1v11.8c0 .6.4 1 1 1h13.1c.6 0 1-.4 1-1V68.8c0-.5-.5-1-1-1z"
        fill="#d3d3d3"
      />
      <path
        d="M40.1 58.8h31.2m-31.2 5.3h31.2m-31.2 5.3h31.2M40.1 53.6h31.2M40.1 75.4h31.2m-31.2 5.2h31.2"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={2.66}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
    </svg>
  );
};

SvgTandem.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTandem.displayName = 'Tandem';
export default SvgTandem;
