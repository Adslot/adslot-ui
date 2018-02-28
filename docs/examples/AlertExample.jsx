import React from 'react';
import Example from '../components/Example';
import { Alert } from '../../src';

class AlertExample extends React.PureComponent {
  render() {
    return <Alert type="danger">{`Error: Unable to save. We can't talk to the API, try again in a bit.`}</Alert>;
  }
}

const exampleProps = {
  componentName: 'Alert',
  designNotes: (
    <div>
      <p>
        Alert messages are used to provide action-based feedback. The most common message colours used are
        <span className="text-green">Success</span> and <span className="text-red">Error</span>.
        <span className="text-orange">Warning</span> is rarely used as a flash message, and occasionally
        <span className="text-cyan">Info</span> is used to present further information related to a performed action.
      </p>
      <label>Examples:</label>
      <p>
        <span className="text-green">Success</span> : indicates that an action was processed successfully.
        <br />
        <span className="text-orange">Warning</span> : indicates that an action may have concerns but not critical.
        <br />
        <span className="text-red">Error</span> : indicates that an action failed completely or something is critically
        wrong.
        <br />
        <span className="text-cyan">Info</span> : provides information related to a performed action.
      </p>
    </div>
  ),
  exampleCodeSnippet: '<Alert type="danger">Unable to save. We can\'t talk to the API, try again in a bit.</Alert>',
  propTypes: [
    {
      propType: 'type',
      type: "oneOf: 'danger', 'warning', 'error', 'success'",
    },
    {
      propType: 'children',
      type: 'node',
    },
    {
      propType: 'dts',
      type: 'string',
      note: 'render `data-test-selector` onto the component. It can be useful for testing.',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <AlertExample />
  </Example>
);
