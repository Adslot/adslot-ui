import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMarketplaceStopwatch = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path fill="#D3D3D3" d="M38.51 13.89a2.56 2.56 0 0 0-3.68 0l3.66 3.66a2.56 2.56 0 0 0 .02-3.66Z" />
      <path fill="#FFF" d="m34.83 13.87 1.86 1.86 1.83-1.83a2.56 2.56 0 0 0-3.69-.03Z" />
      <path
        fill="#CFD3D4"
        d="m36.66 17.53.92-.92-1.83-1.83-.87.87a15 15 0 0 1 1.78 1.88ZM25 11.93a15.06 15.06 0 0 1 2.13.15v-1.75h-4.26v1.76a15.06 15.06 0 0 1 2.13-.16Z"
      />
      <path fill="#C9F2F8" d="M12.73 27A12.27 12.27 0 0 0 25 39.25V14.7A12.27 12.27 0 0 0 12.73 27Z" />
      <path fill="#D3D3D3" d="M29.27 10.86h-8.54V9.74a1.54 1.54 0 0 1 1.48-1.55h5.58a1.54 1.54 0 0 1 1.48 1.55Z" />
      <path fill="#FFF" d="M25 8.19h-2.79a1.54 1.54 0 0 0-1.48 1.55v1.12H25Z" />
      <path fill="#4FAAC9" d="M30.15 20.56 22.7 28a1 1 0 0 0 1.43 1.43L31.57 22a1 1 0 1 0-1.43-1.43Z" />
      <circle fill="#FFF" cx={25} cy={26.87} r={14.94} />
      <circle fill="#9CE5F4" cx={25} cy={26.97} r={12.27} />
    </svg>
  );
};

SvgMarketplaceStopwatch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMarketplaceStopwatch.displayName = 'MarketplaceStopwatch';
export default SvgMarketplaceStopwatch;
