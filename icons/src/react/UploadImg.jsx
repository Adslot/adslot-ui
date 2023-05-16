import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgUploadImg = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M0 0h16v16H0z" fill="none" />
      <path transform="rotate(90 8 8)" d="M1 1h14v14H1z" fill="none" />
      <path
        d="M5.3 3.8 7 2.1v6.1c0 .2.1.3.3.3.2 0 .3-.1.3-.3V2.1l1.7 1.7c.1.1.1.1.2.1s.2 0 .2-.1c.1-.1.1-.3 0-.5L7.6 1.1 7.5 1h-.1c-.1 0-.2 0-.2.1L4.9 3.4c-.1.1-.1.3 0 .5.1 0 .3 0 .4-.1zm-.2 7.7c0 1.2 1 2.2 2.2 2.2 1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.2-2.2-2.2-1.2-.1-2.2.9-2.2 2.2zm3.8 0c0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6z"
        fill="#5a5a5a"
      />
      <path
        d="M13.4 9.2c0-.6-.4-1.2-1.3-1.2H9.6c-.1-.5-.3-1-.9-1.2-.2-.1-.3 0-.4.2-.1.2 0 .3.2.4.2 0 .4.2.5.9 0 .2.2.3.3.3h2.9c.5 0 .6.4.6.6v4.6c0 .5-.6.6-.7.6H3.8c-.2 0-.4-.1-.5-.2-.1-.2-.1-.4-.1-.5V9.5c0-.7.5-.9.7-.9h1.6c.2 0 .3-.1.3-.3 0-.8.2-.9.4-.9.1-.1.2-.3.2-.4-.1-.2-.3-.3-.4-.2-.6.1-.8.6-.8 1.2H3.9c-.6 0-1.3.5-1.3 1.5v4.1c0 .1 0 .6.3.9.2.3.6.4 1 .4h8.3c.4 0 1.3-.3 1.3-1.2l-.1-4.5z"
        fill="#5a5a5a"
      />
      <path
        d="M11.4 10.4c.1-.1.1-.1.1-.2s0-.2-.1-.2c-.1-.1-.3-.1-.4 0-.1.1-.1.1-.1.2s0 .2.1.2c.1.1.1.1.2.1 0 0 .1 0 .2-.1z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgUploadImg.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgUploadImg.displayName = 'UploadImg';
export default SvgUploadImg;
