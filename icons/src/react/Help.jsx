import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgHelp = (props) => {
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
      <path d="M8 2.5c3 0 5.5 2.5 5.5 5.5S11 13.5 8 13.5 2.5 11 2.5 8 5 2.5 8 2.5m0-.7C4.5 1.8 1.8 4.5 1.8 8s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2S11.5 1.8 8 1.8z" />
      <path d="M7.4 9.5c0-.4.1-.8.2-1s.3-.5.6-.8c.3-.3.5-.5.6-.7.2-.2.2-.4.2-.6 0-.3-.1-.5-.2-.7-.2-.1-.4-.2-.7-.2-.3 0-.5.1-.7.2-.1.2-.2.4-.2.6H6.1c0-.6.2-1 .6-1.3s.9-.5 1.5-.5 1.1.2 1.5.5c.4.3.5.8.5 1.4 0 .5-.2 1-.7 1.5l-.6.6c-.2.2-.4.6-.4 1H7.4zm0 1.5c0-.2.1-.3.2-.5s.3-.2.5-.2.4.1.5.2c.1.1.2.3.2.5s-.1.3-.2.4-.4.2-.6.2-.4-.1-.5-.2c-.1-.1-.1-.2-.1-.4z" />
    </svg>
  );
};

SvgHelp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgHelp.displayName = 'Help';
export default SvgHelp;
