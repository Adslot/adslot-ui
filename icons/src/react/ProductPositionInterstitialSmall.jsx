import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgProductPositionInterstitialSmall = (props) => {
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
      <path fill="none" d="M0 0h16v16H0z" />
      <path fill="none" d="M1 1h14v14H1z" />
      <path
        d="M14.1 2.1H1.9c-.1 0-.3.1-.3.3v11.2c0 .1.1.3.3.3h12.3c.1 0 .3-.1.3-.3V2.4c-.1-.1-.2-.3-.4-.3zm-.2.6v1.1H2.1V2.7h11.8zM2.1 13.3v-9h11.7v9.1H2.1z"
        fill="#5a5a5a"
      />
      <path
        d="M12.4 5.1H3.5c-.2 0-.3.1-.3.2v6.5c0 .1.2.2.3.2h8.9c.2 0 .3-.1.3-.2V5.3c.1-.1-.1-.2-.3-.2z"
        fill="#ff837e"
      />
      <path
        d="M12.1 5.7s-.1 0 0 0l-.4.4-.4-.4h-.1v.1l.4.4-.4.4v.1l.4-.4.4.3v-.1l-.4-.4.5-.4c0 .1 0 0 0 0z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.24}
        strokeMiterlimit={10}
      />
    </svg>
  );
};

SvgProductPositionInterstitialSmall.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgProductPositionInterstitialSmall.displayName = 'ProductPositionInterstitialSmall';
export default SvgProductPositionInterstitialSmall;
