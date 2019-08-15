import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { Switch } from '../../src';

class SwitchExample extends React.PureComponent {
  state = {
    isToggleOn: true,
  };

  onChange = newValue => {
    this.setState({ isToggleOn: newValue });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="component-heading">Un-Controlled Switch without defaultChecked</div>
          <div className="component-container">
            <Switch />
          </div>
        </div>
        <div>
          <div className="component-heading">Un-Controlled Switch with defaultChecked</div>
          <div className="component-container">
            <Switch defaultChecked={true} />
          </div>
        </div>
        <div>
          <div className="component-heading">Un-Controlled Switch with defaultChecked with onChange</div>
          <div className="component-container">
            <Switch defaultChecked={false} onChange={_.noop} />
          </div>
        </div>
        <div>
          <div className="component-heading">Controlled Switch</div>
          <div className="component-container">
            <Switch checked={this.state.isToggleOn} onChange={this.onChange} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const exampleProps = {
  componentName: 'Switch',
  exampleCodeSnippet: `
    <Switch />
    <Switch defaultValue={true} />
    <Switch defaultChecked={true} onChange={(nextState) => func(nextState)} />
    <Switch checked={true} onChange={(nextState) => func(nextState)} />
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'defaultChecked',
          type: 'boolean',
          defaultValue: null,
          note: 'switch value, if the value is un-controlled',
        },
        {
          propType: 'checked',
          type: 'boolean',
          defaultValue: null,
          note: 'switch value, if the value is controlled',
        },
        {
          propType: 'value',
          type: 'string',
          defaultValue: '',
        },
        {
          propType: 'onChange',
          type: 'func',
          defaultValue: null,
          note: (
            <div>
              This function is called when value is changed <br />
              <pre>const onChange = (nextState) => ...)</pre>
            </div>
          ),
        },
        {
          propType: 'className',
          type: 'string',
          defaultValue: null,
        },
        {
          propType: 'dts',
          type: 'string',
          defaultValue: 'switch-component',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SwitchExample />
  </Example>
);
