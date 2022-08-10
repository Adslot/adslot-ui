import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmarkAi = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      enableBackground="new 0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        d="M382.8 323.4H374c-.2 0-.3.2-.3.3v14.8c0 .2.1.4.2.6.1.2.4.3.6.3.2 0 .4-.1.6-.2l3.3-3.3 3.4 3.3c.1.1.3.2.5.2.5 0 .8-.4.8-.9v-14.8c0-.2-.2-.3-.3-.3zm-.4 15.1c0 .2-.2.2-.2.2l-3.6-3.5c-.1-.1-.3-.1-.5 0l-3.6 3.5c-.1.1-.1.1-.2 0 0 0-.1-.1-.1-.2V324h8.1l.1 14.5z"
        transform="translate(-370.376 -323.354)"
        fill={color}
      />
    </svg>
  );
};

SvgBookmarkAi.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmarkAi.displayName = 'BookmarkAi';
export default SvgBookmarkAi;
