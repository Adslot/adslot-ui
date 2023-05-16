import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgChecklistIncompleteEstimate = (props) => {
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
      <path d="M3.1 2.3c0-.4.3-.8.8-.8h5.7l3.2 2.8v9.4c0 .4-.3.8-.8.8H3.9c-.4 0-.8-.3-.8-.8V2.3z" />
      <path
        fill="#fff"
        d="M9.6 1.5v2c0 .4.3.8.8.8h2.4L9.6 1.5zm-4 8.5-.8-.7V9c.1-.1.2-.1.3 0l.4.5.9-1.1c.1-.1.2-.1.3 0 .1.1.1.2 0 .3.1 0-1.1 1.3-1.1 1.3zm0 2.6-.7-.7c-.1-.1-.1-.2 0-.3.1-.1.2-.1.3 0l.4.5.9-1.1c.1-.1.2-.1.3 0 .1.1.1.2 0 .3l-1.2 1.3zM6 6.5l.6-.5c.1-.1.1-.2 0-.3-.1-.1-.2-.1-.2 0l-.6.5-.6-.6h-.3c-.1.1-.1.3 0 .4l.6.6-.6.5c-.1.1-.1.2 0 .2.1.1.2.1.3 0l.6-.6.6.6s.1.1.2.1.1 0 .2-.1 0-.2 0-.3c-.1.1-.8-.5-.8-.5zm4.9-.3h-3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2H11c.1 0 .2.1.2.2-.1.1-.2.2-.3.2zm-1.3 1H7.8c-.1 0-.1-.1-.1-.2v-.1c0-.1.1-.1.1-.1h1.8c.1 0 .1.1.1.1V7c.1.1 0 .2-.1.2zm1.3 1.6h-3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2H11c.1 0 .2.1.2.2-.1.1-.2.2-.3.2zm-1.3 1H7.8c-.1 0-.1-.1-.1-.1v-.2c0-.1.1-.1.1-.1h1.8c.1 0 .1.1.1.1v.1c.1.1 0 .2-.1.2zm1.3 1.6h-3c-.1 0-.2-.1-.2-.2s.1-.2.2-.2H11c.1 0 .2.1.2.2-.1.1-.2.2-.3.2zm-1.3 1H7.8c-.1 0-.1-.1-.1-.1v-.1c0-.1.1-.1.1-.1h1.8c.1 0 .1.1.1.1v.1c.1 0 0 .1-.1.1z"
      />
    </svg>
  );
};

SvgChecklistIncompleteEstimate.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgChecklistIncompleteEstimate.displayName = 'ChecklistIncompleteEstimate';
export default SvgChecklistIncompleteEstimate;
