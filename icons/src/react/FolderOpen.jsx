import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgFolderOpen = (props) => {
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
      <path d="M3 4C1.355 4 0 5.355 0 7v36.906a.995.995 0 0 0 .063.688C.343 45.957 1.563 47 3 47h39c1.492 0 2.719-1.125 2.938-2.563.007-.062.027-.124.03-.187v-.063l.032-.156V44l4.969-26.813.031-.093V17c0-1.645-1.355-3-3-3v-3c0-1.645-1.355-3-3-3H18.031c.004.004-.008 0-.031 0a2.038 2.038 0 0 1-.281-.281c-.246-.282-.532-.75-.844-1.25-.313-.5-.648-1.032-1.063-1.5C15.399 4.5 14.82 4 14 4Zm0 2h11c-.063 0 .066 0 .313.281.246.282.53.75.843 1.25.313.5.656 1.032 1.063 1.5.406.469.96.969 1.781.969h26c.563 0 1 .438 1 1v3H8c-1.574 0-2.828 1.266-2.938 2.813h-.03L5 17 2 33.188V7c0-.563.438-1 1-1Zm5 10h39c.563 0 1 .438 1 1l-4.906 26.531-.032.063c-.011.039-.023.082-.03.125-.012.039-.024.082-.032.125v.094c-.016.05-.023.101-.031.156-.004.031.004.062 0 .093a.668.668 0 0 0 0 .126A.996.996 0 0 1 42 45H3c-.563 0-1-.438-1-1l4.969-26.813.031-.093V17c0-.563.438-1 1-1Z" />
    </svg>
  );
};

SvgFolderOpen.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgFolderOpen.displayName = 'FolderOpen';
export default SvgFolderOpen;
