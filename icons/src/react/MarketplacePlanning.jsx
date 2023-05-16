import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMarketplacePlanning = (props) => {
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
      <path
        fill="#FFF"
        d="M10.42 12.17a1.75 1.75 0 0 1 1.75-1.75H25l7.29 6.12v21.29a1.75 1.75 0 0 1-1.75 1.75H12.17a1.75 1.75 0 0 1-1.75-1.75Z"
      />
      <path fill="#F0F1F1" d="M25 10.42v4.37a1.75 1.75 0 0 0 1.75 1.75h5.54Z" />
      <path fill="#F79392" d="M39.58 38.21a1.37 1.37 0 0 1-1.37 1.37h-1.82A1.37 1.37 0 0 1 35 38.21v-.91h4.56Z" />
      <path
        fill="#E2E4E5"
        d="M28.19 20.44a.46.46 0 0 1-.46.46H20.9a.46.46 0 0 1-.46-.46.46.46 0 0 1 .46-.44h6.83a.46.46 0 0 1 .46.46ZM25.46 22.72a.46.46 0 0 1-.46.46h-4.1a.46.46 0 0 1-.46-.46.46.46 0 0 1 .46-.46H25a.46.46 0 0 1 .46.46ZM28.19 26.37a.46.46 0 0 1-.46.46H20.9a.46.46 0 0 1-.46-.46.46.46 0 0 1 .46-.46h6.83a.46.46 0 0 1 .46.46ZM25.46 28.65a.46.46 0 0 1-.46.46h-4.1a.46.46 0 0 1-.46-.46.46.46 0 0 1 .46-.46H25a.46.46 0 0 1 .46.46ZM28.19 32.29a.46.46 0 0 1-.46.46H20.9a.46.46 0 0 1-.46-.46.46.46 0 0 1 .46-.46h6.83a.46.46 0 0 1 .46.46ZM25.46 34.57A.46.46 0 0 1 25 35h-4.1a.46.46 0 0 1-.46-.46.46.46 0 0 1 .46-.46H25a.46.46 0 0 1 .46.46Z"
      />
      <path
        fill="#12B2A0"
        d="m15.92 23.63-1.72-1.72a.46.46 0 1 1 .64-.64l1 1 2-2.35a.46.46 0 1 1 .7.58ZM15.92 29.56l-1.72-1.72a.46.46 0 1 1 .64-.64l1 1 2-2.35a.46.46 0 1 1 .7.58ZM15.92 35.48l-1.72-1.72a.46.46 0 1 1 .64-.64l1 1 2-2.35a.46.46 0 1 1 .7.58Z"
      />
      <path fill="#3E3E3F" d="m37.31 14.06-.85 1.78a1 1 0 0 0 1.69 0Z" />
      <path
        fill="#0484AB"
        d="M38.44 19.53a1.14 1.14 0 0 1-1.1-.84h-.08a1.14 1.14 0 0 1-2.16.13h-.08v17.57h4.56V18.83h-.08a1.14 1.14 0 0 1-1.06.7Z"
      />
      <path fill="#21B2D1" d="M35 36.39V18.85h.09a1.14 1.14 0 0 0 2.15-.14v17.7Z" />
      <path fill="#F7B4B4" d="M35 37.3v.91a1.37 1.37 0 0 0 1.37 1.37h.91V37.3Z" />
      <path fill="#F4D0A1" d="m35.02 18.85 2.28-4.79 2.28 4.79v17.54h-4.56V18.85z" />
      <path fill="#EDBC7C" d="M39.58 21.36v-2.51l-2.28-4.79v7.3h2.28z" />
      <path fill="#FACB1B" d="M35.02 35.93h4.56v1.37h-4.56z" />
      <path fill="#FBE158" d="M35.02 36.39h2.28v.91h-2.28z" />
    </svg>
  );
};

SvgMarketplacePlanning.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMarketplacePlanning.displayName = 'MarketplacePlanning';
export default SvgMarketplacePlanning;
