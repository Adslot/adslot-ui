import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSignupBuildings = (props) => {
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
      <path fill="#ECF0F1" d="M10.7 75.1h78.6V90H10.7z" />
      <path fill="#556080" d="M32.4 10h35.3v65.1H32.4z" />
      <path fill="#4FAAC9" d="M10.7 14.1v61h21.7v-61zm56.9 0v61h21.7v-61z" />
      <path
        fill="#FFF"
        d="M37.8 16.8h9.5v6.8h-9.5zm14.9 0h9.5v6.8h-9.5zm20.4 5.4h10.8V29H73.1zm0 12.2h10.8v6.8H73.1zm-57-12.2h10.8V29H16.1zm0 12.2h10.8v6.8H16.1zM37.8 29h9.5v6.8h-9.5zm14.9 0h9.5v6.8h-9.5zM37.8 41.2h9.5V48h-9.5zm14.9 0h9.5V48h-9.5z"
      />
      <path fill="#ED7161" d="M62.2 90H37.8l2.7-14.9h19z" />
      <path fill="#D0E8F9" d="M39.2 56.1h21.7v19H39.2z" />
      <path fill="#3D324C" d="M60.8 54.7H39.2c-.7 0-1.4.6-1.4 1.4v19h24.4v-19c0-.7-.6-1.4-1.4-1.4z" />
      <path fill="#D0E8F9" d="M40.5 57.5h19v17.6h-19z" />
      <path fill="#3D324C" d="M48.6 57.5h2.7v17.6h-2.7z" />
      <path
        fill="#7F6E5D"
        d="m24.6 60.6-3.1 3.1-3.1-3.1c-.5-.5-1.4-.5-1.9 0s-.5 1.4 0 1.9l3.7 3.7v22.5c0 .7.6 1.4 1.4 1.4.7 0 1.4-.6 1.4-1.4V66.2l3.7-3.7c.5-.5.5-1.4 0-1.9-.7-.6-1.5-.6-2.1 0zm58.9 0c-.5-.5-1.4-.5-1.9 0l-3.1 3.1-3.1-3.1c-.5-.5-1.4-.5-1.9 0s-.5 1.4 0 1.9l3.7 3.7v22.5c0 .7.6 1.4 1.4 1.4.7 0 1.4-.6 1.4-1.4V66.2l3.7-3.7c.3-.5.3-1.4-.2-1.9z"
      />
      <circle fill="#95C83D" cx={21.5} cy={60.2} r={10.8} />
      <circle fill="#95C83D" cx={78.5} cy={60.2} r={10.8} />
    </svg>
  );
};

SvgSignupBuildings.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSignupBuildings.displayName = 'SignupBuildings';
export default SvgSignupBuildings;
