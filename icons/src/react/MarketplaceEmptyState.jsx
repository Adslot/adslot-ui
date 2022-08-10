import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMarketplaceEmptyState = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 130"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="none" d="M0 0h130v130H0z" />
      <path
        d="M115.9 56.4H76.3c-4.3 0-7.7 3.5-7.7 7.7v41.5l-11.1 9.1H116c4.3 0 7.7-3.5 7.7-7.7V64.1c0-4.3-3.5-7.7-7.8-7.7z"
        fill="#e6f7ff"
        stroke="#2c3850"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <path
        d="M111 78.1c0-8.5-7.1-15.4-15.8-15-7.7.4-14 6.7-14.3 14.4-.2 4.6 1.7 8.8 4.9 11.7 2.8 2.6 4.5 6.2 4.5 10v1.8h11.4v-1.8c0-3.8 1.7-7.4 4.5-10 2.9-2.8 4.8-6.8 4.8-11.1z"
        fill="#fff"
        stroke="#2c3850"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <path
        fill="none"
        stroke="#2c3850"
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M90 102.8h11.7M90 104.6h11.7M90 106.4h11.7m-10.3 1.8h8.9"
      />
      <path
        d="M87.3 83.1c1.4 0 1.4 2.6 2.9 2.6 1.4 0 1.4-2.6 2.9-2.6 1.4 0 1.4 2.6 2.9 2.6 1.4 0 1.4-2.6 2.9-2.6 1.4 0 1.4 2.6 2.9 2.6 1.4 0 1.4-2.6 2.9-2.6"
        fill="none"
        stroke="#2c3850"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <path
        d="M51.2 40H13.1c-3.8 0-6.8 3-6.8 6.8v38.1c0 3.8 3 6.8 6.8 6.8H44l8.1 9.9v-10c3.3-.5 5.9-3.3 5.9-6.7V46.7c0-3.7-3-6.7-6.8-6.7z"
        fill="#e6f7ff"
        stroke="#2c3850"
        strokeWidth={0.5}
        strokeMiterlimit={10}
      />
      <g stroke="#2c3850" strokeWidth={0.5} strokeMiterlimit={10}>
        <path
          d="M92 7.2c-15 0-24.1 6.3-24.1 18.6 0 4.6 1.3 8.4 3.7 11.3l-3.2 10 12-4.3c3.3 1.1 7.2 1.6 11.6 1.6 15 0 24.1-6.3 24.1-18.6S107 7.2 92 7.2z"
          fill="#e6f7ff"
        />
        <g fill="none" strokeLinecap="round">
          <path d="M86.9 16.5s1.6-2.7 5.1-2.6c4.7.2 5.5 3.6 5 5.8-.5 2.8-3.8 3.7-5.6 6.6-1.6 2.6-.4 5.3-.4 5.3" />
          <circle cx={91.3} cy={35.8} r={0.9} />
        </g>
      </g>
      <g fill="#fff" stroke="#2c3850" strokeWidth={0.5} strokeMiterlimit={10}>
        <path d="M14.2 54.7h35.7V78H14.2z" />
        <path d="m14.2 54.7 17.9 15.8 17.8-15.8z" />
      </g>
      <path fill="none" d="M6.3 7.2h130v130H6.3z" />
    </svg>
  );
};

SvgMarketplaceEmptyState.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMarketplaceEmptyState.displayName = 'MarketplaceEmptyState';
export default SvgMarketplaceEmptyState;
