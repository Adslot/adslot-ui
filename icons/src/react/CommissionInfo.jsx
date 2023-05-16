import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCommissionInfo = (props) => {
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
        fill="#666"
        d="M6.5 6.2c0-.6-.5-1.2-1-1.2-.6 0-1 .5-1 1.2s.5 1.2 1 1.2c.6 0 1-.6 1-1.2zm-1.4 0c0-.3.2-.5.4-.5s.4.3.4.5c0 .3-.2.5-.4.5s-.4-.2-.4-.5zM9.3 11c.6 0 1-.5 1-1.2s-.5-1.2-1-1.2c-.6 0-1 .5-1 1.2s.4 1.2 1 1.2zm0-1.7c.2 0 .4.3.4.5 0 .3-.2.5-.4.5s-.4-.2-.4-.5.2-.5.4-.5zM5.5 11c.1 0 .2 0 .3-.1l3.8-5.3c.1-.1.1-.3-.1-.4-.1-.1-.3-.1-.4 0l-3.8 5.3c-.1.1-.1.3.1.4 0 .1 0 .1.1.1z"
      />
      <path
        fill="#666"
        d="M15.4 6.9c-.1-.1-.3-.1-.4 0l-.7.7c-.1-1.6-.7-3.1-1.9-4.3-1.3-1.4-3-2.1-4.9-2.1C3.7 1.2.6 4.2.6 8s3.1 6.8 6.8 6.8c2.5 0 4.7-1.3 5.9-3.5.1-.2 0-.3-.1-.4-.2-.1-.3 0-.4.1-1.1 2-3.2 3.2-5.4 3.2-3.4 0-6.2-2.8-6.2-6.2S4 1.8 7.4 1.8c1.7 0 3.3.7 4.5 1.9 1 1.1 1.6 2.4 1.7 3.9l-.9-.8c-.1-.1-.3-.1-.4 0-.1.1-.1.3 0 .4l1.4 1.2h.4l1.2-1.2c.2 0 .2-.2.1-.3z"
      />
    </svg>
  );
};

SvgCommissionInfo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCommissionInfo.displayName = 'CommissionInfo';
export default SvgCommissionInfo;
