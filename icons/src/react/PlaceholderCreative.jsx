import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPlaceholderCreative = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path
        fill="#F8B9B7"
        d="M90 87.5c0 1.4-1.1 2.5-2.5 2.5h-55c-1.4 0-2.5-1.1-2.5-2.5v-55c0-1.4 1.1-2.5 2.5-2.5h55.1c1.4 0 2.5 1.1 2.5 2.5v55z"
      />
      <path fill="#F05953" d="M34.9 34.9H85v40H34.9z" />
      <path
        fill="#FCE7E7"
        d="M70 67.5c0 1.4-1.1 2.5-2.5 2.5h-55c-1.4 0-2.5-1.1-2.5-2.5v-55c0-1.4 1.1-2.5 2.5-2.5h55.1c1.4 0 2.5 1.1 2.5 2.5v55z"
      />
      <path fill="#F3817F" d="M15 15h50.1v40H15z" />
      <path fill="#F05953" d="M55 20 28.8 55h36.3V34" />
      <path fill="#FFF" d="m55 30 3.6 5.1 3.7-4.9L55 20l-7.3 9.7 3.6 5.4" />
      <path fill="#F6A1A0" d="M30 30 15 48v7h35.9" />
      <path
        fill="#FFF"
        d="M42.5 22.6c0 1.4-1.1 2.5-2.5 2.5H25c-1.4 0-2.5-1.1-2.5-2.5 0-1.5 1.5-3.2 4.2-2.2 1.4-1.7 3.5-2.8 5.8-2.8s4.5 1.1 5.8 2.8c2.8-1.1 4.2.6 4.2 2.2zM30 40l4.2-5-4.2-5-4.2 5"
      />
    </svg>
  );
};

SvgPlaceholderCreative.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPlaceholderCreative.displayName = 'PlaceholderCreative';
export default SvgPlaceholderCreative;
