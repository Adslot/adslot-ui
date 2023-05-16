import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPropose = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M28.7 5.7h-3.8V3.6c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v2.1h-2.9V3.6c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v2.1h-2.9V3.6c0-.4-.3-.7-.7-.7s-.7.3-.7.7v2.1h-3.8c-2.1 0-4 1.9-4 4.1V33c0 2.3 1.8 4.1 4.1 4.1h17.5c2.3 0 4.1-1.8 4.1-4.1V9.8c0-2.2-1.8-4.1-4.1-4.1zM31.4 33c0 1.5-1.2 2.7-2.7 2.7H11.2c-1.5 0-2.7-1.2-2.7-2.7V9.8c0-1.5 1.2-2.7 2.7-2.7H15v.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7v-.6h2.9v.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7v-.7h2.9v.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7v-.7h3.8c1.5 0 2.7 1.2 2.7 2.7V33h-.1z" />
      <path d="M26.3 14.3H13.5c-.4 0-.7.3-.7.7s.3.7.7.7h12.7c.4 0 .7-.3.7-.7.1-.4-.2-.7-.6-.7zM26.3 20H13.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h12.7c.4 0 .7-.3.7-.7.1-.4-.2-.7-.6-.7zM26.3 25.7H13.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h12.7c.4 0 .7-.3.7-.7.1-.4-.2-.7-.6-.7z" />
    </svg>
  );
};

SvgPropose.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPropose.displayName = 'Propose';
export default SvgPropose;
