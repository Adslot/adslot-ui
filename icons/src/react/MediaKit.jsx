import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMediaKit = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="#FFF" d="M12.5 6c0-3.3 2.7-6 6-6h44l25 21v73c0 3.3-2.7 6-6 6h-63c-3.3 0-6-2.7-6-6V6z" />
      <path fill="#CFD3D4" d="M62.5 0v15c0 3.3 2.7 6 6 6h19l-25-21z" />
      <path
        fill="#EFC94C"
        d="M52.1 79.6c0 6.3 5.1 11.5 11.5 11.5s12.1-5.2 11.5-11.5c-.6-6.4-5.6-11.5-11.5-11.5-6.3.1-11.5 5.2-11.5 11.5z"
      />
      <path
        fill="#EF7247"
        d="M52.1 79.6c0 6.3 5.1 11.5 11.5 11.5 4.8 0 8.9-3 10.6-7.2L53 75.1c-.5 1.4-.9 2.9-.9 4.5z"
      />
      <path fill="#47C4B7" d="M52.1 79.6c0 4 2.1 7.6 5.3 9.6l6.2-9.8L53 75.1c-.6 1.4-.9 2.9-.9 4.5z" />
      <path fill="#4FAAC9" d="m53.1 75.1 10.5 4.4V68.2c-4.7 0-8.8 2.8-10.5 6.9z" />
      <path
        fill="#47C4B7"
        d="M68.3 28.8H74v29.3h-5.7zm-10.4 3.5h5.7v25.8h-5.7zm-10.8 2.4h5.7v23.4h-5.7zm-10.7 2.6h5.7v20.8h-5.7zm-10.7 6.5h5.7v14.3h-5.7z"
      />
      <path fill="#CFD3D4" d="M24.9 72h14.3v1.4H24.9zM24.9 79.4h14.3v1.4H24.9zM24.9 86.8h14.3v1.4H24.9z" />
      <circle cx={44.4} cy={72.7} r={2.1} fill="#CFD3D4" />
      <circle cx={44.4} cy={80.1} r={2.1} fill="#CFD3D4" />
      <circle cx={44.4} cy={87.5} r={2.1} fill="#CFD3D4" />
    </svg>
  );
};

SvgMediaKit.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMediaKit.displayName = 'MediaKit';
export default SvgMediaKit;
