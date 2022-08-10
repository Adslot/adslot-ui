import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmarkXd = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <defs>
        <clipPath>
          <path data-name="Rectangle 581" fill={color} d="M0 0h9.444v16H0z" />
        </clipPath>
        <clipPath>
          <path d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
      <g data-name="Artboard \u2013 1" clipPath="url(#a)">
        <path fill="#fff" d="M0 0h16v16H0z" />
        <g data-name="Group 348" clipPath="url(#b)" transform="translate(3.278)">
          <path
            data-name="Path 8001"
            d="M9.1 0H.338A.338.338 0 0 0 0 .338v14.788a.925.925 0 0 0 .217.608.761.761 0 0 0 .571.266.846.846 0 0 0 .55-.217l3.348-3.3 3.429 3.322a.8.8 0 0 0 1.328-.662V.342A.338.338 0 0 0 9.108 0Zm-.333 15.125c0 .195-.165.2-.206.172l-3.644-3.531a.335.335 0 0 0-.471 0L.891 15.275c-.064.053-.122.063-.165.013a.247.247 0 0 1-.051-.164V.673h8.093Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

SvgBookmarkXd.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmarkXd.displayName = 'BookmarkXd';
export default SvgBookmarkXd;
