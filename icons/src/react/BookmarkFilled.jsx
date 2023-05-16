import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmarkFilled = (props) => {
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
        <path
          data-name="Path 11691"
          d="M11.728 0H.435A.435.435 0 0 0 0 .435v19.051a1.187 1.187 0 0 0 .279.783.982.982 0 0 0 .736.339 1.1 1.1 0 0 0 .709-.28l4.313-4.252 4.417 4.279a1.078 1.078 0 0 0 .68.252 1.068 1.068 0 0 0 1.029-1.123V.436A.435.435 0 0 0 11.728 0z"
        />
      </g>
    </svg>
  );
};

SvgBookmarkFilled.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmarkFilled.displayName = 'BookmarkFilled';
export default SvgBookmarkFilled;
