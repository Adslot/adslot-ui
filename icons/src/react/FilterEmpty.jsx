import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFilterEmpty = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 65"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="#74ceb7" d="M35 27.23v-10c-10 0-18.19 2.25-18.19 5s8.19 5 18.19 5Z" />
      <path
        fill="#fff"
        d="M55.52 22c0-2.74-9.19-6.14-20.52-6.14S14.48 19.29 14.48 22a1.09 1.09 0 0 0 0 .15c0 4.83 13.27 16.13 15.69 21v8.54c0 1.33 2.16 2.41 4.83 2.41s4.83-1.08 4.83-2.41v-8.55c2.42-4.83 15.69-16.13 15.69-21a1 1 0 0 0 0-.14Zm-20.34 5c-9.94 0-18-2.07-18-4.61s8.09-5.12 18-5.12 18 2.59 18 5.12-8.06 4.61-18 4.61Z"
      />
      <path
        fill="#c1e9df"
        d="M35 15.9v1.35h.18c9.94 0 18 2.59 18 5.12S45.12 27 35.18 27H35v27.1c2.66 0 4.83-1.08 4.83-2.41v-8.55c2.42-4.83 15.69-16.13 15.69-21a1 1 0 0 0 0-.15c0-2.7-9.19-6.09-20.52-6.09Z"
      />
    </svg>
  );
};

SvgFilterEmpty.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFilterEmpty.displayName = 'FilterEmpty';
export default SvgFilterEmpty;
