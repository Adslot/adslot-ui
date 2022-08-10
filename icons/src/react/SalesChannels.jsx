import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgSalesChannels = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M6.575 9.874h10.85a.582.582 0 0 0 .414-.171.589.589 0 0 0 .171-.414V1.645a.584.584 0 0 0-.585-.585H6.575a.586.586 0 0 0-.586.585v7.644a.586.586 0 0 0 .586.585zm.584-7.645h9.682v6.475H7.159V2.229zm-.911 15.333H.586a.585.585 0 0 0-.586.584v4.209a.586.586 0 0 0 .586.585h5.662a.582.582 0 0 0 .584-.585v-4.209a.582.582 0 0 0-.584-.584zm-.585 4.208H1.169v-3.038h4.494v3.038zm9.168-4.208H9.168a.586.586 0 0 0-.584.584v4.209a.586.586 0 0 0 .584.585h5.663a.587.587 0 0 0 .585-.585v-4.209a.585.585 0 0 0-.585-.584zM9.753 21.77v-3.039h4.493v3.039H9.753zm14.076-4.037a.594.594 0 0 0-.413-.172h-5.664a.587.587 0 0 0-.584.585v4.209a.586.586 0 0 0 .584.585h5.664a.584.584 0 0 0 .584-.585v-4.209a.585.585 0 0 0-.171-.413zm-1 4.037h-4.488v-3.039h4.494l-.006 3.039zM1.72 16.182a.587.587 0 0 0 .586-.586v-1.127l8.947-.013v1.242a.585.585 0 1 0 1.169 0v-1.242l8.947.013v1.127a.585.585 0 1 0 1.17 0v-1.714a.583.583 0 0 0-.583-.584l-9.533-.013v-1.7a.585.585 0 1 0-1.169 0v1.7l-9.533.015a.583.583 0 0 0-.583.584v1.711a.585.585 0 0 0 .582.587z" />
    </svg>
  );
};

SvgSalesChannels.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgSalesChannels.displayName = 'SalesChannels';
export default SvgSalesChannels;
