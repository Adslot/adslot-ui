import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgBudget = (props) => {
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
      <path d="M35.8 19.1c0-.2 0-.4-.1-.5L33.8 16l.8-.8c.3-.3.3-.8 0-1L23.7 3.1c-.3-.3-.8-.3-1 0L2.8 23c-.1.1-.2.3-.2.5s.1.4.2.5l8.8 8.7c.5 2.5 6.2 3.9 11.8 3.9 5.9 0 11.8-1.5 11.8-4.2V23.5c0-1-.6-1.8-1.7-2.4l2-1.5c.2-.2.3-.3.3-.5zM23.1 4.7l9.9 9.9-4.7 4.7c-1.6-.3-3.2-.4-4.9-.4-5.9 0-11.8 1.5-11.8 4.5v7.2l-7.2-7.1L23.1 4.7zm10.6 23.4c0 1.1-4 2.8-10.3 2.8s-10.3-1.6-10.3-2.8v-2.4c2.1 1.4 6.2 2.2 10.3 2.2s8.2-.7 10.3-2.2v2.4zm-10.3 7c-6.3 0-10.3-1.6-10.3-2.8v-2.1c2.1 1.4 6.2 2.1 10.3 2.1s8.2-.7 10.3-2.1v2.1c0 1.2-4 2.8-10.3 2.8zm0-8.7c-6.3 0-10.3-1.8-10.3-3s4-3 10.3-3 10.3 1.8 10.3 3-4 3-10.3 3zm8.6-6.1c-.6-.2-1.2-.4-2-.6l2.7-2.7 1.3 1.8-2 1.5z" />
    </svg>
  );
};

SvgBudget.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgBudget.displayName = 'Budget';
export default SvgBudget;
