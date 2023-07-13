import React from 'react';
import _ from 'lodash';
import designTokens from '../../system/internal';
import borderRadius from '../../system/tokens/borderRadius.json';
import TokenData from './TokenData';
import JSONReference from './JSONReference';
import './token-styles.css';

const { borderRadius: borderRadiusTokens } = designTokens;

const BorderRadius = () => {
  return (
    <div className="token-container token-container__border-radius">
      <div className="token-group">
        <div className="token-sub-group">
          <h2 className="sub-group-heading">Border Radius</h2>
          <div className="token">
            <span>Example</span>
            <span>Name</span>
            <span>Token</span>
            <span>Value</span>
            <span>Description</span>
          </div>
          {_.map(borderRadiusTokens, (token, k) => {
            return (
              <div key={k}>
                <div className="token">
                  <BRExample style={{ borderRadius: token.value, border: '1px solid', padding: 24 }} />
                  <TokenData token={token} valueFormatter={(v) => `${v}px`} />
                </div>
              </div>
            );
          })}
        </div>
        <JSONReference tokens={borderRadius.borderRadius} />
      </div>
    </div>
  );
};

export default BorderRadius;

const BRExample = ({ style }) => <div style={style}></div>;
