import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSearch = (props) => {
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
        d="m13.4 12.1-2.7-2.7c.7-1.3.9-2.9 0-4.6-.7-1.3-2.1-2-3.5-2H7c-2.1 0-4 1.4-4.4 3.4C2 9 4.1 11.5 6.8 11.5c.8 0 1.6-.2 2.2-.6l2.7 2.7.1.1c.2.2.5.2.7 0l.9-.9c.2-.2.2-.5 0-.7zm-6.6-1.7c-2.3 0-4-2.4-2.9-4.8.5-1.1 1.7-1.7 2.9-1.7.9 0 1.7.3 2.3 1 .6.6.9 1.4.9 2.3 0 .9-.3 1.7-1 2.3-.5.6-1.3.9-2.2.9z"
        fill="#ababab"
      />
    </svg>
  );
};

SvgSearch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSearch.displayName = 'Search';
export default SvgSearch;
