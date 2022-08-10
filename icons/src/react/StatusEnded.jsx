import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusEnded = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#ababab"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <circle cx={8} cy={8} r={7} />
      <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={1.5} fill="none" d="M4.5 8h7" />
    </svg>
  );
};

SvgStatusEnded.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusEnded.displayName = 'StatusEnded';
export default SvgStatusEnded;
