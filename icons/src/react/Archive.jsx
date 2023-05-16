import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgArchive = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#5a5a5a"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M12.6 1H3.4c-.3 0-.5.2-.5.5v13c0 .3.2.5.5.5h9.2c.3 0 .5-.2.5-.5v-13c0-.3-.2-.5-.5-.5zm-.5 13H3.9V2h8.3v12z" />
      <path d="M4.9 13.3h6.2c.2 0 .3-.1.3-.3V8.6c0-.2-.1-.3-.3-.3H4.9c-.2 0-.3.1-.3.3V13c0 .2.2.3.3.3zm2.5-4.4h1.2v.3H7.4v-.3zm-2.2 0h1.6v.6c0 .2.1.3.3.3h1.8c.2 0 .3-.1.3-.3v-.6h1.6v3.8H5.2V8.9zm-.3-1.2h6.2c.2 0 .3-.1.3-.3V3c0-.2-.1-.3-.3-.3H4.9c-.1 0-.3.1-.3.3v4.4c0 .1.2.3.3.3zm2.5-4.4h1.2v.3H7.4v-.3zm-2.2 0h1.6v.6c0 .1.2.3.3.3h1.8c.1 0 .3-.2.3-.3v-.6h1.6v3.8H5.2V3.3z" />
    </svg>
  );
};

SvgArchive.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgArchive.displayName = 'Archive';
export default SvgArchive;
