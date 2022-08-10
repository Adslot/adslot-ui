import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusAttentionIsWarning = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#faa732"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle cx={8} cy={8} r={7} />
      <path
        d="M8.72 12.44a1.05 1.05 0 0 1-.71.27 1.08 1.08 0 0 1-.72-.26 1 1 0 0 1-.29-.76.94.94 0 0 1 .3-.71 1 1 0 0 1 1.45 0 1 1 0 0 1 .31.71 1 1 0 0 1-.34.75zM9 5.63l-.26 3a2.39 2.39 0 0 1-.19.86.59.59 0 0 1-.55.34.56.56 0 0 1-.55-.34 2.6 2.6 0 0 1-.2-.88L7 5.69V4.46a1.2 1.2 0 0 1 .3-.86 1 1 0 0 1 .7-.31.81.81 0 0 1 .8.42A2.6 2.6 0 0 1 9 4.8a7.86 7.86 0 0 1 0 .83z"
        fill="#fff"
      />
    </svg>
  );
};

SvgStatusAttentionIsWarning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusAttentionIsWarning.displayName = 'StatusAttentionIsWarning';
export default SvgStatusAttentionIsWarning;
