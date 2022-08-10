import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPaperClip = (props) => {
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
      <path d="M35.6 5.6c-1.1-1.1-2.6-1.8-4.2-1.8s-3 .6-4.2 1.8l-15.7 16c-1.6 1.6-1.6 4.3 0 6 1.6 1.6 4.3 1.6 5.9 0L29 15.9c.3-.3.3-.8 0-1-.3-.3-.8-.3-1 0L16.4 26.6c-1 1-2.8 1-3.8 0-1.1-1.1-1.1-2.8 0-3.9l15.7-16C30 5 32.9 5 34.6 6.7c1.7 1.8 1.7 4.6 0 6.4L14.9 33c-1.2 1.2-2.7 1.8-4.3 1.8s-3.2-.6-4.3-1.8c-2.4-2.4-2.4-6.4 0-8.8L21.7 8.5c.3-.3.3-.8 0-1-.3-.3-.8-.3-1 0L5.3 23.2c-2.9 3-2.9 7.9 0 10.9 1.4 1.5 3.3 2.3 5.4 2.3 2 0 3.9-.8 5.4-2.3l19.6-20c2.2-2.4 2.2-6.2-.1-8.5z" />
    </svg>
  );
};

SvgPaperClip.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPaperClip.displayName = 'PaperClip';
export default SvgPaperClip;
