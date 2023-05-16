import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgScheduled = (props) => {
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
      <path d="M10.4 11H9.2v1.1h1.2V11zM8.6 7.9H7.4V9h1.2V7.9zm1.8 1.5H9.2v1.1h1.2V9.4zm1.7-1.5h-1.2V9h1.2V7.9zM8.6 9.4H7.4v1.1h1.2V9.4zm1.8-1.5H9.2V9h1.2V7.9zm1.7 1.5h-1.2v1.1h1.2V9.4zM5.2 11H3.9v1.1h1.2V11zm0-1.6H3.9v1.1h1.2V9.4zm6.6-5.5v.5c.2.2.3.4.3.7 0 .5-.5 1-1 1-.6 0-1-.4-1-1 0-.3.1-.5.3-.7v-.5H5.6v.5c.3.2.4.4.4.7 0 .5-.5 1-1 1-.6 0-1-.4-1-1 0-.3.1-.5.3-.7v-.5H2V14h12V3.9h-2.2zm1.1 9.1H3.1V6.7h9.8V13zm-6-5.1H5.7V9h1.2V7.9zm0 3.1H5.7v1.1h1.2V11zm1.7 0H7.4v1.1h1.2V11zM6.9 9.4H5.7v1.1h1.2V9.4zM5 5.7c.3 0 .5-.2.5-.5V3.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.7c0 .2.2.5.5.5zm6.1 0c.3 0 .5-.2.5-.5V3.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.7c0 .2.2.5.5.5z" />
    </svg>
  );
};

SvgScheduled.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgScheduled.displayName = 'Scheduled';
export default SvgScheduled;
