import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSortDesc = (props) => {
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
        d="m15 6.87-2.8-2.8a.53.53 0 0 0-.75 0l-2.8 2.8a.53.53 0 0 0 0 .74.55.55 0 0 0 .35.15.55.55 0 0 0 .37-.15l1.9-1.91v5.86a.53.53 0 0 0 .53.53.52.52 0 0 0 .52-.53V5.7l1.9 1.91a.54.54 0 0 0 .75 0 .53.53 0 0 0 .03-.74z"
        fill="#ababab"
      />
      <path
        d="M7.36 8.39a.54.54 0 0 0-.75 0l-1.9 1.91V4.44a.53.53 0 1 0-1 0v5.86L1.76 8.39a.54.54 0 0 0-.75 0 .53.53 0 0 0 0 .74l2.8 2.8a.52.52 0 0 0 .75 0l2.8-2.8a.53.53 0 0 0 0-.74z"
        fill="#5a5a5a"
      />
      <path fill="none" d="M0 0h16v16H0z" />
    </svg>
  );
};

SvgSortDesc.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSortDesc.displayName = 'SortDesc';
export default SvgSortDesc;
