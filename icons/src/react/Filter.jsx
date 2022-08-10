import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFilter = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 55"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#6d6e71"
        d="M49.07 7.34c0-3.28-11-7.34-24.54-7.34S0 4.06 0 7.34a1.31 1.31 0 0 0 0 .18c0 5.77 15.88 19.29 18.76 25.06V42.8c0 1.59 2.59 2.88 5.77 2.88s5.77-1.29 5.77-2.88V32.59c2.9-5.78 18.77-19.3 18.77-25.07a1.17 1.17 0 0 0 0-.18Zm-24.32 5.91c-11.89 0-21.56-2.48-21.56-5.51s9.67-6.13 21.56-6.13S46.31 4.7 46.31 7.74s-9.67 5.51-21.56 5.51Z"
      />
    </svg>
  );
};

SvgFilter.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFilter.displayName = 'Filter';
export default SvgFilter;
