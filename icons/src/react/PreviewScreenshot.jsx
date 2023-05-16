import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPreviewScreenshot = (props) => {
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
      <path
        fill="#5a5a5a"
        d="M11.2 3.9H4.8c-.2 0-.3.1-.3.3v7.6c0 .2.1.3.3.3h6.4c.2 0 .3-.1.3-.3V4.2c0-.2-.1-.3-.3-.3zm-.3 7.6H5.1v-7h5.8v7zM3 4.5c-.2 0-.3.1-.3.3v6.4c0 .2.1.3.3.3.2 0 .3-.1.3-.3V4.8c0-.2-.1-.3-.3-.3zm-1.7.6c-.2 0-.3.1-.3.3v5.3c0 .2.1.3.3.3.2 0 .3-.1.3-.3V5.4c0-.2-.2-.3-.3-.3zM13 4.5c-.2 0-.3.1-.3.3v6.4c0 .2.1.3.3.3.2 0 .3-.1.3-.3V4.8c0-.2-.2-.3-.3-.3zm1.7.6c-.2 0-.3.1-.3.3v5.3c0 .2.1.3.3.3.2 0 .3-.1.3-.3V5.4c0-.2-.1-.3-.3-.3z"
      />
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M15 1v14H1V1z" />
    </svg>
  );
};

SvgPreviewScreenshot.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPreviewScreenshot.displayName = 'PreviewScreenshot';
export default SvgPreviewScreenshot;
