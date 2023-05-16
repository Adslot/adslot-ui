import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlaceholderMarketplace = (props) => {
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
      <path fill="#DADADA" d="M90 90.4H10v-.1c0-2.8 2.2-5 5-5h70.2c2.6.1 4.8 2.4 4.8 5.1z" />
      <path fill="#FFF" d="M15 40.4h70.1v45.1H15z" />
      <path fill="#00B7A4" d="M21.4 40.4c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4z" />
      <path fill="#DADADA" d="M32.9 40.4c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4z" />
      <path fill="#00B7A4" d="M44.3 40.4c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4z" />
      <path
        fill="#DADADA"
        d="M55.7 40.4c0 2.8-2.6 5-5.7 5s-5.7-2.2-5.7-5h11.4zm22.9 0c0 2.8-2.6 5-5.7 5s-5.7-2.2-5.7-5h11.4z"
      />
      <path
        fill="#00B7A4"
        d="M67.1 40.4c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5h11.4zm22.9 0c0 2.8-2.6 5-5.7 5-3.2 0-5.7-2.2-5.7-5H90zm-80 0h11.4l10-25h-10"
      />
      <path fill="#FFF" d="M21.4 40.4h11.5l7.1-25h-8.6" />
      <path fill="#00B7A4" d="M32.9 40.4h11.4l4.2-25H40" />
      <path fill="#FFF" d="M44.3 40.4h11.4v-25h-7.2" />
      <path fill="#00B7A4" d="M90 40.4H78.6l-7.2-25H80" />
      <path fill="#FFF" d="M78.6 40.4H67.1l-4.2-25h8.5" />
      <path fill="#00B7A4" d="M67.1 40.4H55.7v-25h7.2" />
      <path fill="#939393" d="M20 50.4h35v20H20z" />
      <path fill="#7F7F7F" d="M55 70.4H20l35-20m7.5 0H80v16.3H62.5zm0 20H80v15.1H62.5z" />
      <path
        fill="#797979"
        d="M53.7 76.6c.3-4-4.3-7.1-9.3-7.1-2.9 0-5.5.9-7.2 2.5-.8-1.5-2.1-2.5-3.5-2.5s-2.6.9-3.4 2.2c-.9-2.4-3.3-4.1-5.9-4.1-3.1 0-5.8 2.3-6.3 5.3-.4-.3-.9-.6-1.5-.6-1.7 0-3 1.9-2.8 4.2l39.9.1z"
      />
      <path fill="#4A4A4A" d="M13.7 76.6h40v8.8h-40z" />
      <path fill="#A5A5A5" d="M13.7 76.6h40v2.5h-40z" />
    </svg>
  );
};

SvgPlaceholderMarketplace.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlaceholderMarketplace.displayName = 'PlaceholderMarketplace';
export default SvgPlaceholderMarketplace;
