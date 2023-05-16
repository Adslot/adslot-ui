import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEmptyPlaceholder = (props) => {
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
        fill="#F6F7F7"
        d="M50.1 0C70.8 0 90 13.2 97 32.8c7.2 19.7 1 42.5-15.2 55.8S42.1 103.8 24 93-3.2 60.5 1 40C5.2 19.7 21.9 3.7 42.4.7c2.5-.5 5.2-.7 7.7-.7z"
      />
      <path
        fill="#D3D3D3"
        d="M20.5 22h59c1.7 0 2.8 1.3 2.8 2.8v50.3c0 1.7-1.3 2.8-2.8 2.8h-59c-1.7 0-2.8-1.3-2.8-2.8V24.8c.2-1.6 1.3-2.8 2.8-2.8z"
      />
      <path fill="#FFF" d="M22 35.3h56v39.1H22V35.3z" />
      <path
        fill="#00B7A3"
        d="M27.4 39.1h45.4c.7 0 1.5.7 1.5 1.5v8c0 .7-.7 1.5-1.5 1.5H27.4c-.7 0-1.5-.7-1.5-1.5v-8.2c0-.8.8-1.3 1.5-1.3z"
      />
      <path
        fill="none"
        stroke="#E8E8E8"
        strokeWidth={0.5}
        strokeMiterlimit={10}
        d="M53.4 52.5h19.4c.7 0 1.5.7 1.5 1.5v15.7c0 .7-.7 1.5-1.5 1.5H53.4c-.7 0-1.5-.7-1.5-1.5V54c0-.9.9-1.5 1.5-1.5zm-26 0h19.4c.7 0 1.5.7 1.5 1.5v15.7c0 .7-.7 1.5-1.5 1.5H27.4c-.7 0-1.5-.7-1.5-1.5V54c0-.9.8-1.5 1.5-1.5z"
      />
    </svg>
  );
};

SvgEmptyPlaceholder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEmptyPlaceholder.displayName = 'EmptyPlaceholder';
export default SvgEmptyPlaceholder;
