import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTypePlacement = (props) => {
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
      <path d="M14.5 1.89h-13a.48.48 0 0 0-.5.49v11.24a.48.48 0 0 0 .48.49h13a.49.49 0 0 0 .48-.49V2.38a.49.49 0 0 0-.46-.49zM2 13.14V3.7h12v9.44z" />
      <path d="M7.29 7.44H3a.29.29 0 0 0-.29.29v3.91a.29.29 0 0 0 .29.3h4.29a.29.29 0 0 0 .29-.3V7.73a.29.29 0 0 0-.29-.29zM7 11.35H3.33V8H7zm5.92-3.91H8.67a.29.29 0 0 0-.29.29v3.91a.29.29 0 0 0 .29.3h4.25a.29.29 0 0 0 .29-.3V7.73a.29.29 0 0 0-.29-.29zm-.29 3.91H9V8h3.67z" />
      <rect x={2.78} y={4.99} width={10.43} height={1.65} rx={0.29} ry={0.29} />
    </svg>
  );
};

SvgTypePlacement.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTypePlacement.displayName = 'TypePlacement';
export default SvgTypePlacement;
