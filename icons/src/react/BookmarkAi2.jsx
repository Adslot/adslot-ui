import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmarkAi2 = (props) => {
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
      <path
        data-name="Path 8001"
        d="M12.38 0H3.62c-.19 0-.34.15-.34.34v14.78c0 .22.07.44.22.61.14.17.35.26.57.27.2 0 .4-.08.55-.22l3.35-3.3 3.43 3.32a.804.804 0 0 0 1.33-.66V.34c-.01-.18-.16-.34-.34-.34Zm-.33 15.12c0 .19-.16.2-.21.17L8.2 11.76a.332.332 0 0 0-.47 0l-3.55 3.51c-.06.05-.12.06-.16.01a.235.235 0 0 1-.05-.16V.67h8.07v14.45Z"
        fill={color}
      />
    </svg>
  );
};

SvgBookmarkAi2.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmarkAi2.displayName = 'BookmarkAi2';
export default SvgBookmarkAi2;
