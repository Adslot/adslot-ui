import React from 'react';
import _ from 'lodash';
import designTokens from '../../../../system/internal';
import f from '../../../../system/tokens/font.json';
import TokenData from '../Token/TokenData';
import JSONReference from '../Token/JSONReference';
import './styles.css';
import '../Token/styles.css';
const { font } = f;
const { font: fontTokens } = designTokens;

const Typography = () => {
  return (
    <div className="token-container token-container__typography">
      <div className="token-group">
        <div className="token-sub-group">
          <h2 className="sub-group-heading">Sizes</h2>
          <div className="token">
            <span>Example</span>
            <span>Name</span>
            <span>Token</span>
            <span>Value</span>
            <span>Description</span>
          </div>
          {_.map(fontTokens.size, (token, k) => {
            return (
              <div key={k}>
                <div className="token">
                  <TypeExample style={{ fontSize: token.value }} />
                  <TokenData token={token} valueFormatter={(v) => `${v}px`} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="token-sub-group">
          <h2 className="sub-group-heading">Weights</h2>
          <div className="token">
            <span>Example</span>
            <span>Name</span>
            <span>Token</span>
            <span>Value</span>
            <span>Description</span>
          </div>
          {_.map(fontTokens.weight, (token, k) => {
            return (
              <div key={k}>
                <div className="token">
                  <TypeExample style={{ fontWeight: token.value }} />
                  <TokenData token={token} />
                </div>
              </div>
            );
          })}
        </div>
        <JSONReference tokens={font} />
      </div>
    </div>
  );
};

export default Typography;

const TypeExample = ({ style }) => <p style={style}>Lorem ipsum dolor sit amet</p>;
