import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgChecklist = (props) => {
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
      <path d="M20 14.8c0-2.7 2.1-4.8 4.8-4.8H60l20 16.8v58.4c0 2.7-2.1 4.8-4.8 4.8H24.8c-2.7 0-4.8-2.1-4.8-4.8V14.8z" />
      <path
        fill="#DBF0F2"
        d="M60 10v12c0 2.7 2.1 4.8 4.8 4.8H80L60 10zM68.8 37.5c0 .7-.6 1.2-1.2 1.2H48.8c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2h18.8c.6-.1 1.2.5 1.2 1.2zM61.2 43.7c0 .7-.6 1.2-1.2 1.2H48.8c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2H60c.7 0 1.2.6 1.2 1.2zM68.8 53.7c0 .7-.6 1.2-1.2 1.2H48.8c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2h18.8c.6 0 1.2.6 1.2 1.2zM61.2 60c0 .7-.6 1.2-1.2 1.2H48.8c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2H60c.7-.1 1.2.5 1.2 1.2zM68.8 70c0 .7-.6 1.2-1.2 1.2H48.8c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2h18.8c.6-.1 1.2.5 1.2 1.2zM61.2 76.2c0 .7-.6 1.2-1.2 1.2H48.8c-.7 0-1.2-.6-1.2-1.2 0-.7.6-1.2 1.2-1.2H60c.7 0 1.2.6 1.2 1.2zM35.1 46.2l-4.7-4.7c-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0l2.8 2.8 5.4-6.4c.4-.5 1.2-.6 1.8-.2.5.4.6 1.2.2 1.8l-7.3 8.5zM35.1 62.5l-4.7-4.7c-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0l2.8 2.8 5.4-6.4c.4-.5 1.2-.6 1.8-.2.5.4.6 1.2.2 1.8l-7.3 8.5zM35.1 78.7 30.4 74c-.5-.5-.5-1.3 0-1.8s1.3-.5 1.8 0L35 75l5.4-6.4c.4-.5 1.2-.6 1.8-.2.5.4.6 1.2.2 1.8l-7.3 8.5z"
      />
    </svg>
  );
};

SvgChecklist.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgChecklist.displayName = 'Checklist';
export default SvgChecklist;
