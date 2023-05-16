import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgShare = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      data-name="Group 20167"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17.173 14.302"
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <path
        data-name="Path 4438"
        d="M17.146.272a.352.352 0 0 0-.34-.272h-3.933a.358.358 0 0 0 0 .715h3.144l-6.2 6.2a.358.358 0 0 0 .506.506l6.123-6.123v3a.358.358 0 1 0 .715 0v-3.8a.352.352 0 0 0-.015-.226Z"
        fill="#5a5a5a"
      />
      <path
        data-name="Path 4439"
        d="M14.66 5.005a.357.357 0 0 0-.358.358v8.224H.715V2.855h11.084a.357.357 0 1 0 0-.715H.358A.357.357 0 0 0 0 2.498V13.94a.358.358 0 0 0 .358.358h14.3a.357.357 0 0 0 .358-.358V5.359a.357.357 0 0 0-.356-.354Z"
        fill="#5a5a5a"
      />
    </svg>
  );
};

SvgShare.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgShare.displayName = 'Share';
export default SvgShare;
