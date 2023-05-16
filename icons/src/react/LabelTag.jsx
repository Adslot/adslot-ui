import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgLabelTag = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M35.1 22.4 18.7 6c-.4-.4-.9-.6-1.4-.6L7.4 5c-.6 0-1.1.2-1.6.7-.4.4-.6 1-.6 1.6l.3 9.8c0 .5.2 1 .6 1.4L8 20.4c.2.2.7.2.9 0s.2-.7 0-.9L7 17.6c-.2-.2-.2-.4-.2-.6l-.3-9.8c0-.2.1-.5.2-.6.2-.2.4-.2.6-.2l9.8.3c.2 0 .4.1.6.2l16.4 16.4c.3.3.3.9 0 1.2L24.7 34c-.3.3-.9.3-1.2 0l-2.1-2.1c-.2-.2-.7-.2-.9 0-.2.2-.2.7 0 .9l2.1 2.1c.4.4 1 .6 1.5.6s1.1-.2 1.5-.6l9.5-9.5c.8-.8.8-2.1 0-3z" />
      <path d="M14.3 14.1c1.2-1.2 1.2-3 0-4.2s-3-1.2-4.2 0-1.2 3 0 4.2c.6.6 1.3.9 2.1.9.7-.1 1.5-.3 2.1-.9zm-3.3-.9c-.7-.7-.7-1.7 0-2.4.3-.3.8-.5 1.2-.5s.9.2 1.2.5c.7.7.7 1.7 0 2.4-.7.6-1.8.6-2.4 0zM20.5 27.9h.7c.4 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6h-.7c-.3-3.4-3-6-6.3-6.3v-.7c0-.4-.3-.6-.6-.6-.4 0-.6.3-.6.6v.7c-3.4.3-6 3-6.3 6.3h-.8c-.4 0-.6.3-.6.6 0 .4.3.6.6.6h.7c.3 3.4 3 6 6.3 6.4v.7c0 .4.3.6.6.6.4 0 .6-.3.6-.6v-.7c3.4-.4 6.1-3.1 6.4-6.4zm-6.4 5V31c0-.4-.3-.6-.6-.6-.4 0-.6.3-.6.6v1.9c-2.7-.3-4.7-2.4-5-5h1.9c.4 0 .6-.3.6-.6 0-.4-.3-.6-.6-.6h-2c.3-2.6 2.4-4.7 5-5v1.8c0 .4.3.6.6.6.4 0 .6-.3.6-.6v-1.8c2.6.3 4.7 2.4 5 5h-1.8c-.4 0-.6.3-.6.6 0 .4.3.6.6.6H19c-.1 2.6-2.2 4.7-4.9 5z" />
      <path d="M13.5 26.6c-.4 0-.7.3-.7.6 0 .4.3.6.7.6s.6-.3.6-.6c.1-.3-.2-.6-.6-.6z" />
    </svg>
  );
};

SvgLabelTag.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgLabelTag.displayName = 'LabelTag';
export default SvgLabelTag;
