import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetSight = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M35.1 19.5h-.7c-.3-7.4-6.3-13.3-13.7-13.7v-.6c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v.7c-7.2.3-13.2 6.2-13.5 13.6h-.7c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h.7c.3 7.4 6.3 13.3 13.7 13.7v.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7v-.7c7.4-.3 13.3-6.3 13.7-13.7h.7c.4 0 .7-.3.7-.7-.3-.4-.6-.7-.9-.7zM20.7 33.2v-1.7c0-.4-.3-.7-.7-.7-.4 0-.7.3-.7.7v1.7c-6.7-.3-12-5.7-12.4-12.4h1.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H7.1c.3-6.7 5.7-12 12.4-12.4v1.7c0 .4.3.7.7.7.4 0 .7-.3.7-.7V7.2c6.7.3 12 5.7 12.3 12.4h-1.7c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h1.7c-.4 6.5-5.8 11.8-12.5 12.2z" />
      <path d="M20.1 18.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6c0-.9-.7-1.6-1.6-1.6zm-.3 1.6c0-.2.1-.3.3-.3.2 0 .3.1.3.3 0 .3-.6.3-.6 0z" />
    </svg>
  );
};

SvgTargetSight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetSight.displayName = 'TargetSight';
export default SvgTargetSight;
