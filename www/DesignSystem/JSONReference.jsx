import React from 'react';

const JSONReference = ({ tokens, label = 'JSON reference' }) => {
  return (
    <details id="json-reference">
      <summary className="token-summary">
        <span>{label}</span>
      </summary>
      <pre>
        <code>{JSON.stringify(tokens, null, 2)}</code>
      </pre>
    </details>
  );
};

export default JSONReference;
