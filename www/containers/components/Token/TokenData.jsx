import _ from 'lodash';
import React from 'react';

const TokenData = ({ token, valueFormatter, children }) => {
  return (
    <>
      {children}
      <strong className="token-value">{`${_.kebabCase(token.attributes?.item ?? token.attributes?.type)}`}</strong>
      <span className="token-value token-value-variable">{`$${_.kebabCase(token.path.join('-'))}`}</span>
      <span className="token-value-hex">
        {valueFormatter ? valueFormatter(token.value) : token.value}{' '}
        {_.toLower(token.original.value) !== _.toLower(token.value) && (
          <span className="token-original">{token.original.value}</span>
        )}
      </span>
      <span className="token-value-description">{token.description}</span>
    </>
  );
};

export default TokenData;
