import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAditionIcon16Px = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15.99 14.81"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path d="M9.32 2.25 6.25.5.11 4.13l6.11 3.48 3.19-1.67-3-1.98 2.91-1.71z" fill="silver" />
          <path
            d="m12.42 11.39-6.18 3.42-.02-7.2 3.19-1.67v3.69l3.01-1.87v3.63zM9.32 2.25l.09 3.69-3-1.98 2.91-1.71z"
            fill="#898989"
          />
          <path d="M12.42 7.76 9.41 9.63V5.94l3.01 1.82z" fill="silver" />
          <path d="m0 11.39 6.24 3.42-.02-7.2L.11 4.13 0 11.39z" fill="#b3b3b3" />
          <path d="M9.89 1.85c.07 0 3-1.85 3-1.85l3.08 1.76-3 2Z" fill="silver" />
          <path d="m9.95 5.52-.06-3.67 3.05 1.88.06 3.59-3.05-1.8z" fill="#b3b3b3" />
          <path d="M15.99 5.38 13 7.32l-.06-3.59 2.99-1.97.06 3.62z" fill="#898989" />
        </g>
      </g>
    </svg>
  );
};

SvgAditionIcon16Px.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAditionIcon16Px.displayName = 'AditionIcon16Px';
export default SvgAditionIcon16Px;
