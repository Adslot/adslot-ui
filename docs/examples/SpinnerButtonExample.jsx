import React from 'react';
import Example from '../components/Example';
import {
  SpinnerButton,
} from '../../src/dist-entry';


class SpinnerButtonExample extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.onClick = () => {
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 400 + Math.floor(Math.random() * 1200) + 1); // simulate a random wait interval
    };
  }

  render() {
    const onClick = this.onClick;
    const { isLoading } = this.state;
    return (<SpinnerButton bsStyle="primary" isLoading={isLoading} onClick={onClick}>Save Details</SpinnerButton>);
  }
}


const exampleProps = {
  componentName: 'SpinnerButton',
  notes: <div>Extends the above <pre>Button</pre> component with added loading state.</div>,
  exampleCodeSnippet: '<SpinnerButton bsStyle="primary" isLoading={isLoading} onClick={onClick}>\n  Save Details\n</SpinnerButton>',
  propTypes: [{
    propType: 'isLoading',
    type: 'bool',
    defaultValue: 'false',
    note: <span>When <pre>isLoading</pre> is <pre>true</pre> the button is disabled.</span>,
  }, {
    propType: 'onClick',
    type: 'func',
    note: <span>Should set <pre>isLoading</pre> to true, and reset to <pre>false</pre> upon completion.</span>,
  }],
};


export default () => <Example {...exampleProps}><SpinnerButtonExample /></Example>;
