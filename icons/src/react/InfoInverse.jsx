import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgInfoInverse = (props) => {
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
      <g fill="#5a5a5a">
        <path d="M8.1.8C4.1.8.8 4.1.8 8.1s3.3 7.3 7.3 7.3 7.3-3.3 7.3-7.3c-.1-4-3.3-7.3-7.3-7.3zm0 13.9A6.7 6.7 0 1 1 14.8 8c-.1 3.8-3.1 6.7-6.7 6.7z" />
        <path d="M8.1 6.2c1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8-1.9.8-1.9 1.8.9 1.8 1.9 1.8zm0-3c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zm2.1 8h-.3V7.3c0-.3-.2-.5-.5-.5h-3c-.2 0-.4.2-.5.4-.1.1-.2.3-.2.5 0 .5.3.9.8.9h.4v2.5h-.4c-.5 0-.8.4-.8.9 0 .6.3 1 .8 1h3.7c.3 0 .5-.1.6-.3.1-.2.2-.4.2-.6 0-.5-.3-.9-.8-.9zm0 1.2H6.5c-.2 0-.2-.2-.2-.3 0 0 0-.3.2-.3h.7c.2 0 .3-.1.3-.3V8.3c0-.1-.1-.3-.3-.3h-.7c-.2 0-.2-.2-.2-.3 0 0 0-.3.2-.3h2.8v4c0 .2.1.3.3.3h.6c.2 0 .2.3.2.3 0 .1 0 .4-.2.4z" />
      </g>
    </svg>
  );
};

SvgInfoInverse.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgInfoInverse.displayName = 'InfoInverse';
export default SvgInfoInverse;
