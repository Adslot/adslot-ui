import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMarketplace20210412 = (props) => {
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
      <path d="m15.1 4.9-1.8-2.1V1.7c0-.2-.1-.3-.3-.3H3c-.2 0-.3.1-.3.3v1.1L.8 4.9c0 .1-.1.1-.1.2 0 1.8 2.2 2.2 3.1 1 .3.4.9.7 1.4.7.5 0 1.1-.2 1.4-.7.7.9 2.1.9 2.8 0 .6.9 2.1.9 2.7 0 .3.4.9.7 1.4.7.4 0 .8-.1 1.2-.4.4-.3.5-.7.5-1.3 0 0 0-.1-.1-.2zM12.7 2v.6H3.3V2h9.4zm1.6 3.9c-.2.2-.5.3-.8.3-.5 0-1.1-.3-1.1-1.1 0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3 0 .7-.5 1.1-1.1 1.1-.5 0-1.1-.3-1.1-1.1 0-.2-.1-.3-.3-.3-.1 0-.2.2-.2.3 0 .7-.5 1.1-1.1 1.1-.5 0-1.1-.3-1.1-1.1 0-.2-.1-.3-.3-.3-.2 0-.3.2-.3.3 0 .7-.5 1.1-1.1 1.1-.5 0-1.1-.3-1.1-1.1 0-.1-.1-.3-.3-.3-.1 0-.3.2-.3.3 0 .7-.5 1.1-1.1 1.1-.5 0-1-.3-1.1-1l1.7-2h9.8l1.7 2c.1.3 0 .6-.2.7zm-1.1 1.7c-.2 0-.3.1-.3.3v2.6H3.1V7.9c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3v6.6c0 .2.1.3.3.3h10.4c.2 0 .3-.1.3-.3V7.9c0-.1-.1-.3-.3-.3zm-.3 6.6H3.1v-3.1h9.8v3.1z" />
    </svg>
  );
};

SvgMarketplace20210412.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMarketplace20210412.displayName = 'Marketplace20210412';
export default SvgMarketplace20210412;
