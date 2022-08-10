import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEmptyGridIcon = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 150"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        d="M35.6 92.5H51v5.8H35.6zm-16.1 0h15.4v5.8H19.5zm-16.3 0h15.4v5.8H3.2zm48.7 0h15.2v5.8H51.9zm16 0h15.2v5.8H67.9zm32 0h15v5.8h-15zm15.8 0h15.2v5.8h-15.2zm16.1 0H147v5.8h-15.2zM2.8 64.4h144.6v9.2H2.8z"
        fill="#f2f2f2"
      />
      <path
        fill="none"
        d="M98.9 92.8h-31V98h46.9v-5.2H99.9zm-95.7 0h15.4v5.3H3.2zm112.5 0V98h15.2v-5.2zM19.4 73.2h127.5v-8.3H3.2v8.3h15.4zm112.4 19.6H147v5.3h-15.2zm-79.9 0h15.2v5.3H51.9zm-16.3 0H51v5.3H35.6zm-16.1 0h15.4v5.3H19.5z"
      />
      <path
        fill="#fff"
        d="M87.6 127.4h-.1c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.5 1-1 1zm2.5 0H90c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.4 1-1 1zm3.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.5 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.7-.4 1-1 1zm9.2 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.7-.4 1-1 1zm3.7 0h-.1c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.5 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.4 1-1 1zm16.2-2h.1c.6 0 1 .4 1 1 0 .7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.4-1 1-1zm-2.7 0c.7 0 1.1.4 1.1 1 0 .7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.5-1 1-1zm-3.6 0c.7 0 1.1.4 1.1 1-.1.7-.6 1-1 1h-.1c-.6 0-1-.4-1-1s.5-1 1-1zm-2.6 0h.1c.6 0 1 .4 1 1 .1.7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.4-1 1-1zm25.1 0c.7 0 1.1.4 1.1 1 0 .7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.5-1 1-1zm-2.6 0h.1c.6 0 1 .4 1 1 0 .7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.4-1 1-1zm-3.7 0c.7 0 1.1.4 1.1 1 0 .7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.4-1 1-1zm-2.6 0c.7 0 1.1.4 1.1 1 0 .7-.4 1-1 1h-.1c-.6 0-1-.4-1-1s.5-1 1-1zm-80 2c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.7-.4 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.5 1-1 1zm3.6 0h-.2c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.7-.3 1-.9 1zm2.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 0 .7-.4 1-1 1z"
      />
      <path
        fill="#e8e7e7"
        d="M38.2 127.4h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H38.2c-.6 0-1 .4-1 1s.4 1 1 1zm-6-2H22c-.6 0-1 .4-1 1s.4 1 1 1h10.1c.6 0 .9-.3 1-1 .1-.5-.4-1-.9-1zm-16.4 0H5.7c-.6 0-1 .4-1 1s.4 1 1 1h10.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm39.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1.1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.5 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.2c.6 0 1-.3.9-1 0-.5-.4-1-1-1zm2.8 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.7 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7.4 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.5 0H90c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm3.7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.4 0 1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.7 0 1.1-.3 1-1 0-.5-.5-1-1-1zm9.2 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1.1-.3 1-1 0-.5-.4-1-1-1zm3.7 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7.3 2h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm-96-8.2H38.2c-.6 0-1 .4-1 1s.4 1 1 1h10.1c.6 0 1-.3 1-1 0-.6-.5-1-1-1zm-26.3 2h10.1c.6 0 .9-.3 1-1 0-.6-.4-1-1-1H22c-.6 0-1 .4-1 1s.5 1 1 1zm-16.3 0h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.6 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.5 0h.2c.6 0 1-.3.9-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.8 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.6 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.5 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H90c-.6 0-1 .4-1 1s.5 1 1 1zm3.7 0c.6 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.8 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm9.2 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm-96-8.3H38.2c-.6 0-1 .4-1 1s.4 1 1 1h10.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm-16.1 0H22c-.6 0-1 .4-1 1s.4 1 1 1h10.1c.6 0 .9-.3 1-1 .1-.5-.4-1-.9-1zm-26.5 2h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.7-2c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1.1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.5 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.2c.6 0 1-.3.9-1 0-.5-.4-1-1-1zm2.8 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.7 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7.4 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.5 0H90c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm3.7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.4 0 1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.7 0 1.1-.3 1-1 0-.5-.5-1-1-1zm9.1 2c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm-106.1-6.2h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H38.2c-.6 0-1 .4-1 1s.4 1 1 1zm-16.2 0h10.1c.6 0 .9-.3 1-1 0-.6-.4-1-1-1H22c-.6 0-1 .4-1 1s.5 1 1 1zm-16.3 0h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.7-2c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1.1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.5 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.2c.6 0 1-.3.9-1 0-.5-.4-1-1-1zm2.8 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.7 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7.3 2h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.5 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H90c-.6 0-1 .4-1 1s.5 1 1 1zm3.7 0c.6 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.8 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm9.2 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm-106.1-6.2h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H38.2c-.6 0-1 .4-1 1s.4 1 1 1zm-16.2 0h10.1c.6 0 .9-.3 1-1 0-.6-.4-1-1-1H22c-.6 0-1 .4-1 1s.5 1 1 1zm-16.3 0h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.7-2c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.5-1-1-1zm3.5 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.2c.6 0 1-.3.9-1 0-.6-.4-1-1-1zm2.8 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1zm7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.5-1-1-1zm3.7 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.5-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1zm7.4 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.5-1-1-1zm2.5 0H90c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1zm3.7 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.4 0 1-.3 1-1 0-.6-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.7 0 1.1-.3 1-1 0-.6-.5-1-1-1zm9.1 2c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zM38.2 90.1h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H38.2c-.6 0-1 .4-1 1s.4 1 1 1zm-6-2H22c-.6 0-1 .4-1 1s.4 1 1 1h10.1c.6 0 .9-.3 1-1 .1-.5-.4-1-.9-1zm-26.5 2h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.6 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.5 0h.2c.6 0 1-.3.9-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.8 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.1-2c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm3.7 0h-.1c-.6 0-1 .4-1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.5-1-1-1zm2.6 0c-.7 0-1.1.4-1.1 1s.4 1 1 1h.1c.6 0 1-.3 1-1 0-.5-.4-1-1-1zm7.3 2h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.5 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H90c-.6 0-1 .4-1 1s.5 1 1 1zm3.7 0c.6 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.8 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm9.2 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zM38.2 83.9h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H38.2c-.6 0-1 .4-1 1s.4 1 1 1zm-16.2 0h10.1c.6 0 .9-.3 1-1 0-.6-.4-1-1-1H22c-.6 0-1 .4-1 1s.5 1 1 1zm-16.3 0h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.6 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.5 0h.2c.6 0 1-.3.9-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.8 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.6 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.5 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H90c-.6 0-1 .4-1 1s.5 1 1 1zm3.7 0c.6 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.8 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm9.2 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zM38.2 77.7h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H38.2c-.6 0-1 .4-1 1s.4 1 1 1zm-16.2 0h10.1c.6 0 .9-.3 1-1 0-.6-.4-1-1-1H22c-.6 0-1 .4-1 1s.5 1 1 1zm-16.3 0h10.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1s.4 1 1 1zm49.6 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.5 0h.2c.6 0 1-.3.9-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.8 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.6 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.5 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1H90c-.6 0-1 .4-1 1s.5 1 1 1zm3.7 0c.6 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.8 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm9.2 0c.7 0 1.2-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm7.4 0h.1c.6 0 1.1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.6 0 1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm3.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm7.3 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm3.7 0h.1c.6 0 1-.3 1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.4 1 1 1zm2.6 0c.7 0 1.1-.3 1.1-1 0-.6-.4-1-1-1h-.1c-.6 0-1 .4-1 1s.5 1 1 1z"
      />
      <path fill="#fff" d="M3.2 130.1h47.7v2H3.2z" />
      <path
        fill="#e8e7e7"
        d="M2.3 64v69h145.4V64H2.3zm.9.9H147v8.5H3.2v-8.5zM131.8 98v-5.3H147V98h-15.2zm-.9 31.2h-15.2v-5.3h15.2v5.3zm-80 0H35.6v-5.3H51v5.3h-.1zM3.2 98v-5.3h15.4V98H3.2zm112.6 0h-.1v-5.3H131V98h-15.2zm-1 25h-15v-5.5h15.1v5.5h-.1zm-15.9 0h-15v-5.5H99v5.5h-.1zM83 123H67.9v-5.5h15.2v5.5H83zm-16 0H51.9v-5.5h15.2v5.5H67zm-32.3 0H19.5v-5.5h15.4v5.5h-.2zm80.1-30.2V98H67.9v-5.3h46.9v.1zm-95.3 18.6h15.4v5.5H19.5v-5.5zm16.1 0H51v5.5H35.6v-5.5zM19.5 98v-5.3h15.4V98H19.5zm0-11.4h15.4V92H19.5v-5.4zM67.9 99h15.2v5.3H67.9V99zm-16 0h15.2v5.3H51.9V99zM67 98H51.9v-5.3h15.2V98H67zm-31.4 0v-5.3H51V98H35.6zm16.3 7.2h15.2v5.5H51.9v-5.5zm16 0h15.2v5.5H67.9v-5.5zm0-13.3v-5.5h15.2v5.5H67.9zm-.9 0H51.9v-5.5h15.2v5.5H67zm-16.1 0H35.6v-5.5H51v5.5h-.1zm0 7.1v5.3H35.6V99h15.3zm0 6.2v5.5H35.6v-5.5h15.3zm1 6.2h15.2v5.5H51.9v-5.5zm16 0h15.2v5.5H67.9v-5.5zm16 0H99v5.5H83.9v-5.5zm15-.9h-15V105H99v5.5h-.1zm-15-6.2v-5.5H99v5.5H83.9zm15-12.4h-15v-5.5H99v5.5h-.1zm0-6.2h-15v-5.5H99v5.5h-.1zm-15.9 0H67.9v-5.5h15.2v5.5H83zm-16 0H51.9v-5.5h15.2v5.5H67zm-16.1 0H35.6v-5.5H51v5.5h-.1zm-16.2 0H19.5v-5.5h15.4v5.5h-.2zm0 13.3v5.3H19.5V99h15.2zm0 6.2v5.5H19.5v-5.5h15.2zm.9 12.4H51v5.5H35.6v-5.5zm79.2-.9h-15v-5.3h15.1v5.3h-.1zm0-6.2h-15V105h15.1v5.5h-.1zm0-6.2h-15v-5.5h.1v.1h15v5.3h-.1zm0-12.4h-15v-5.5h15.1v5.5h-.1zm0-6.2h-15v-5.5h15.1v5.5h-.1zm0-6.2h-15V74h15.1v5.5h-.1zm-15.9 0h-15V74H99v5.5h-.1zm-15.9 0H67.9V74h15.2v5.5H83zm-16 0H51.9V74h15.2v5.5H67zm-16.1 0H35.6V74H51v5.5h-.1zm-16.2 0H19.5V74h15.4v5.5h-.2zm-15.2 44.4h15.4v5.3H19.5v-5.3zm32.4 0h15.2v5.3H51.9v-5.3zm16 0h15.2v5.3H67.9v-5.3zm16 0H99v5.3H83.9v-5.3zm15.9 0h15.1v5.3H99.8v-5.3zm31.1-.9h-15.2v-5.5h15.2v5.5zm0-6.3h-15.2v-5.3h15.2v5.3zm0-6.2h-15.2V105h15.2v5.5zm0-6.2h-15.2V99h15.2v5.3zm0-12.4h-15.2v-5.5h15.2v5.5zm0-6.2h-15.2v-5.5h15.2v5.5zm0-6.2h-15.2V74h15.2v5.5zM18.5 74.1v5.5H3.2v-5.5h15.3zm0 6.2v5.5H3.2v-5.5h15.3zm0 6.3V92H3.2v-5.5h15.3zm0 12.4v5.3H3.2V99h15.3zm0 6.2v5.5H3.2v-5.5h15.3zm0 6.2v5.5H3.2v-5.5h15.3zm0 6.2v5.5H3.2v-5.5h15.3zm-15.3 6.3h15.4v5.3H3.2v-5.3zM51 132H3.2v-2H51v2zm95.9 0h-95v-2H147v2h-.1zm0-2.8h-15.2v-5.3h15.2v5.3zm0-6.2h-15.2v-5.5h15.2v5.5zm0-6.3h-15.2v-5.3h15.2v5.3zm0-6.2h-15.2V105h15.2v5.5zm0-6.2h-15.2V99h15.2v5.3zm0-12.4h-15.2v-5.5h15.2v5.5zm0-6.2h-15.2v-5.5h15.2v5.5zm0-6.2h-15.2V74h15.2v5.5z"
      />
      <path
        fill="#e8e7e7"
        d="M93.4 132.3h-4.7c-.8 0-1.3-.7-1.3-1.3 0-.8.7-1.3 1.3-1.3h4.7c.8 0 1.3.7 1.3 1.3 0 .6-.6 1.3-1.3 1.3zM48.3 96.4H38.2c-.6 0-1-.4-1-1s.4-1 1-1h10.1c.6 0 1 .4 1 1s-.5 1-1 1zm-16.1 0H22c-.6 0-1-.4-1-1s.4-1 1-1h10.1c.6 0 1 .4 1 1-.1.6-.4 1-.9 1zm-16.4 0H5.7c-.6 0-1-.4-1-1s.4-1 1-1h10.1c.6 0 1 .4 1 1s-.4 1-1 1zm39.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.6-.4 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm3.6 0h-.2c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.6-.3 1-.9 1zm2.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm3.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm25.4 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.6-.4 1-1 1zm3.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm7.4 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.6-.5 1-1 1zm2.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1-.1.6-.6 1-1 1zm3.5 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm2.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm7.3 0h-.1c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm2.6 0h-.1c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm3.7 0h-.1c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm2.6 0h-.1c-.6 0-1-.4-1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1z"
      />
      <path d="M99.8 92.7v-.8H83V99h16.9v-6.3zm-.8 5.4H83.8v-5.5H99v5.5z" fill="#2a6db5" />
      <path
        fill="#e8e7e7"
        d="M87.6 96.4c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm2.5 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.4 1-1 1zm3.7 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1s-.5 1-1 1zm2.6 0c-.7 0-1.1-.4-1.1-1s.4-1 1-1h.1c.6 0 1 .4 1 1 .1.6-.4 1-1 1z"
      />
      <circle fill="#5a5b5b" cx={9.9} cy={57.2} r={2.2} />
      <circle fill="#5a5b5b" cx={16.9} cy={57.2} r={2.2} />
      <circle fill="#5a5b5b" cx={23.9} cy={57.2} r={2.2} />
      <path
        fill="none"
        d="M3.3 50.5h143.4V64H3.3zm0 91.4c0 2.1 1.7 3.8 3.8 3.8h135.8c2.1 0 3.8-1.7 3.8-3.8V65H3.3v76.9z"
      />
      <path
        fill="#5a5b5b"
        d="M147.1 49.2H2.8c-.1 0-.2 0-.3.1h-.3v.1c-.1.2-.2.3-.2.6v91.9c0 2.8 2.2 5.1 5.1 5.1h135.8c2.8 0 5.1-2.2 5.1-5.1V50.1c0-.5-.4-.9-.9-.9zm-.4 1.3V64H3.3V50.5h143.4zm0 91.4c0 2.1-1.7 3.8-3.8 3.8H7.1c-2.1 0-3.8-1.7-3.8-3.8V65h143.3v76.9z"
      />
    </svg>
  );
};

SvgEmptyGridIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEmptyGridIcon.displayName = 'EmptyGridIcon';
export default SvgEmptyGridIcon;
