import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPriceAndSell = (props) => {
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
      <path fill="none" d="M15 1v14H1V1z" />
      <g fill="#5a5a5a">
        <path d="M10.936 14.001h-7.7v-9.5h1v1c0 .3.2.5.5.5s.5-.2.5-.5v-1h3.8v1c0 .3.2.5.5.5s.5-.2.5-.5v-1h1v2c.3 0 .7.1 1 .1v-2.6c0-.3-.2-.5-.5-.5h-1.5c-.1-1.5-1.3-2.6-2.8-2.6-1.5 0-2.7 1.1-2.8 2.6h-1.5c-.3 0-.5.2-.5.5v10.4c0 .3.2.5.5.5h8.7c.3 0 .5-.2.5-.5v-1.1c-.3.1-.6.1-1 .1l-.2.6zm-3.9-12c1 0 1.8.7 1.9 1.6h-3.7c.1-.9.9-1.6 1.8-1.6z" />
        <path d="M13.736 9.901v-.4c0-.1 0-.2-.1-.3-.2-.7-.7-1.4-1.4-1.7-.1-.1-.2-.1-.3-.1h-.1c-.1 0-.1 0-.2-.1h-1.3c-.1 0-.2 0-.3.1-1.5.5-2.4 2.1-1.9 3.6 0 .1.1.2.1.3v.1c0 .1.1.1.1.2v.1c0 .1.1.1.1.2 0 0 0 .1.1.1 0 .1.1.1.1.2l.2.2h.1l.1.1.1.1.1.1s.1 0 .1.1c.1 0 .1.1.2.1h.1c.1 0 .2.1.2.1.1 0 .1.1.2.1h1.6c.1 0 .2 0 .3-.1h.1c.4-.2.8-.4 1.1-.8l.2-.2c0-.1.1-.1.1-.2s.1-.1.1-.2.1-.1.1-.2v-.1c0-.1 0-.1.1-.2v-1.2zm-1.7.9c0 .1-.1.3-.2.4-.1.1-.3.2-.4.3l.1.2v.3s0 .1-.1.1h-.2l-.1-.1v-.1l-.1-.2h-.4c-.1 0-.2-.1-.3-.1-.1-.1-.2-.1-.2-.2-.1-.1-.1-.2-.1-.2v-.2c0-.1.1-.1.2-.1h.2s.1 0 .1.1l.2.2.1.1h.2l-.2-.5-.1-.3v-.1h-.6c-.1 0-.3-.1-.4-.2-.1-.1-.2-.2-.2-.4-.1-.2-.1-.4 0-.6.1-.2.3-.4.5-.4l-.1-.2v-.1c0-.1 0-.2.1-.2h.1v.1l.1.3h.3c.1 0 .2.1.3.1.1 0 .1.1.2.2 0 .1.1.1.1.2v.2c0 .1-.1.1-.1.1h-.2v-.1c0-.1-.1-.1-.1-.1-.1-.1-.2-.1-.3-.1l.2.7v.1h.5c.1 0 .2 0 .3.1.1 0 .2.1.3.2.1.1.1.2.2.3.1-.1.1 0 .1.2z" />
        <path d="M10.436 9.001c-.1.1-.2.1-.2.2s-.1.2 0 .3c0 .1.1.1.1.2.1 0 .2.1.3.1v-.1l-.2-.7zm1 1.3c-.1-.1-.2-.1-.4-.1v.1l.2.7c.1-.1.2-.1.3-.2 0-.1.1-.2 0-.3 0-.1 0-.2-.1-.2z" />
      </g>
    </svg>
  );
};

SvgProductPriceAndSell.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPriceAndSell.displayName = 'ProductPriceAndSell';
export default SvgProductPriceAndSell;
