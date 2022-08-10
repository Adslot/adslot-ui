import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSignupSite = (props) => {
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
      <path fill="#ECF0F1" d="M10 10h80v80H10z" />
      <path fill="#546A79" d="M10 10h80v16.6H10z" />
      <path fill="#D0E8F9" d="M10 26.6v26.2h8.3v-8.3h16.5v8.3h6.9v-8.3h16.6v8.3h6.9v-8.3h16.5v8.3H90V26.6z" />
      <path
        fill="#BDC3C7"
        d="M33.4 70.7H19.7c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.7 1.4-1.5 1.4zm0 5.5H19.7c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.7 1.4-1.5 1.4zm0 5.5H19.7c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.7 1.4-1.5 1.4zm23.5-11H43.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm0 5.5H43.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm0 5.5H43.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm23.4-11H66.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.7 1.4-1.5 1.4zm0 5.5H66.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.7 1.4-1.5 1.4zm0 5.5H66.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h13.8c.8 0 1.4.6 1.4 1.4s-.7 1.4-1.5 1.4z"
      />
      <path fill="#67B9CC" d="M18.3 44.5h16.6v16.6H18.3zm46.9 0h16.6v16.6H65.2zm-23.5 0h16.6v16.6H41.7z" />
      <circle fill="#ED7161" cx={18.3} cy={18.3} r={4.1} />
      <circle fill="#F0C419" cx={30.7} cy={18.3} r={4.1} />
      <circle fill="#4FBA6F" cx={43.1} cy={18.3} r={4.1} />
    </svg>
  );
};

SvgSignupSite.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSignupSite.displayName = 'SignupSite';
export default SvgSignupSite;
