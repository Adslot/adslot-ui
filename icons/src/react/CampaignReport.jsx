import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgCampaignReport = (props) => {
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
      <path d="m13.4 3.2-2-2c-.1-.1-.3-.2-.4-.2H2.9c-.2 0-.4.2-.4.5v13c0 .3.2.5.5.5h10.1c.3 0 .5-.2.5-.5v-11c-.1-.1-.1-.3-.2-.3zm-10 10.9V1.9h7.3v1.5c0 .2.1.3.3.3h1.6V14H3.4z" />
      <path d="M11.3 5.1H4.8c-.1 0-.2.1-.2.2v6.5c0 .1.1.2.2.2h6.5c.1 0 .2-.1.2-.2V5.2c-.1-.1-.1-.1-.2-.1zm-.2 3.2H9.2V7H11v1.3zm-2.2 0H7.1V7h1.8v1.3zm-2.1 0H4.9V7h1.8l.1 1.3zm-1.9.3h1.8v1.3H4.9V8.6zm2.2 0h1.8v1.3H7.1V8.6zm2.2 0h1.8v1.3H9.3V8.6zm1.8-1.9H9.3V5.4h1.8v1.3zm-2.2 0H7.1V5.4h1.8v1.3zm-4-1.3h1.8v1.3H4.9V5.4zm0 4.8h1.8v1.3H4.9v-1.3zm2.2 0h1.8v1.3H7.1v-1.3zm4 1.3H9.2v-1.3H11v1.3z" />
    </svg>
  );
};

SvgCampaignReport.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgCampaignReport.displayName = 'CampaignReport';
export default SvgCampaignReport;
