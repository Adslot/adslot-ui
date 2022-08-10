import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgTypeMultiflight = (props) => {
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
      <path d="M15.17 1.79a.44.44 0 0 0-.08-.11.38.38 0 0 0-.13 0 .45.45 0 0 0-.16 0L1 8.07a.36.36 0 0 0-.21.35.38.38 0 0 0 .25.33l4.35 1.45 1.75 4a.23.23 0 0 0 .1.12.39.39 0 0 0 .15.06h.11a.25.25 0 0 0 .15-.05.47.47 0 0 0 .1-.1l1.62-2.72 4.37 1.41a.38.38 0 0 0 .31-.05.35.35 0 0 0 .17-.27L15.2 2a.47.47 0 0 0-.03-.21zm-2.61 1.64-7 6.05-3.39-1.14zm-4.2 7.7.35.13-.52.88zm-.58-.73a.21.21 0 0 0 0 .06l-.38 2.22L6.11 10l6.1-5.29zm5.79 1.67-4.2-1.35-.7-.26 5.68-7.3z" />
    </svg>
  );
};

SvgTypeMultiflight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgTypeMultiflight.displayName = 'TypeMultiflight';
export default SvgTypeMultiflight;
