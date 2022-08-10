import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgInternal = (props) => {
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
      <path d="M5.9 10.1c.9.3 1.4-.1 1.4-.1.1-.1.1-.2 0-.3l-1.9-1c-.1-.1-.2 0-.2.1s-.2 1 .7 1.3zm4.2 0c.9-.3.7-1.3.7-1.3 0-.1-.1-.2-.2-.1L8.8 9.8c-.1.1-.1.2 0 .3-.1 0 .4.4 1.3 0z" />
      <path d="M15 6.8h-2.3c-.1-.4-.2-.9-.3-1.3-.4-2-.8-4.2-2.4-4.2-.6 0-1 .3-1.3.5-.2.2-.4.4-.7.4s-.5-.2-.8-.4c-.3-.2-.7-.5-1.3-.5-1.6 0-2 2.1-2.4 4.2-.1.4-.2.8-.3 1.3H1c-.3 0-.5.2-.5.4s.2.5.5.5h2.2v2.2c0 2.6 2.2 4.8 4.8 4.8s4.8-2.2 4.8-4.8V7.7H15c.3 0 .5-.2.5-.5s-.2-.4-.5-.4zM4.4 5.6C4.7 4 5 2.2 5.9 2.2c.3 0 .5.1.8.3.2.3.6.6 1.3.6.7 0 1.1-.3 1.4-.5.3-.2.4-.3.8-.3.8 0 1.2 1.7 1.5 3.4.1.4.1.8.2 1.1H4.2c.1-.4.1-.8.2-1.2zm7.5 4.3c0 2.1-1.7 3.9-3.9 3.9S4.1 12 4.1 9.9V7.7h7.7v2.2h.1z" />
    </svg>
  );
};

SvgInternal.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgInternal.displayName = 'Internal';
export default SvgInternal;
