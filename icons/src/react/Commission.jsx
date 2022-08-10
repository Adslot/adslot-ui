import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCommission = (props) => {
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
        fill="#6d6e71"
        d="M6.5 6.6c0-.5-.4-.9-.8-.9s-.8.4-.8.9.4.9.8.9.8-.4.8-.9zm-1.1 0c0-.2.1-.4.3-.4.1 0 .3.2.3.4s-.2.4-.3.4c-.2 0-.3-.2-.3-.4zm3.2 3.7c.4 0 .8-.4.8-.9s-.4-.9-.8-.9-.7.4-.7.9.3.9.7.9zm0-1.3c.2 0 .3.2.3.4s-.1.4-.3.4c-.2 0-.3-.2-.3-.4s.2-.4.3-.4zm-2.9 1.3c.1 0 .1 0 .2-.1l3-4.1c0-.1 0-.2-.1-.3-.1-.1-.3-.1-.4 0l-3 4.1c-.1.1-.1.3.1.3.1.1.1.1.2.1z"
      />
      <path
        fill="#6d6e71"
        d="M15.4 5.6c-.1-.1-.2-.2-.3-.2h-1.6c-.4-1-1-1.9-1.9-2.6-1.2-1-2.7-1.6-4.3-1.6h-.6C5 1.5 3.4 2.3 2.2 3.7S.5 6.8.7 8.6c.2 1.8 1 3.4 2.4 4.5 1.4 1.2 3.1 1.7 4.9 1.6 1.7-.1 3.3-1 4.5-2.3.3-.3.3-.9-.1-1.2-.3-.3-.9-.3-1.2.1-.9 1-2.1 1.6-3.4 1.7-1.3.1-2.6-.3-3.7-1.2-1-.9-1.7-2.1-1.8-3.4-.1-1.3.3-2.6 1.2-3.6.9-1 2.1-1.7 3.4-1.8 1.3-.1 2.6.3 3.7 1.2.4.3.8.8 1.1 1.2h-1.3c-.1 0-.3.1-.3.2-.1.1 0 .3 0 .4l2.4 3.3c.1.1.2.1.3.1.1 0 .2-.1.3-.1L15.4 6c.1-.1.1-.2 0-.4z"
      />
    </svg>
  );
};

SvgCommission.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCommission.displayName = 'Commission';
export default SvgCommission;
