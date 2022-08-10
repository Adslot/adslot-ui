import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPreviewLink = (props) => {
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
      <path d="M3 9c-.9-.5-1.4-1.4-1.4-2.4 0-1.4 1.2-2.7 2.6-2.7H9c1.4 0 2.6 1.2 2.6 2.6 0 1.5-1.2 2.6-2.6 2.6H5.1c-.2 0-.3.1-.3.3 0 .2.1.3.3.3H9c1.7 0 3.2-1.5 3.2-3.2 0-1.8-1.4-3.2-3.2-3.2H4.2C2.5 3.3 1 4.8 1 6.6c0 1.2.7 2.4 1.7 2.9.1.1.3 0 .4-.1.1-.2 0-.4-.1-.4z" />
      <path d="M13.2 6.6c-.1-.1-.3 0-.4.1-.1.1 0 .3.1.4.9.4 1.4 1.3 1.4 2.4 0 1.4-1.2 2.6-2.6 2.6H7c-1.4 0-2.6-1.2-2.6-2.6C4.5 8 5.6 6.8 7 6.8h3.9c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H7c-1.7 0-3.2 1.5-3.2 3.2 0 1.8 1.4 3.2 3.2 3.2h4.7c1.7 0 3.2-1.5 3.2-3.2.1-1.2-.6-2.3-1.7-2.8z" />
    </svg>
  );
};

SvgPreviewLink.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPreviewLink.displayName = 'PreviewLink';
export default SvgPreviewLink;
