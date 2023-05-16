import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCircledTick = (props) => {
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
        <path d="M8.999 0a9 9 0 1 0 9 9 9.009 9.009 0 0 0-9-9Zm0 17.241a8.242 8.242 0 1 1 8.244-8.243 8.252 8.252 0 0 1-8.244 8.243Z" />
        <path d="m12.887 5.399-5.116 6.4-2.217-2.773a.379.379 0 0 0-.592.473l2.514 3.143a.379.379 0 0 0 .592 0l5.411-6.766a.379.379 0 0 0-.592-.473Z" />
      </g>
    </svg>
  );
};

SvgCircledTick.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCircledTick.displayName = 'CircledTick';
export default SvgCircledTick;
