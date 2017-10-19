import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import {
  Button,
} from '../../src/dist-entry';

class ButtonExample extends React.PureComponent {
  render() {
    const onClick = _.noop;
    return (<Button bsStyle="primary" onClick={onClick}>Apply</Button>);
  }
}

export const exampleProps = {
  componentName: 'Button',
  notes: (<p>See <a href="https://getbootstrap.com/docs/3.3/css/#buttons" target="_blank" rel="noopener noreferrer">
    Bootstrap documentation
  </a> or <a href="https://react-bootstrap.github.io/components.html#buttons" target="_blank" rel="noopener noreferrer">
    React Bootstrap documentation
  </a>.</p>),
  exampleCodeSnippet: '<Button bsStyle="primary" onClick={onClick}>\n  Apply\n</Button>',
  propTypes: [{
    propType: 'bsStyle',
    type: 'string, oneOf primary, link, and default.',
    defaultValue: 'default',
    note: <span>
      For an inverse button use <pre>className="btn-inverse"</pre>.
      <br />It's uncommon to use <pre>success</pre>, <pre>info</pre>, <pre>warning</pre>, or <pre>danger</pre>
      which are supported by Bootstrap but not us.
    </span>,
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
