import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { MDXProvider } from '@mdx-js/react';
import * as AdslotUI from '../../src';
import theme from './theme';

/* eslint-disable */
export default ({ children, className, live }) => {
  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        language="jsx"
        noInline={children.includes('render(')}
        scope={{ ...AdslotUI, MDXProvider }}
        theme={theme}
        className="test"
      >
        <h4 style={{ marginTop: '20px' }}>
          <b>Example</b>
        </h4>
        <LivePreview style={{ marginTop: '10px' }} />
        <LiveError className="aui--docs-code-error" />
        <h4 style={{ marginTop: '40px' }}>Try editing the livecode below:</h4>
        <LiveEditor />
      </LiveProvider>
    );
  }
  return (
    <Highlight {...defaultProps} code={children} language="javascript" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, paddingTop: '15px', paddingLeft: '15px', minWidth: '70vw' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
/* eslint-enable */
