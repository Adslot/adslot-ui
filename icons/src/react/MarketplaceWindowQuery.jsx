import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgMarketplaceWindowQuery = (props) => {
  const { className, color = 'currentColor', size = 16, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...rest}
      className={classnames('svg-icon', className)}
      width={size}
      height={size}
    >
      <path d="M10 10h80v80H10z" fill="#EDF0F1" />
      <path d="M10 10h80v16.6H10z" fill="#546A79" />
      <path d="M22.4 37.6H79V79H22.4z" fill="#FFF" />
      <path
        d="M50 68.5c0 .5-.2 1-.7 1.4-.4.4-1.1.6-1.8.6-.8 0-1.4-.2-1.9-.6-.5-.4-.7-.9-.7-1.4v-.9c0-.5.2-1 .7-1.4.5-.4 1.1-.6 1.9-.6.7 0 1.3.2 1.8.6.5.4.7.9.7 1.4v.9zm5.1-13.8c-.3.6-.7 1.1-1.1 1.5-.4.4-.9.8-1.4 1.1-.5.3-1 .7-1.4 1-.4.3-.8.7-1 1.2-.3.4-.4.9-.4 1.5v.6c0 .4-.2.8-.6 1.2-.4.4-.9.6-1.5.7h-.1c-.6 0-1.1-.2-1.5-.5-.4-.4-.6-.8-.6-1.3 0-1.1.2-2 .4-2.7.3-.7.7-1.4 1.1-1.9.4-.5.9-1 1.4-1.3.5-.4 1-.7 1.4-1 .4-.3.7-.7 1-1 .3-.3.4-.7.4-1.2 0-.8-.2-1.4-.7-1.8-.5-.4-1.1-.6-1.9-.6-.5 0-1 0-1.4.1-.4.1-.7.2-1 .3-.3.1-.6.3-.8.6-.3.3-.5.6-.8 1-.3.4-.6.6-1.1.8-.5.2-1.1.1-1.7-.1-.5-.3-.8-.6-1-1-.1-.4-.1-.8 0-1.2.1-.3.3-.8.6-1.3s.8-1 1.5-1.5c.6-.5 1.4-.9 2.3-1.2.9-.3 2.1-.5 3.3-.5 1.3 0 2.4.2 3.2.6.9.4 1.6.9 2.2 1.5.5.6 1 1.3 1.2 2.1.2.8.4 1.6.4 2.4 0 .6-.1 1.3-.4 1.9z"
        fill="#546A79"
      />
      <circle cx={18.3} cy={18.3} r={4.1} fill="#ED7061" />
      <circle cx={30.7} cy={18.3} r={4.1} fill="#EFC41B" />
      <circle cx={43.1} cy={18.3} r={4.1} fill="#4FBA6E" />
    </svg>
  );
};

SvgMarketplaceWindowQuery.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};
SvgMarketplaceWindowQuery.displayName = 'MarketplaceWindowQuery';
export default SvgMarketplaceWindowQuery;
