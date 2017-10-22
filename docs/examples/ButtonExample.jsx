import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import {
  Button,
} from '../../src/dist-entry';

class ButtonExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      canUndo: false,
    };
    this.onClick = () => this.setState({ canUndo: !this.state.canUndo });
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="link"
          disabled={!this.state.canUndo}
          reason="There's nothing to undo."
          onClick={this.onClick}
        >
          Undo
        </Button>
        <Button
          bsStyle="primary"
          disabled={this.state.canUndo}
          onClick={this.onClick}
        >
          Apply
        </Button>
      </div>
    );
  }
}

export const exampleProps = {
  componentName: 'Button',
  notes: (<p>See <a href="https://getbootstrap.com/docs/3.3/css/#buttons" target="_blank" rel="noopener noreferrer">
    Bootstrap documentation
  </a> or <a href="https://react-bootstrap.github.io/components.html#buttons" target="_blank" rel="noopener noreferrer">
    React Bootstrap documentation
  </a>.</p>),
  exampleCodeSnippet: `<div>
  <Button
    bsStyle="link"
    disabled={!this.state.canUndo}
    reason="There's nothing to undo."
    onClick={this.onClick}
  >
    Undo
  </Button>
  <Button
    bsStyle="primary"
    disabled={this.state.canUndo}
    onClick={this.onClick}
  >
    Apply
  </Button>
</div>`,
  propTypes: [{
    propType: 'bsStyle',
    type: 'string, oneOf primary, link, and default.',
    defaultValue: 'default',
    note: <span>
      <br />It's uncommon to use <pre>success</pre>, <pre>info</pre>, <pre>warning</pre>, or <pre>danger</pre>
      which are supported by Bootstrap but not us.
    </span>,
  }, {
    propType: 'inverse',
    type: 'bool',
    note: 'Renders an inverse button. Can be used with bsStyle to create primary inverse buttons.',
  }, {
    propType: 'reason',
    type: 'string',
    note: 'Used in tandem with the disabled prop to present a popover explaining why the button is disabled.',
  }, {
    propType: 'onClick',
    type: 'func',
    note: 'onClick(event)',
  }, {
    propType: 'bsSize',
    type: 'string',
    note: <span>We rarely use <pre>large</pre>, and should not use <pre>small</pre>.</span>,
  }],
};

export default () => <Example {...exampleProps}><ButtonExample /></Example>;
