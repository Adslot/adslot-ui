import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlaceholderEmptyMediaSchedule = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="#4794ae"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M20 14.8c0-2.7 2.1-4.8 4.8-4.8H60l20 16.8v58.4c0 2.7-2.1 4.8-4.8 4.8H24.8c-2.7 0-4.8-2.1-4.8-4.8V14.8z" />
      <path
        fill="#FFF"
        d="M60 10.1v12c0 2.7 2.1 4.8 4.8 4.8H80L60 10.1zm1.1 38.5h-9.7v-9.7c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v9.7h-9.7c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4h9.7v9.7c0 .8.6 1.4 1.4 1.4s1.4-.6 1.4-1.4v-9.7h9.7c.8 0 1.4-.6 1.4-1.4s-.7-1.4-1.4-1.4z"
      />
    </svg>
  );
};

SvgPlaceholderEmptyMediaSchedule.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlaceholderEmptyMediaSchedule.displayName = 'PlaceholderEmptyMediaSchedule';
export default SvgPlaceholderEmptyMediaSchedule;
