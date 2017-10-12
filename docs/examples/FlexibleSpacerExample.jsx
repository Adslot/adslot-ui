import React from 'react';
import Example from '../components/Example';
import {
  FlexibleSpacer,
} from '../../src/dist-entry';


class FlexibleSpacerExample extends React.PureComponent {
  render() {
    return (<FlexibleSpacer />);
  }
}


const exampleProps = {
  componentName: 'Flexible Spacer',
  notes: 'Used to fill a flex container with empty space.',
  exampleCodeSnippet: '<FlexibleSpacer />',
  propTypes: [],
};


export default () => <Example {...exampleProps}><FlexibleSpacerExample /></Example>;
