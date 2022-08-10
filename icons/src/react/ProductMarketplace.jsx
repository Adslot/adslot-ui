import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductMarketplace = (props) => {
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
      <path fill="none" d="M1 1h14v14H1z" />
      <path
        d="m14.9 4.9-1.8-2V1.8c0-.2-.1-.3-.3-.3H3.1c-.1 0-.3.2-.3.3v1.1L1 4.9v.2c0 1.7 2.2 2.1 3 1 .3.4.8.7 1.3.7s1-.2 1.3-.7c.6.9 2.1.9 2.7 0 .6.9 2.1.9 2.7 0 .3.4.8.7 1.3.7.4 0 .8-.1 1.1-.4.4-.4.6-.8.6-1.3 0-.1 0-.1-.1-.2zm-2.3-2.8v.6H3.4v-.6h9.2zm1.5 3.8c-.2.2-.5.3-.7.3-.5 0-1-.3-1-1 0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3 0 .7-.5 1-1 1s-1-.3-1-1c0-.2-.1-.3-.3-.3-.3-.1-.5 0-.5.2 0 .7-.5 1-1 1s-1-.3-1-1c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3 0 .7-.5 1-1 1s-1-.3-1-1c0-.2-.1-.3-.3-.3s-.4.1-.4.3c0 .7-.5 1-1 1s-1-.3-1-.9l1.7-1.9h9.5l1.7 1.9c-.2.3-.3.5-.5.7zM13 7.5c-.2 0-.3.1-.3.3v2.5H3.2V7.8c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3v6.3c0 .2.1.3.3.3H13c.2 0 .3-.1.3-.3V7.8c0-.2-.1-.3-.3-.3zm-.3 6.4H3.2v-3h9.5v3z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgProductMarketplace.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductMarketplace.displayName = 'ProductMarketplace';
export default SvgProductMarketplace;
