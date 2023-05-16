import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgInterstitial = (props) => {
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
      <path fill="none" d="M-1.1-1.2h131.2V130H-1.1z" />
      <path fill="#e8e8e8" d="m108 35.2 22.1 22.1V130H49.5l-37-36.9 5.1-3.1h2.7v-1.6z" />
      <path fill="#fff" d="M21.7 35.2h86.1v53.4H21.7z" />
      <path
        d="M75.1 90c0 .5-.4 1-1 1H54.8c-.5 0-1-.4-1-1h-41c-.4 0-.8.4-.8.8v1.5c0 2.2 7.9 2.4 10 2.4h65L83.8 90h-8.7z"
        fill="#3f3e40"
      />
      <path d="M116.1 90H83.8l3.2 4.7h19.9c2.2 0 10-.2 10-2.4v-1.5c0-.4-.4-.8-.8-.8z" fill="#59565b" />
      <path d="M24.7 86.2V38.3H49l-2.8-4.2H23c-1.5 0-2.7 1.2-2.7 2.7v52.7h63.2l-2.2-3.3H24.7z" fill="#3f3e40" />
      <path
        d="M108.7 36.8c0-1.5-1.2-2.7-2.7-2.7H46.2l2.8 4.2h55.3v47.9h-23l2.2 3.3h25.2V36.8zm-44.2-.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5c-.1.3-.3.5-.5.5z"
        fill="#59565b"
      />
      <path d="M24.7 86.2V38.3h79.6v47.9H24.7z" fill="#fff" />
      <path
        d="M88 42.4H40.8c-1 0-1.8.6-1.8 1.3V78c0 .7.8 1.3 1.8 1.3H88c1 0 1.8-.6 1.8-1.3V43.7c0-.7-.8-1.3-1.8-1.3z"
        fill="#f24d48"
      />
      <path
        d="M86.1 45.8c-.1-.1-.3-.1-.5 0l-1.9 1.9-1.9-1.9c-.1-.1-.3-.1-.5 0-.1.1-.1.3 0 .5l1.9 1.9-1.8 1.8c-.1.1-.1.3 0 .5.1.1.2.1.2.1.1 0 .2 0 .2-.1l1.9-1.9 1.9 1.9c.1.1.2.1.2.1.1 0 .2 0 .2-.1.1-.1.1-.3 0-.5l-1.9-1.9 1.9-1.9c.2 0 .2-.3.1-.4z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.269}
        strokeMiterlimit={10}
      />
    </svg>
  );
};

SvgInterstitial.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgInterstitial.displayName = 'Interstitial';
export default SvgInterstitial;
