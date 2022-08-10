import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCircledX = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 17.999"
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <g fill="#5a5a5a">
        <path d="M12.767 5.231a.379.379 0 0 0-.535 0L9 8.463 5.768 5.231a.379.379 0 1 0-.535.536l3.232 3.231-3.232 3.232a.379.379 0 0 0 .268.647.375.375 0 0 0 .267-.111L9 9.534l3.232 3.232a.379.379 0 0 0 .535-.535L9.535 8.999l3.232-3.231a.379.379 0 0 0 0-.537Z" />
        <path d="M8.999 0a9 9 0 1 0 9 9 9.009 9.009 0 0 0-9-9Zm0 17.241a8.242 8.242 0 1 1 8.244-8.243 8.252 8.252 0 0 1-8.244 8.243Z" />
      </g>
    </svg>
  );
};

SvgCircledX.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCircledX.displayName = 'CircledX';
export default SvgCircledX;
