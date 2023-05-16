import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMap = (props) => {
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
      <path d="m36.2 5.8-8.4-1.4c-.1 0-.3 0-.4.1L19.5 8 13 5c-.2-.1-.4-.1-.5 0L4.3 8.1c-.3.1-.5.3-.5.6v20.9c0 .2.1.4.3.6.1.1.3.1.4.1h.2l7.9-3 6.3 2.8c.3.2.8 0 .9-.3.2-.3 0-.8-.3-.9l-6.5-3c-.2-.1-.4-.1-.5 0l-7.2 2.7V9.2l7.4-2.8 6.6 3c.2.1.4.1.6 0l7.9-3.6L35.4 7v19.4l-1.9-.4c-.4-.1-.7.2-.8.5-.1.4.2.7.5.8l2.8.5c.2 0 .4 0 .6-.1.2-.1.2-.3.2-.5V6.5c0-.4-.3-.7-.6-.7z" />
      <path d="M12 9.6v13.2c0 .4.3.7.7.7s.7-.3.7-.7V9.6c0-.4-.3-.7-.7-.7-.4.1-.7.4-.7.7zM20.2 17.3v-5c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v5c0 .4.3.7.7.7.4-.1.7-.4.7-.7zM28.5 15.4V8.7c0-.4-.3-.7-.7-.7s-.7.3-.7.7v6.7c0 .4.3.7.7.7s.7-.3.7-.7zM25.7 18.1c-3.6 0-6.5 2.9-6.5 6.4 0 3.3 5.3 11.4 5.9 12.3.1.2.3.3.6.3.2 0 .4-.1.6-.3.6-.9 5.9-9 5.9-12.3 0-3.5-2.9-6.4-6.5-6.4zm0 17c-1.8-2.9-5.1-8.5-5.1-10.6 0-2.8 2.3-5.1 5.1-5.1s5.1 2.3 5.1 5.1c0 2.2-3.2 7.8-5.1 10.6z" />
      <path d="M25.7 22c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1c.1-1.2-.9-2.1-2.1-2.1zm0 2.8c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7s.7.3.7.7c.1.4-.3.7-.7.7z" />
    </svg>
  );
};

SvgMap.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMap.displayName = 'Map';
export default SvgMap;
