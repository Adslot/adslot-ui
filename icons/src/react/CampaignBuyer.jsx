import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCampaignBuyer = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.2 40.2"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M23.3 24.1c-.6-.4-.8-.7-.9-.8v-1c.9-1 1.6-2.3 2-3.8.5-.5.9-1.2 1-1.9.1-.8-.1-1.5-.5-2.1v-3c0-4-2.4-6.3-6.7-6.3-4.2 0-6.7 2.4-6.7 6.3v3c-.4.6-.6 1.4-.5 2.1s.5 1.4 1 1.9c.4 1.5 1.1 2.8 2 3.8v1c-.2.4-1.6 1.7-9.5 4.9-.7.3-1.1.9-1.1 1.6v1.5c0 .4.3.7.7.7.6 0 .9-.3.9-.7v-1.5c0-.1.1-.3.2-.3 8.6-3.4 10-4.8 10.3-5.8V22c0-.2-.1-.4-.2-.5-.9-.9-1.5-2.2-1.9-3.6 0-.2-.1-.3-.3-.4-.4-.3-.6-.7-.7-1.1-.1-.5.1-.9.4-1.3.2-.1.2-.3.2-.4v-3.2c0-3.2 1.9-4.9 5.3-4.9 3.5 0 5.3 1.7 5.3 4.9v3.2c0 .2.1.3.2.4.3.4.4.8.4 1.3-.1.4-.3.9-.7 1.1-.1.1-.2.2-.3.4-.4 1.5-1.1 2.7-1.9 3.6-.2.2-.3.3-.3.5V23.6c.2.5.6 1 1.4 1.6.3.2.8.1 1-.2.3-.2.2-.7-.1-.9zM35 25c-1.3-1.3-2.9-2-4.7-2s-3.5.7-4.7 2c-2.6 2.6-2.6 6.9 0 9.5 1.3 1.3 2.9 2 4.7 2 1.8 0 3.5-.7 4.7-2 2.7-2.7 2.7-6.9 0-9.5zm-.9 8.4c-2 2-5.5 2-7.5 0-2.1-2.1-2.1-5.4 0-7.5 1-1 2.3-1.6 3.7-1.6 1.4 0 2.7.6 3.7 1.6 2.1 2.1 2.1 5.5.1 7.5z" />
      <path d="m32.6 27.5-3.3 3.6-1.3-1.4c-.3-.3-.7-.3-1 0s-.3.7 0 1l1.8 1.9.1.1h.1c.1 0 .2.1.3.1.1 0 .2 0 .3-.1h.1s.1 0 .1-.1l3.9-4.1c.3-.3.2-.7 0-1-.4-.3-.8-.3-1.1 0z" />
    </svg>
  );
};

SvgCampaignBuyer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCampaignBuyer.displayName = 'CampaignBuyer';
export default SvgCampaignBuyer;
