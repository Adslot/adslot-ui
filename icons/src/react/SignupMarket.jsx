import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSignupMarket = (props) => {
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
      <path fill="#E2E4E5" d="M90 87.5H10v-.1c0-2.7 2.2-4.9 4.9-4.9H85c2.8 0 5 2.2 5 5z" />
      <path fill="#FFF" d="M15 37.5h70v45H15z" />
      <path fill="#DF2C2C" d="M21.4 37.5c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4z" />
      <path fill="#CFD3D4" d="M32.9 37.5c0 2.8-2.6 5-5.7 5s-5.7-2.2-5.7-5h11.4z" />
      <path fill="#DF2C2C" d="M44.3 37.5c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4z" />
      <path
        fill="#CFD3D4"
        d="M55.7 37.5c0 2.8-2.6 5-5.7 5s-5.7-2.2-5.7-5h11.4zm22.9 0c0 2.8-2.6 5-5.7 5s-5.7-2.2-5.7-5h11.4z"
      />
      <path
        fill="#DF2C2C"
        d="M67.1 37.5c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4zm22.9 0c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5H90z"
      />
      <path fill="#FA5655" d="M10 37.5h11.4l10-25h-10z" />
      <path fill="#FFF" d="M21.4 37.5h11.5l7.1-25h-8.6z" />
      <path fill="#FA5655" d="M32.9 37.5h11.4l4.3-25H40z" />
      <path fill="#FFF" d="M44.3 37.5h11.4v-25h-7.1z" />
      <path fill="#FA5655" d="M90 37.5H78.6l-7.2-25H80z" />
      <path fill="#FFF" d="M78.6 37.5H67.1l-4.2-25h8.5z" />
      <path fill="#FA5655" d="M67.1 37.5H55.7v-25h7.2z" />
      <path fill="#6FDAF1" d="M20 47.5h35v20H20z" />
      <path fill="#40C9E7" d="M55 67.5H20l35-20zm7.5-20H80v16.2H62.5zm0 20H80v15H62.5z" />
      <path
        fill="#099686"
        d="M53.7 73.8c.3-4.1-4.3-7-9.3-7-2.9 0-5.5 1-7.2 2.4-.8-1.5-2.1-2.4-3.5-2.4s-2.6.9-3.4 2.2c-1-2.4-3.3-4.1-5.9-4.1-3.1 0-5.7 2.3-6.3 5.4-.4-.4-1-.6-1.6-.6-1.7 0-3 1.9-2.8 4.2h40z"
      />
      <path fill="#9C6144" d="M13.8 73.8h40v8.8h-40z" />
      <path fill="#AF7653" d="M13.8 73.8h40v2.5h-40z" />
    </svg>
  );
};

SvgSignupMarket.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSignupMarket.displayName = 'SignupMarket';
export default SvgSignupMarket;
