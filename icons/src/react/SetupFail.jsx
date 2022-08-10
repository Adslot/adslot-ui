import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSetupFail = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#DA4F49"
        d="M11.3 5.7c-.2-.2-.4-.2-.6 0L8.5 7.9 6.3 5.7c-.2-.2-.4-.2-.6 0-.2.2-.2.4 0 .6l2.2 2.2-2.2 2.2c-.2.2-.2.4 0 .6.1.1.2.1.3.1.1 0 .2 0 .3-.1l2.2-2.2 2.2 2.2c.1.1.2.1.3.1.1 0 .2 0 .3-.1.2-.2.2-.4 0-.6L9.1 8.5l2.2-2.2c.2-.2.2-.5 0-.6z"
      />
      <path
        fill="#DA4F49"
        d="M8.5 1.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-1c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"
      />
    </svg>
  );
};

SvgSetupFail.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSetupFail.displayName = 'SetupFail';
export default SvgSetupFail;
