import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPmpAvailable = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 29.61 21.237"
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <path
        d="M14.805 7.599a3.019 3.019 0 1 0 3.018 3.019 3.023 3.023 0 0 0-3.018-3.019Zm0 4.585a1.566 1.566 0 1 1 1.565-1.566 1.567 1.567 0 0 1-1.565 1.57ZM5.56.231A.729.729 0 0 0 4.533.196a14.247 14.247 0 0 0 0 20.844.73.73 0 0 0 .5.2.728.728 0 0 0 .5-1.258 12.789 12.789 0 0 1 0-18.72A.726.726 0 0 0 5.56.231Z"
        fill="#ababab"
      />
      <path
        d="M9.675 5.042a.728.728 0 0 0-1.024-.067 7.489 7.489 0 0 0 0 11.287.727.727 0 0 0 .958-1.093 6.036 6.036 0 0 1 0-9.1.728.728 0 0 0 .066-1.027ZM25.074.196a.727.727 0 0 0-.994 1.062 12.786 12.786 0 0 1 0 18.72.727.727 0 0 0 .994 1.062 14.244 14.244 0 0 0 0-20.844Z"
        fill="#ababab"
      />
      <path
        d="M20.959 4.975A.727.727 0 0 0 20 6.068a6.036 6.036 0 0 1 0 9.1.727.727 0 0 0 .959 1.093 7.491 7.491 0 0 0 0-11.286Z"
        fill="#ababab"
      />
    </svg>
  );
};

SvgPmpAvailable.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPmpAvailable.displayName = 'PmpAvailable';
export default SvgPmpAvailable;
