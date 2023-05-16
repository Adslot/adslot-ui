import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgStatusResume = (props) => {
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
      <circle cx={8} cy={8} r={7} />
      <path d="M10.5 7.8 6.6 5.5c-.1-.1-.3 0-.3.1v4.6c0 .1.1.2.3.2h.1l3.9-2.3s0-.1-.1-.3c.1 0 0 0 0 0z" fill="#fff" />
    </svg>
  );
};

SvgStatusResume.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgStatusResume.displayName = 'StatusResume';
export default SvgStatusResume;
