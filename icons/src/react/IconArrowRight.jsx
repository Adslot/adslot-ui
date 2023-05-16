import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgIconArrowRight = (props) => {
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
      <path
        d="M14.7 7.3 10 2.6c-.4-.4-.8-.4-1.2 0s-.4 1 0 1.4L12 7.2H1.8c-.4-.1-.8.3-.8.8s.4.9.8.9h10.1l-3.3 3.3c-.4.4-.4.8 0 1.2.2.2.4.4.7.4s.6-.2.7-.4l4.8-4.8c.3-.3.3-.9-.1-1.3z"
        fill="#006dcc"
      />
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M1 1h14v14H1z" />
    </svg>
  );
};

SvgIconArrowRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgIconArrowRight.displayName = 'IconArrowRight';
export default SvgIconArrowRight;
