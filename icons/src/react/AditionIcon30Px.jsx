import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgAditionIcon30Px = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29.91 27.71"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path d="M17.43 4.21 11.7.94.21 7.73l11.42 6.5 5.98-3.11L12 7.4l5.43-3.19z" fill="silver" />
          <path
            d="m23.23 21.32-11.56 6.39-.04-13.48 5.98-3.11v6.89l5.62-3.48v6.79zM17.43 4.21l.18 6.91L12 7.4l5.43-3.19z"
            fill="#898989"
          />
          <path d="m23.23 14.53-5.62 3.48v-6.89l5.62 3.41z" fill="silver" />
          <path d="m0 21.32 11.67 6.39-.04-13.48L.21 7.73 0 21.32z" fill="#b3b3b3" />
          <path d="M18.5 3.47C18.63 3.43 24 0 24 0l5.8 3.29L24.21 7Z" fill="silver" />
          <path d="m18.61 10.33-.11-6.86 5.71 3.5.11 6.72-5.71-3.36z" fill="#b3b3b3" />
          <path d="m29.91 10.06-5.59 3.63-.11-6.72 5.59-3.68.11 6.77z" fill="#898989" />
        </g>
      </g>
    </svg>
  );
};

SvgAditionIcon30Px.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgAditionIcon30Px.displayName = 'AditionIcon30Px';
export default SvgAditionIcon30Px;
