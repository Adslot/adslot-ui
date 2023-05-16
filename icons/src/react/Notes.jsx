import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgNotes = (props) => {
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
      <path d="M13.1 1.7h-1.5v-.3c0-.1-.1-.2-.2-.2s-.2.1-.2.2v.3H9.3v-.3c0-.1-.1-.2-.2-.2s-.2.1-.2.2v.3H7.1v-.3c0-.1-.1-.2-.2-.2s-.2.1-.2.2v.3H4.8v-.3c0-.1-.1-.2-.2-.2s-.2.1-.2.2v.3H2.9c-.3 0-.5.2-.5.5v12.1c0 .3.2.5.5.5h10.2c.3 0 .5-.2.5-.5V2.2c0-.3-.3-.5-.5-.5zm-1.7 2.4c.1 0 .2-.1.2-.2v-.5c.2.1.3.3.3.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-.2.1-.4.3-.5v.5c0 .1.1.2.2.2zm-2.3 0c.1 0 .2-.1.2-.2v-.5c.2.1.3.3.3.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-.2.1-.4.3-.5v.5c0 .1.1.2.2.2zm-2.2 0c.1 0 .2-.1.2-.2v-.5c.2.1.3.3.3.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-.2.1-.4.3-.5v.5c0 .1.1.2.2.2zm-2.3 0c.1 0 .2-.1.2-.2v-.5c.2.1.3.3.3.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-.2.1-.4.3-.5v.5c0 .1.1.2.2.2zm8 9.7H3.4V2.6h1V3c-.4.1-.7.4-.7.9s.4.9.9.9.9-.4.9-.9c0-.4-.3-.8-.7-.9v-.4h1.9V3c-.4.1-.7.4-.7.9s.4.9.9.9.9-.4.9-.9c0-.4-.3-.8-.7-.9v-.4H9V3c-.5.1-.8.4-.8.9s.4.9.9.9.9-.4.9-.9-.3-.8-.7-.9v-.4h1.9V3c-.4.1-.7.4-.7.9s.4.9.9.9.9-.4.9-.9c0-.4-.3-.8-.7-.9v-.4h1v11.2z" />
      <path d="M11.3 12H4.7c-.1 0-.2.1-.2.2s.1.2.2.2h6.7c.1 0 .2-.1.2-.2-.1-.1-.1-.2-.3-.2zm0-1.8H4.7c-.1 0-.2.1-.2.2s.1.2.2.2h6.7c.1 0 .2-.1.2-.2-.1-.1-.1-.2-.3-.2zm0-1.9H4.7c-.1 0-.2.1-.2.2s.1.2.2.2h6.7c.1 0 .2-.1.2-.2-.1-.1-.1-.2-.3-.2zM4.7 7h3.1c.1 0 .2-.1.2-.2s-.1-.2-.2-.2H4.7c-.1 0-.2.1-.2.2s0 .2.2.2z" />
    </svg>
  );
};

SvgNotes.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgNotes.displayName = 'Notes';
export default SvgNotes;
