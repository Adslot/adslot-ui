import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgChecklistPencilEstimate = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#a4dacd"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M2 2.7c0-.4.3-.7.7-.7H8l3 2.5v8.8c0 .4-.3.7-.7.7H2.7c-.4 0-.7-.3-.7-.7V2.7z" />
      <path
        fill="#FFF"
        d="M8 2v1.8c0 .4.3.7.7.7H11L8 2zm1.3 4.1c0 .1-.1.2-.2.2H6.3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2h2.8c.1 0 .2.1.2.2zm-1.1 1c0 .1-.1.2-.2.2H6.3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2H8c.1 0 .2.1.2.2zm1.1 1.5c0 .1-.1.2-.2.2H6.3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2h2.8c.1 0 .2.1.2.2zm-1.1.9c0 .1-.1.2-.2.2H6.3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2H8c.1 0 .2.1.2.2zM9.3 11c0 .1-.1.2-.2.2H6.3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2h2.8c.1 0 .2.1.2.2zm-1.1.9c0 .1-.1.2-.2.2H6.3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2H8c.1.1.2.1.2.2zM4.3 7.4l-.7-.7c-.1-.1-.1-.2 0-.3.1-.1.2-.1.3 0l.4.4.8-1c.1-.1.2-.1.3 0 .1.1.1.2 0 .3L4.3 7.4zm0 2.5-.7-.7c-.1-.1-.1-.2 0-.3.1-.1.2-.1.3 0l.4.4.8-1c.1-.1.2-.1.3 0 .1.1.1.2 0 .3L4.3 9.9zm0 2.4-.7-.7c-.1-.1-.1-.2 0-.3.1-.1.2-.1.3 0l.4.4.8-1c.1-.1.2-.1.3 0 .1.1.1.2 0 .3l-1.1 1.3z"
      />
      <path d="M13.5 5.8c-.2 0-.5-.3-.5-.3s-.3.3-.5.3-.4-.1-.4-.3v7.6H14V5.5c-.1.1-.3.3-.5.3z" />
      <path fill="#0681A1" opacity={0.5} d="M13.1 3.5V14h.4c.3 0 .6-.3.6-.6V5.5l-1-2z" />
      <path fill="#0B3631" d="m13.1 3.5-.3.7c.1.1.2.2.3.2.1 0 .3-.1.3-.2l-.3-.7z" />
    </svg>
  );
};

SvgChecklistPencilEstimate.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgChecklistPencilEstimate.displayName = 'ChecklistPencilEstimate';
export default SvgChecklistPencilEstimate;
