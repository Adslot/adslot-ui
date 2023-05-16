import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdserver = (props) => {
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
      <path d="M1 5v3h14V5H1zm2 2H2V6h1v1zm2 0H4V6h1v1zm2 0H6V6h1v1zm6.4.1c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.2.6-.6.6zM8 12v2H1v1h14v-1H8v-2zm3.4-11H4.6L1.9 4h12.3l-2.8-3zM1 12h14V9H1v3zm12.4-2.2c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6zM6 10h1v1H6v-1zm-2 0h1v1H4v-1zm-2 0h1v1H2v-1z" />
    </svg>
  );
};

SvgAdserver.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdserver.displayName = 'Adserver';
export default SvgAdserver;
