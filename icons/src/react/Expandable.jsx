import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgExpandable = (props) => {
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
      <path fill="none" d="M0 0h130v130H0z" />
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
      <path fill="#fff" d="M25.8 39.5h79.6v48H25.8z" />
      <path
        d="M53.4 49.4h24.2m-24.2 5.3h24.2m-24.2 5.4h24.2m-24.2 7.2h24.2m-24.2 5.4h24.2m-24.2.1h24.2m-24.2 5.4h24.2"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={2.702}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <path
        d="M89.1 43.7H41.9c-1 0-1.8.6-1.8 1.3v15.8c0 .7.8 1.3 1.8 1.3h47.3c1 0 1.8-.6 1.8-1.3V45c-.1-.8-.9-1.3-1.9-1.3z"
        fill="#f24d48"
      />
      <path
        d="M87.3 47c-.1-.1-.3-.1-.5 0l-1.9 1.9L83 47c-.1-.1-.3-.1-.5 0-.1.1-.1.3 0 .5l1.9 1.9-1.9 1.9c-.1.1-.1.3 0 .5.1.1.2.1.2.1.1 0 .2 0 .2-.1l1.9-1.9 1.9 1.9c.1.1.2.1.2.1.1 0 .2 0 .2-.1.1-.1.1-.3 0-.5l-1.9-1.9 1.9-1.9c.3-.1.3-.3.2-.5z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.271}
        strokeMiterlimit={10}
      />
      <path
        d="M47.7 64.9h-5.6c-.8 0-1.4.6-1.4 1.4v14.1c0 .8.6 1.4 1.4 1.4h5.6c.8 0 1.4-.6 1.4-1.4V66.3c0-.8-.6-1.4-1.4-1.4zm41.8 0h-5.6c-.8 0-1.4.6-1.4 1.4v14.1c0 .8.6 1.4 1.4 1.4h5.6c.8 0 1.4-.6 1.4-1.4V66.3c0-.8-.6-1.4-1.4-1.4z"
        fill="#d3d3d3"
      />
    </svg>
  );
};

SvgExpandable.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgExpandable.displayName = 'Expandable';
export default SvgExpandable;
