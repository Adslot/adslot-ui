import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdFormatMasterCompanion = (props) => {
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
      <g fill="#6D6E71">
        <path d="M15 1.4H1c-.3 0-.5.3-.5.6v12c0 .3.2.5.5.5h14c.3 0 .5-.2.5-.5V2c0-.3-.2-.6-.5-.6zM1.5 13.5V3.4h12.9v10.1H1.5z" />
        <path d="M4.2 4.8H2.8c-.2 0-.3.1-.3.3v6.8c0 .2.1.3.3.3h1.4c.2 0 .3-.1.3-.3V5.1c0-.2-.2-.3-.3-.3zM13.2 4.8h-1.4c-.2 0-.3.1-.3.3v6.8c0 .2.1.3.3.3h1.4c.2 0 .3-.1.3-.3V5.1c0-.2-.2-.3-.3-.3zM10.3 4.8H5.6c-.2 0-.3.1-.3.3v6.8c0 .2.1.3.3.3h4.6c.2 0 .3-.1.3-.3V5.1c.1-.2-.1-.3-.2-.3zm-.4 6.8H6V5.4h4v6.2z" />
      </g>
    </svg>
  );
};

SvgAdFormatMasterCompanion.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdFormatMasterCompanion.displayName = 'AdFormatMasterCompanion';
export default SvgAdFormatMasterCompanion;
