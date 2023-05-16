import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmark = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <g data-name="Group 20133">
        <g data-name="Path 11691" fill="none">
          <path d="M11.728 0H.435A.435.435 0 0 0 0 .435v19.051a1.187 1.187 0 0 0 .279.783.982.982 0 0 0 .736.339 1.1 1.1 0 0 0 .709-.28l4.313-4.252 4.417 4.279a1.078 1.078 0 0 0 .68.252 1.068 1.068 0 0 0 1.029-1.123V.436A.435.435 0 0 0 11.728 0z" />
          <path
            d="M.85.85v18.636a.35.35 0 0 0 .068.222c.027.031.064.05.097.05.037 0 .086-.023.145-.068l4.872-4.802 4.978 4.823a.224.224 0 0 0 .124.047c.1 0 .179-.12.179-.274V.85H.85M.435 0h11.293c.24 0 .435.194.435.435v19.05c0 .629-.452 1.123-1.03 1.123a1.08 1.08 0 0 1-.68-.253l-4.416-4.279-4.313 4.252c-.237.194-.47.28-.709.28a.982.982 0 0 1-.736-.34A1.187 1.187 0 0 1 0 19.487V.436C0 .193.195 0 .435 0z"
            fill="#5a5a5a"
          />
        </g>
      </g>
    </svg>
  );
};

SvgBookmark.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmark.displayName = 'Bookmark';
export default SvgBookmark;
