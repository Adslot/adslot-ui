import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdFormatDisplay = (props) => {
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
        fill="#6D6E71"
        d="M13.7 11.5V3.9c0-.3-.2-.5-.5-.5H2.7c-.3 0-.5.2-.5.5v7.6H.7v.6c0 .3.2.5.5.5h13.6c.3 0 .5-.2.5-.5v-.6h-1.6zm-4.7.2H7v-.3h2v.3zm3.7-.8H3.2V4.4h9.5v6.5z"
      />
    </svg>
  );
};

SvgAdFormatDisplay.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdFormatDisplay.displayName = 'AdFormatDisplay';
export default SvgAdFormatDisplay;
