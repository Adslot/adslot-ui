import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMediaFormatMasterCompanion = (props) => {
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
      <g fill="#5d5e5f">
        <path d="M14.7 1.6H1.3c-.2 0-.3.1-.3.3v12.2c0 .2.1.3.3.3h13.4c.2 0 .3-.1.3-.3V1.9c0-.2-.1-.3-.3-.3zm-.3.6v1.2H1.6V2.2h12.8zM1.6 13.8V3.9h12.8v9.9H1.6z" />
        <path d="M12.7 9.9H3c-.2 0-.3.1-.3.3V12c0 .2.1.3.3.3h9.6c.2 0 .3-.1.3-.3v-1.8c.1-.2-.1-.3-.2-.3zm-.3 1.8H3.3v-1.3h9.1v1.3zM7.2 8.8H2.9c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2zm0-1.5H2.9c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2zm0-1.4H2.9c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2zm5.6 2.9H8.5c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2zm0-1.5H8.5c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2zm0-1.4H8.5c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h4.3c.1 0 .2.1.2.2v.3c0 .1-.1.2-.2.2z" />
      </g>
    </svg>
  );
};

SvgMediaFormatMasterCompanion.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMediaFormatMasterCompanion.displayName = 'MediaFormatMasterCompanion';
export default SvgMediaFormatMasterCompanion;
