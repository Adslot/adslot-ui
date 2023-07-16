import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Switch } from '../../src';
import designTokens from '../../system/internal';
import c from '../../system/tokens/color.json';
import TokenData from './TokenData';
import JSONReference from './JSONReference';
import useAccessibleContrastRatio from './useAccessibleContrastRatio';
import './token-styles.css';

const { color } = c;

const { color: colorTokens } = designTokens;

const Colors = () => {
  const [showContrast, setShowContrast] = React.useState(true);

  return (
    <>
      <div className="token-container">
        <label>
          <Switch checked={showContrast} onChange={() => setShowContrast(!showContrast)}></Switch> Toggle contrast ratio
        </label>

        <div className="token-group">
          <h2 id="themes">Themes</h2>

          <ColorMap
            tokens={_.pick(colorTokens, ['primary', 'success', 'danger', 'warning', 'info', 'default', 'secondary'])}
            showContrast={showContrast}
          />
        </div>
        <div className="token-group">
          <ColorMap tokens={_.pick(colorTokens, 'text')} showContrast={showContrast} />
        </div>
        <div className="token-group">
          <ColorMap tokens={_.pick(colorTokens, 'border')} showContrast={showContrast} />
        </div>

        <div className="token-group">
          <h2 id="greys">Greys</h2>
          <p>
            Greys are used throughout our platforms for text, borders and layout. Greys are the neutral tones used to
            create contrast and lightness through our platforms.
          </p>
          <ColorMap tokens={_.pick(colorTokens, ['grey'])} showContrast={showContrast} />
        </div>
        <div className="token-group">
          <h2 id="primary-base">Primary Base</h2>
          <p>
            Primary base palette is used to drive action and inform users of an objects next step of a workflow. Primary
            is the base for all our platform statuses requiring attention (RED), a primary action on a page (BLUE),
            success or placement is live (GREEN), warning or placement is pending action (ORANGE).
          </p>

          <ColorMap
            tokens={_.pick(colorTokens, ['blue', 'green', 'red', 'orange', 'cyan', 'purple', 'teal', 'yellow'])}
            showContrast={showContrast}
          />
          <JSONReference tokens={color} />
        </div>
      </div>
    </>
  );
};

const ColorMap = ({ tokens, label, showContrast }) => {
  return _.map(tokens, (token, k) => {
    return <Token token={token} key={k} label={k} parent={label} showContrast={showContrast} />;
  });
};

const Token = ({ token, label, parent, showContrast }) => {
  const { ratioOnText, scoreOnText, passesOnText, scoreOnWhite, ratioOnWhite, passesOnWhite } =
    useAccessibleContrastRatio(token.value || '');
  if (!token.value && _.some(token, (v) => _.isObject(v)))
    return (
      <div className="token-sub-group">
        <p className="sub-group-heading">{_.startCase(`${parent || ''} ${label}`)}</p>
        <div className="token">
          <span>Colour</span>
          <span>Name</span>
          <span>Token</span>
          <span>Value</span>
          <span>Description</span>
        </div>
        <ColorMap tokens={token} label={label} showContrast={showContrast} />
      </div>
    );

  if (!token.value && !_.some(token, (v) => _.isObject(v))) return null;

  return (
    <>
      <div>
        <div className="token">
          <div
            style={{
              backgroundColor: token.value,
              padding: 12,
            }}
            className={classNames('token-swatch', { 'has-border': token.value === color.white })}
          >
            {showContrast && (
              <>
                <span className="token-ratio">
                  <span className={classNames('token-ratio-status', { success: passesOnText })}>{ratioOnText}</span>
                  <span style={{ color: color.text.base }} className="token-ratio-example">
                    {scoreOnText}
                  </span>
                </span>

                <span className="token-ratio">
                  <span className={classNames('token-ratio-status', { success: passesOnWhite })}>{ratioOnWhite}</span>
                  <span style={{ color: color.text.inverse }} className="token-ratio-example">
                    {scoreOnWhite}
                  </span>
                </span>
              </>
            )}
          </div>
          <TokenData token={token} />
        </div>
      </div>
    </>
  );
};

export default Colors;
