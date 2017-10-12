import React from 'react';
import Example from '../components/Example';
import {
  Alert,
} from '../../src/dist-entry';


class AlertExample extends React.PureComponent {
  render() {
    return (<Alert type="danger">Error: Unable to save. We can't talk to the API, try again in a bit.</Alert>);
  }
}


const exampleProps = {
  componentName: 'Alert',
  exampleCodeSnippet: '<Alert type="danger">Unable to save. We can\'t talk to the API, try again in a bit.</Alert>',
  propTypes: [{
    propType: 'type',
    type: "oneOf: 'danger', 'warning', 'error', 'success'",
  }],
};


export default () => <Example {...exampleProps}><AlertExample /></Example>;
