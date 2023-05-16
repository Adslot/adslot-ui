import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgGraph = (props) => {
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
      <path d="M8 14h3V6H8v8zm4 0h3V2h-3v12zm-8 0h3v-4H4v4zm-4 0h3v-1H0v1z" />
    </svg>
  );
};

SvgGraph.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgGraph.displayName = 'Graph';
export default SvgGraph;
