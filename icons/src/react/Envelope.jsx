import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgEnvelope = (props) => {
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
      <path opacity={0.3} d="M2 3.5h12v9H2v-9z" />
      <path opacity={0.5} d="M9.1 7c-.2-.2-.7-.5-1.1-.5-.4 0-.9.3-1.1.5L2 12.5h12L9.1 7z" />
      <path fill="#FFF" d="M6.9 9c.2.2.7.4 1.1.4.4 0 .9-.2 1.1-.5L14 3.5H2L6.9 9z" />
    </svg>
  );
};

SvgEnvelope.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgEnvelope.displayName = 'Envelope';
export default SvgEnvelope;
