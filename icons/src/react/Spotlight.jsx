import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSpotlight = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g data-name="Group 22027">
        <path
          data-name="Path 765"
          d="M26.194 3.054a.5.5 0 0 0-.6.116L14.739 15.59 3.883 3.17a.5.5 0 0 0-.864.44l4.626 20.407c.143 1.818 3.634 2.771 7.093 2.771s6.95-.953 7.092-2.771L26.456 3.61a.5.5 0 0 0-.262-.556Zm-12.122 13.3-5.065 5.8a3.857 3.857 0 0 0-.664.439L4.429 5.327Zm.664.76 3.808 4.357a18.371 18.371 0 0 0-7.616 0Zm0 8.682c-3.728 0-6.106-1.117-6.106-1.885s2.378-1.884 6.106-1.884 6.106 1.116 6.106 1.884-2.382 1.88-6.109 1.88Zm6.393-3.208a3.85 3.85 0 0 0-.664-.439l-5.065-5.8 9.643-11.032Z"
          fill="#5a5a5a"
        />
        <path data-name="Rectangle 19004" fill="none" d="M0 0h30v30H0z" />
      </g>
    </svg>
  );
};

SvgSpotlight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSpotlight.displayName = 'Spotlight';
export default SvgSpotlight;
