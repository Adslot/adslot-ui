import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBookmarkNew = (props) => {
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
      <path
        d="M12.34 0H3.57c-.18 0-.34.15-.34.34v14.79c0 .22.07.44.22.61.14.17.35.26.57.26.2 0 .4-.08.55-.22l3.35-3.3 3.43 3.32c.15.12.33.19.53.2.46-.02.82-.4.8-.86V.34c0-.19-.15-.34-.34-.34Z"
        fill={color}
      />
      <path
        d="M3.89.66v14.47c0 .07.02.13.05.17.02.02.05.04.08.04s.07-.02.11-.05l3.78-3.73 3.86 3.74s.06.03.1.04c.08 0 .14-.09.14-.21V.66H3.89M3.57 0h8.77c.19 0 .34.15.34.34v14.79c0 .49-.35.87-.8.87-.19 0-.37-.07-.53-.2l-3.43-3.32-3.35 3.3c-.18.15-.36.22-.55.22-.22 0-.43-.1-.57-.26a.95.95 0 0 1-.22-.61V.34c0-.19.16-.34.34-.34Z"
        fill={color}
      />
    </svg>
  );
};

SvgBookmarkNew.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBookmarkNew.displayName = 'BookmarkNew';
export default SvgBookmarkNew;
