import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdserverThirdparty = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M35.7 16.1H4.2c-.7 0-1.1.4-1.1 1.1V26c0 .7.4 1.1 1.1 1.2h14.6v2.9c-.4.3-.7.9-.7 1.5 0 1 .8 1.9 1.9 1.9 1 0 1.9-.8 1.9-1.9 0-.6-.2-1.1-.8-1.6v-2.9h14.5c.7 0 1.2-.6 1.2-1.1v-8.8c0-.7-.4-1.1-1-1.2.1.1-.1.1-.1.1zM34.6 25H5.5v-6.5h29l.1 6.5z" />
      <path d="M30.6 23.7c1 0 1.9-.9 1.9-1.9 0-1-.9-1.9-1.9-1.9-1 0-1.9.9-1.9 1.9 0 1.1.9 1.9 1.9 1.9zm0-2.4c.2 0 .4.2.4.4s-.2.4-.4.4-.4-.2-.4-.4.2-.4.4-.4zM35.7 3H4.2c-.6 0-1.1.4-1.1 1.1V13c0 .7.4 1.1 1 1.1h31.6c.7 0 1.1-.4 1.1-1V4.2c0-.7-.4-1.1-1-1.2h-.1zm-1.1 8.9H5.5V5.3h29l.1 6.6z" />
      <path d="M30.6 10.6c1 0 1.9-.9 1.9-1.9s-.9-1.9-1.9-1.9c-1 0-1.9.9-1.9 1.9s.9 1.9 1.9 1.9zm0-2.5c.2 0 .4.2.4.4s-.2.4-.4.4-.4-.2-.4-.4c0-.1.2-.3.4-.4 0 .1 0 .1 0 0zm4.9 22.5h-2.8c-.7 0-1.1.6-1.1 1.2 0 .7.6 1.1 1.1 1.1h2.8c.7 0 1.1-.6 1.1-1.1 0-.7-.4-1.2-1.1-1.2zm-7 0h-2.9c-.7 0-1.1.6-1.1 1.2 0 .7.6 1.1 1.1 1.1h2.8c.7 0 1.1-.6 1.1-1.2.1-.6-.5-1.1-1-1.1zm-14.1 0h-2.9c-.7 0-1.2.6-1.2 1.2 0 .7.6 1.1 1.2 1.1h2.9c.7 0 1.1-.6 1.1-1.2s-.4-1.1-1.1-1.1zm-7 0H4.5c-.7 0-1.2.6-1.2 1.2 0 .7.6 1.1 1.2 1.1h2.8c.7 0 1.2-.6 1.2-1.2s-.6-1.1-1.1-1.1z" />
    </svg>
  );
};

SvgAdserverThirdparty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdserverThirdparty.displayName = 'AdserverThirdparty';
export default SvgAdserverThirdparty;
