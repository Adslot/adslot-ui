import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgPublisher = (props) => {
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
        fill="#5a5a5a"
        d="M12.4 10.6H3.6V7.3c-.3.3-.6.4-1 .5v6c0 .3.2.5.5.5h9.8c.3 0 .5-.2.5-.5v-6c-.4-.1-.7-.2-1-.5v3.3zm.8-7.9h.2v-.5c0-.3-.2-.5-.5-.5H3.1c-.3 0-.5.2-.5.5v.6h10.6zm0 .6H2.8l-2 2.1c0 .8.6 1.4 1.4 1.4.2 0 .3 0 .5-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1-.1.2-.1.3-.3.4-.5l.1-.1c.1-.2.1-.4.1-.6 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0 .3.1.5.2.7 0 0 0 .1.1.1l.1.1.1.1c.1.1.3.2.4.3h.5c.8 0 1.4-.6 1.4-1.4l-1.5-1.9z"
      />
    </svg>
  );
};

SvgPublisher.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgPublisher.displayName = 'Publisher';
export default SvgPublisher;
