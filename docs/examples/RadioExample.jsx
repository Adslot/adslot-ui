import React from 'react';
import Example from '../components/Example';
import {
  Radio,
  RadioGroup,
} from '../../src/dist-entry';


class RadioExample extends React.PureComponent {
  render() {
    return (<RadioGroup name="yesNo" className="radiogroup-stacked">
      <Radio label="Yes" value="true" />
      <Radio label="No" value="false" />
    </RadioGroup>);
  }
}


const exampleProps = {
  componentName: 'Radio',
  notes: <span>See <a href="https://github.com/luqin/react-icheck">React iCheck Documentation</a></span>,
  exampleCodeSnippet: `<RadioGroup name="yesNo" className="radiogroup-stacked">
  <Radio label="Yes" value="true" />
  <Radio label="No" value="false" />
</RadioGroup>`,
  propTypes: [{
    propType: 'label',
    type: 'node',
    note: 'Usually fine to rely on a string but can pass HTML e.g. for a url.',
  }, {
    propType: 'value',
    type: 'string',
  }, {
    propType: 'onChange',
    type: 'func',
  }],
};


export default () => <Example {...exampleProps}><RadioExample /></Example>;
