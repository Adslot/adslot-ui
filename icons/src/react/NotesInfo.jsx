import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgNotesInfo = (props) => {
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
      <path fill="#fff" d="M2.6 2.1h11v12.4h-11z" />
      <path
        fill="#5a5a5a"
        d="M13.4 2.1h-1.9v-.6c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3V2H8.3v-.5c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3V2H5.2v-.5c0-.2-.1-.3-.3-.3-.2 0-.3.1-.3.3V2h-2c-.2 0-.3.1-.3.3v12.1c0 .2.1.3.3.3h10.7c.2 0 .3-.1.3-.3v-12c0-.2-.1-.3-.2-.3zm-.3 12.1H2.9V2.7h1.7v.8c-.3.1-.6.4-.6.8 0 .5.4.9.9.9s.9-.4.9-.9c0-.4-.3-.8-.7-.9v-.7h2.5v.8c-.2.1-.5.4-.5.8 0 .5.4.9.9.9.5.1 1-.3 1-.9 0-.4-.3-.8-.7-.9v-.7h2.5v.8c-.4.1-.7.5-.7.9 0 .5.4.9.9.9s.9-.4.9-.9c0-.4-.3-.8-.7-.9v-.8h1.7v11.5zM4.7 4.1c0 .1.1.1.2.1s.2-.1.2-.1c.1.1.1.2.1.3 0 .2-.2.4-.4.4s-.3-.3-.3-.5c0-.1.1-.2.2-.2zm3.1 0c0 .1.1.1.2.1s.2-.1.2-.1c.1.1.1.2.1.3 0 .2-.2.4-.4.4s-.4-.2-.4-.4c.2-.2.2-.3.3-.3zm3.1 0c0 .1.1.1.2.1s.2-.1.2-.1c.1.1.1.2.1.3 0 .2-.2.4-.4.4s-.4-.2-.4-.4c.2-.2.2-.3.3-.3z"
      />
      <path
        fill="#5a5a5a"
        d="M11.1 7.5H7.3c-.2 0-.3.1-.3.2 0 .2.1.3.3.3h3.8c.2 0 .3-.1.3-.3 0-.1-.1-.2-.3-.2zm-5-.6H4.9c-.1 0-.3.1-.3.2v1.2c0 .2.1.3.3.3H6c.2 0 .3-.1.3-.3V7.1c0-.1-.1-.2-.2-.2zM5.8 8h-.6v-.6h.6V8zm5.3 1.7H7.3c-.2 0-.3.1-.3.3 0 .2.1.3.3.3h3.8c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3zm0 2.3H7.3c-.2 0-.3.1-.3.2 0 .2.1.3.3.3h3.8c.2 0 .3-.1.3-.3 0-.1-.1-.2-.3-.2zm-5-2.9H4.9c-.2 0-.3.1-.3.3v1.2c0 .2.1.3.3.3H6c.2 0 .3-.1.3-.3V9.4c0-.2-.1-.3-.2-.3zm-.3 1.2h-.6v-.6h.6v.6zm.3 1.1H4.9c-.2 0-.3.1-.3.3v1.2c0 .2.1.3.3.3H6c.2 0 .3-.1.3-.3v-1.2c0-.2-.1-.3-.2-.3zm-.3 1.1h-.6v-.6h.6v.6z"
      />
    </svg>
  );
};

SvgNotesInfo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgNotesInfo.displayName = 'NotesInfo';
export default SvgNotesInfo;
