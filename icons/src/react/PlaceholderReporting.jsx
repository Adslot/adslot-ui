import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlaceholderReporting = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#4FA9C7"
        d="M78.3 40.9 62.5 62c1.4.5 2.6 1.4 3.5 2.7l15.9-21.1c-1.5-.5-2.7-1.5-3.6-2.7zm-37.1 0c-.8 1.2-2.1 2.2-3.5 2.7L54 64.7c.8-1.2 2.1-2.2 3.5-2.7L41.2 40.9zm-12.8-1.2L19 47.9c1.2.8 2.2 2 2.7 3.4l9.5-8.3c-1.2-.8-2.2-2-2.8-3.3z"
      />
      <path
        fill="#76C8B3"
        d="M39.7 39.1c.4-.7.7-1.6.7-2.4 0-2.9-2.3-5.2-5.2-5.2S30 33.8 30 36.7c0 .5.1 1 .2 1.5.4 1.5 1.5 2.7 2.8 3.3.7.3 1.4.5 2.2.5.4 0 .8-.1 1.2-.2 1.4-.4 2.7-1.4 3.3-2.7zm24.9 27.4-.6-.9-.7-.7-.1-.1c-.2-.2-.5-.3-.8-.5-.1 0-.1-.1-.2-.1-.3-.2-.7-.2-1.1-.3-.3-.1-.7-.1-1.1-.1-.8 0-1.6.2-2.2.5 0 0-.1 0-.1.1-.3.2-.6.3-.8.5l-.1.1-.7.7c-.2.2-.4.6-.6.8v.1c-.4.7-.7 1.5-.7 2.4 0 2.9 2.3 5.2 5.2 5.2s5.2-2.3 5.2-5.2c0-.9-.2-1.8-.6-2.5zm19.9-35c-2.9 0-5.2 2.3-5.2 5.2 0 .8.2 1.7.6 2.3.7 1.3 1.9 2.3 3.4 2.7.4.1.8.2 1.2.2 2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2zM17.3 49.4c-.7-.3-1.5-.6-2.3-.6-2.9 0-5.2 2.3-5.2 5.2s2.3 5.2 5.2 5.2 5.2-2.3 5.2-5.2c0-.4-.1-.8-.2-1.2-.4-1.5-1.4-2.6-2.7-3.4z"
      />
    </svg>
  );
};

SvgPlaceholderReporting.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlaceholderReporting.displayName = 'PlaceholderReporting';
export default SvgPlaceholderReporting;
