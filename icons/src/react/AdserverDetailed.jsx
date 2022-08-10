import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAdserverDetailed = (props) => {
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
      <path d="M52.8 73.6h-4.6v10.7H11.1v4.6h78.7v-4.6h-37zM71.6 11.9H29.3c-.3 0-.6.1-.9.4L13 28.5c-.7.8-.2 2 .9 2H87c1 0 1.6-1.2.9-2L72.4 12.2c-.2-.2-.5-.3-.8-.3zM90.5 68.4c0 1.6-1.8 3-4 3h-72c-2.2 0-4-1.3-4-3v-12c0-1.6 1.8-3 4-3h72c2.2 0 4 1.3 4 3v12zM90.5 47.6c0 1.6-1.8 3-4 3h-72c-2.2 0-4-1.3-4-3v-12c0-1.6 1.8-3 4-3h72c2.2 0 4 1.3 4 3v12z" />
      <circle cx={41.5} cy={62.5} r={3} fill="#FA5655" />
      <circle cx={80.9} cy={62.5} r={3} fill="#FFF" />
      <circle cx={31.5} cy={62.5} r={3} fill="#F99134" />
      <circle cx={21.5} cy={62.5} r={3} fill="#FACB1B" />
      <circle cx={41.5} cy={41.7} r={3} fill="#FA5655" />
      <circle cx={80.9} cy={41.7} r={3} fill="#FFF" />
      <circle cx={31.5} cy={41.7} r={3} fill="#F99134" />
      <circle cx={21.5} cy={41.7} r={3} fill="#FACB1B" />
    </svg>
  );
};

SvgAdserverDetailed.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAdserverDetailed.displayName = 'AdserverDetailed';
export default SvgAdserverDetailed;
