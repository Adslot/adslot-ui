import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTargetingAudience = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M27.7 56c2.8 0 6.6-.6 8.8-3.4.5-.6 1-1.2 1.4-1.8 2.7 5.4 8.1 9.2 12 9.2 4.3 0 9.5-3.7 12.1-9.1.4.6.8 1.1 1.3 1.8 2.3 2.8 6 3.4 8.8 3.4 2.6 0 7.5-.7 7.5-2.1 0-.1 0-.6-.7-.8-.4-.1-.7-.1-2 0-1.6 0-3.1-2.1-4.4-5.4.2 0 .4.1.6.1 1.9 0 3.5-.9 4.2-1.4.5-.3 2.1-1.4 2.1-2.5 0-.7-.6-1.3-2.3-.8h-.3c-2.6 0-6.5-10.4-8.5-18.1 0-.2-.1-.3-.1-.5v-.1c-2-8.3-9.4-14.5-18.3-14.5s-16.2 6.2-18.2 14.4v.1c0 .2-.1.3-.1.5-2 7.7-5.9 18.1-8.5 18.1h-.3c-1.6-.5-2.3.1-2.3.8 0 1.4 3.3 3.9 6.3 3.9.2 0 .3-.1.5-.1-1.4 3.2-2.9 5.4-4.5 5.4-.4 0-.8-.1-1-.1-.4 0-1.5 0-1.5.9-.1 1.4 4.8 2.1 7.4 2.1zm59.8 34c-.4-9.2-3.6-15-6.6-18.5-3.8-4.4-8.9-6.9-14.1-6.9h-2.5L53.9 90h33.6zm-41.6 0L35.5 64.6h-1.9c-5.4 0-10.7 2.5-14.5 6.9-3 3.4-6.2 9.2-6.6 18.6h33.4z" />
    </svg>
  );
};

SvgTargetingAudience.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTargetingAudience.displayName = 'TargetingAudience';
export default SvgTargetingAudience;
