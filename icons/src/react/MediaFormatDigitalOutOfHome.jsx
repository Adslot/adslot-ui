import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMediaFormatDigitalOutOfHome = (props) => {
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
        fill="none"
        stroke="#5D5E5F"
        strokeWidth={0.785}
        strokeMiterlimit={10}
        d="M1.5 1.1h13.1c.4 0 .7.3.7.7v8.6c0 .4-.3.7-.7.7H1.5c-.4 0-.7-.3-.7-.7V1.8c0-.4.3-.7.7-.7zM6.6 11.1h2.7v3.8H6.6z"
      />
      <path fill="5D5E5F" d="M4.2 3.3h-.9c-.3 0-.6-.2-.6-.5s.3-.6.6-.6h.9c.3 0 .6.3.6.6s-.3.5-.6.5z" />
      <path fill="none" stroke="#5D5E5F" strokeWidth={0.312} strokeMiterlimit={10} d="M3.8 1.3v1.1" />
      <path fill="5D5E5F" d="M7 3.3h-.9c-.3 0-.6-.3-.6-.6s.3-.6.6-.6H7c.3 0 .6.3.6.6 0 .4-.3.6-.6.6z" />
      <path fill="none" stroke="#5D5E5F" strokeWidth={0.312} strokeMiterlimit={10} d="M6.6 1.3v1.1" />
      <path fill="5D5E5F" d="M9.8 3.3H9c-.3 0-.6-.3-.6-.6s.3-.6.6-.6h.9c.3 0 .6.3.6.6-.1.4-.3.6-.7.6z" />
      <path fill="none" stroke="#5D5E5F" strokeWidth={0.312} strokeMiterlimit={10} d="M9.4 1.3v1.1" />
      <path fill="5D5E5F" d="M12.7 3.3h-.9c-.3 0-.6-.3-.6-.6s.3-.6.6-.6h.9c.3 0 .6.3.6.6 0 .4-.3.6-.6.6z" />
      <path fill="none" stroke="#5D5E5F" strokeWidth={0.312} strokeMiterlimit={10} d="M12.2 1.3v1.1" />
      <path fill="none" stroke="#5D5E5F" strokeWidth={0.785} strokeMiterlimit={10} d="M4.2 14.9h7.6" />
    </svg>
  );
};

SvgMediaFormatDigitalOutOfHome.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMediaFormatDigitalOutOfHome.displayName = 'MediaFormatDigitalOutOfHome';
export default SvgMediaFormatDigitalOutOfHome;
