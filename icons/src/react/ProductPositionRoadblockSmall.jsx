import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionRoadblockSmall = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M1 1h14v14H1z" />
      <path
        d="M14.1 2.1H1.9c-.1 0-.3.1-.3.3v11.2c0 .1.1.3.3.3h12.3c.1 0 .3-.1.3-.3V2.4c-.1-.1-.2-.3-.4-.3zm-.2.6v1.1H2.1V2.7h11.8zM2.1 13.3v-9h11.7v9.1H2.1z"
        fill="#5a5a5a"
      />
      <path
        d="M10.3 5.1H5.6c-.1 0-.2.1-.2.2v2.3c0 .1.1.2.2.2h4.7c.1 0 .2-.1.2-.2V5.3c0-.1-.1-.2-.2-.2zm0 6.3H5.6c-.1 0-.2.1-.2.2v.8c0 .1.1.2.2.2h4.7c.1 0 .2-.1.2-.2v-.8c0-.1-.1-.2-.2-.2zm2.4-6.3h-1.4c-.1 0-.2.1-.2.2v7.1c0 .1.1.2.2.2h1.4c.1 0 .2-.1.2-.2V5.3c0-.1-.1-.2-.2-.2zm-8 0H3.3c-.1 0-.2.1-.2.2v7.1c0 .1.1.2.2.2h1.4c.1 0 .2-.1.2-.2V5.3c0-.1-.1-.2-.2-.2z"
        fill="#ff837e"
      />
      <path
        d="M5.7 8.5h4.6m-4.6 1h4.6m-4.6 1.1h4.6"
        fill="none"
        stroke="#d3d3d3"
        strokeWidth={0.51}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
    </svg>
  );
};

SvgProductPositionRoadblockSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionRoadblockSmall.displayName = 'ProductPositionRoadblockSmall';
export default SvgProductPositionRoadblockSmall;
