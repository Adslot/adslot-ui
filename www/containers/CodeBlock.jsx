import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { mdx } from '@mdx-js/react';
import moment from 'moment';
import * as AdslotUI from '../../src';

const showIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={{ width: 16 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);
const hideIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    style={{ width: 16 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);
/* eslint-disable */
export default ({ children, className, live }) => {
  const [showCode, setShowCode] = React.useState(false);

  if (live) {
    return (
      <div className="adslot-ui-code-example">
        <LiveProvider
          code={children.trim()}
          language="jsx"
          noInline={children.includes('render(')}
          scope={{ ...AdslotUI, mdx, moment }}
          theme={theme}
          className="test"
        >
          <h4>
            Example
            <AdslotUI.Popover
              style={{ marginLeft: 'auto' }}
              popoverContent={`${!showCode ? 'Show' : 'Hide and reset'} code`}
              triggers={'hover'}
              theme="dark"
              placement="top"
            >
              <AdslotUI.Button
                onClick={() => setShowCode((prev) => !prev)}
                icon={!showCode ? showIcon : hideIcon}
                round
              ></AdslotUI.Button>
            </AdslotUI.Popover>
          </h4>
          <LivePreview style={{ marginTop: '10px' }} />
          {showCode && (
            <div className="adslot-ui-code-block--code">
              <LiveError className="aui--docs-code-error" />
              <h4 style={{ marginTop: '40px' }}>Try editing the livecode below:</h4>
              <LiveEditor />
            </div>
          )}
        </LiveProvider>
      </div>
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
