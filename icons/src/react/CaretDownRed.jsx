import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCaretDownRed = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#da4f49"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M8.3 11.3 12 5.1c.1-.2.1-.4-.1-.5-.1 0-.1-.1-.2-.1H4.4c-.2 0-.4.1-.4.4v.2l3.6 6.2c.1.2.3.3.5.1.2 0 .2 0 .2-.1z" />
    </svg>
  );
};

SvgCaretDownRed.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCaretDownRed.displayName = 'CaretDownRed';
export default SvgCaretDownRed;
