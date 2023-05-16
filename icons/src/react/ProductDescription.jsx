import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductDescription = (props) => {
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
        <path d="M13.5.7h-11C1.5.7.8 1.5.8 2.4v11.1c0 1 .8 1.7 1.7 1.7h11.1c1 0 1.7-.8 1.7-1.7v-11c0-1-.8-1.8-1.8-1.8zm1.2 12.8c0 .6-.5 1.1-1.1 1.1H2.5c-.6 0-1.1-.5-1.1-1.1v-11c0-.6.5-1.1 1.1-1.1h11.1c.6 0 1.1.5 1.1 1.1v11z" />
        <path d="M11.9 3.8H4.1c-.2 0-.3.1-.3.3 0 .2.1.3.3.3H12c.2 0 .3-.1.3-.3-.1-.2-.2-.3-.4-.3zm0 2.4H4.1c-.2 0-.3.1-.3.3 0 .2.1.3.3.3H12c.2 0 .3-.1.3-.3-.1-.2-.2-.3-.4-.3zm0 2.4H4.1c-.2 0-.3.1-.3.3 0 .2.1.3.3.3H12c.2 0 .3-.1.3-.3-.1-.2-.2-.3-.4-.3zm0 2.4H4.1c-.2 0-.3.1-.3.3 0 .2.1.3.3.3H12c.2 0 .3-.1.3-.3-.1-.1-.2-.3-.4-.3z" />
      </g>
    </svg>
  );
};

SvgProductDescription.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductDescription.displayName = 'ProductDescription';
export default SvgProductDescription;
