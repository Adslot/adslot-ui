import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEllipsis = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 5"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle cx={2.5} cy={2.5} r={2.5} />
      <circle cx={11.5} cy={2.5} r={2.5} />
      <circle cx={20.5} cy={2.5} r={2.5} />
    </svg>
  );
};

SvgEllipsis.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEllipsis.displayName = 'Ellipsis';
export default SvgEllipsis;
