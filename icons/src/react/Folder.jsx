import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFolder = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      fill="#5a5a5a"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={size}
      height={size}
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <path d="M5 4C3.354 4 2 5.356 2 7v36c0 1.644 1.354 3 3 3h40c1.645 0 3-1.355 3-3V11c0-1.645-1.355-3-3-3H18c.087 0-.031 0-.275-.281-.245-.282-.546-.75-.86-1.25-.314-.501-.643-1.036-1.058-1.506C15.392 4.493 14.819 4 14 4H5zm0 2h9c-.06 0 .061.007.309.287.247.28.548.745.86 1.244.314.5.637 1.032 1.044 1.5.406.469.966.969 1.787.969h27c.563 0 1 .437 1 1v2.188A2.936 2.936 0 0 0 45 13H5c-.352 0-.685.074-1 .188V7c0-.564.436-1 1-1zm0 9h40c.565 0 1 .435 1 1v27c0 .563-.437 1-1 1H5c-.564 0-1-.436-1-1V16c0-.565.435-1 1-1z" />
    </svg>
  );
};

SvgFolder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFolder.displayName = 'Folder';
export default SvgFolder;
