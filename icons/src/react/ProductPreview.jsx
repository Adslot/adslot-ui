import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPreview = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M15 1v14H1V1z" />
      <g fill="#5a5a5a">
        <path d="M8.036 6.129c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8c0-.9-.8-1.8-1.8-1.8z" />
        <path d="M14.836 7.729c-1.3-2.7-3.9-4.4-6.9-4.5-3 .1-5.6 1.8-6.9 4.5l-.1.3.1.3c1.3 2.7 3.9 4.4 6.9 4.5 3-.1 5.6-1.8 6.9-4.5l.1-.3-.1-.3zm-6.8 3.9c-2.4-.1-4.6-1.5-5.7-3.6 1.1-2.1 3.3-3.5 5.7-3.6 2.4.1 4.6 1.5 5.7 3.6-1.1 2.1-3.3 3.5-5.7 3.6z" />
      </g>
    </svg>
  );
};

SvgProductPreview.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPreview.displayName = 'ProductPreview';
export default SvgProductPreview;
