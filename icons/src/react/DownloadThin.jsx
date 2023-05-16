import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgDownloadThin = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      data-name="Group 20169"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18.889 18.496"
      {...rest}
      className={classnames('svg-icon', className)}
    >
      <path
        data-name="Path 6790"
        d="M9.168 15.176a.4.4 0 0 0 .277.114h.012a.385.385 0 0 0 .3-.153l3.475-3.446a.393.393 0 0 0 0-.556.393.393 0 0 0-.557 0l-2.831 2.808V.398A.393.393 0 0 0 9.45.005a.393.393 0 0 0-.394.393v13.571l-2.855-2.833a.394.394 0 0 0-.556 0 .393.393 0 0 0 0 .556Z"
      />
      <path
        data-name="Path 6791"
        d="M18.497 12.592a.394.394 0 0 0-.394.394v4.723H.787v-4.723a.393.393 0 0 0-.394-.394.394.394 0 0 0-.394.394v5.116a.394.394 0 0 0 .394.394h18.1a.393.393 0 0 0 .394-.394v-5.116a.393.393 0 0 0-.39-.394Z"
      />
    </svg>
  );
};

SvgDownloadThin.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgDownloadThin.displayName = 'DownloadThin';
export default SvgDownloadThin;
