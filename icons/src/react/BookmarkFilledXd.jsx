import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmarkFilledXd = (props) => {
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
          <path data-name="Rectangle 583" fill={color} d="M0 0h9.444v16H0z" />
        </clipPath>
        <clipPath>
          <path d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
      <g data-name="Artboard \u2013 2" clipPath="url(#a)">
        <path fill="#fff" d="M0 0h16v16H0z" />
        <g data-name="Group 349">
          <g data-name="Group 350" clipPath="url(#b)" transform="translate(3)">
            <path
              data-name="Path 8002"
              d="M9.1 0H.338A.338.338 0 0 0 0 .338v14.788a.921.921 0 0 0 .217.607.759.759 0 0 0 .572.267.855.855 0 0 0 .55-.217l3.347-3.3 3.429 3.322a.8.8 0 0 0 1.328-.662V.341A.338.338 0 0 0 9.108 0Z"
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

SvgBookmarkFilledXd.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmarkFilledXd.displayName = 'BookmarkFilledXd';
export default SvgBookmarkFilledXd;
