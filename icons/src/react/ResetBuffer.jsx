import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgResetBuffer = (props) => {
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
      <path
        d="m15.2 10-2.3-3.2c-.1-.1-.2-.1-.3-.1-.1 0-.2.1-.3.1L10 10c-.1.1-.1.2 0 .4.1.1.2.2.3.2h1.3c-.3.5-.6.9-1.1 1.3-1 .9-2.3 1.3-3.6 1.1-1.3-.1-2.5-.7-3.4-1.7S2.3 8.9 2.4 7.6c.1-1.3.7-2.5 1.7-3.4S6.4 3 7.7 3.1c1.3.1 2.5.7 3.3 1.7.3.3.8.4 1.1.1.3-.3.4-.8.1-1.1-1.1-1.3-2.7-2.1-4.4-2.2-1.7-.3-3.4.3-4.7 1.4C1.7 4.1.9 5.7.8 7.4c-.1 1.7.4 3.4 1.5 4.8s2.7 2.2 4.5 2.3h.6c1.5 0 3-.5 4.2-1.5.8-.7 1.4-1.5 1.8-2.5h1.5c.1 0 .2-.1.3-.2.1-.1.1-.2 0-.3z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgResetBuffer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgResetBuffer.displayName = 'ResetBuffer';
export default SvgResetBuffer;
