import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgNotification = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <g strokeWidth={0.35} stroke="#707070" fill="#5a5a5a">
        <path d="M10.759 8.168a.21.21 0 0 0 .01-.041.225.225 0 0 0 0-.043.232.232 0 0 0-.007-.043.227.227 0 0 0-.021-.04.206.206 0 0 0-.017-.032h-.006v-.007a5.8 5.8 0 0 1-1.5-4.213A2.743 2.743 0 0 0 7.64 1.038a3.633 3.633 0 0 0-3.279 0 2.744 2.744 0 0 0-1.579 2.71 5.8 5.8 0 0 1-1.5 4.214v.007h-.006A.174.174 0 0 0 1.259 8a.2.2 0 0 0-.021.04.191.191 0 0 0-.007.043.22.22 0 0 0 0 .043.209.209 0 0 0 .009.04.2.2 0 0 0 .013.043.23.23 0 0 0 .024.035.237.237 0 0 0 .023.032h.007v.006a7.87 7.87 0 0 0 9.4 0v-.006h.007a.2.2 0 0 0 .023-.032.228.228 0 0 0 .025-.035.225.225 0 0 0-.003-.042zm-8.991-.092a6.286 6.286 0 0 0 1.455-4.35 2.285 2.285 0 0 1 1.331-2.29 3.176 3.176 0 0 1 2.868 0 2.285 2.285 0 0 1 1.33 2.29 6.29 6.29 0 0 0 1.456 4.35 7.429 7.429 0 0 1-8.44.002v-.002z" />
        <path d="M7.014 10.103a.227.227 0 0 0-.227.227c0 .316-.366.583-.8.583s-.8-.267-.8-.583a.227.227 0 1 0-.453 0 1.275 1.275 0 0 0 2.5 0 .227.227 0 0 0-.22-.227z" />
      </g>
    </svg>
  );
};

SvgNotification.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgNotification.displayName = 'Notification';
export default SvgNotification;
