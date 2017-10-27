import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import {
  AlertInput,
} from '../../src/dist-entry';

const initialState = {
  impressions: null,
  status: null,
  message: null,
};


class AlertInputExample extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    if(typeof(this.state.impressions) != "string")
      this.state.impressions = "";
    this.changeValue = this.changeValue.bind(this);
  }

  validateValue(value) {
    switch (true) {
      case _.isEmpty(value):
        return { status: 'success' };

      case !_.isNumber(+value) || _.isNaN(+value):
        return { status: 'error', message: 'Impressions should be a number.' };

      case value < 1000:
        return { status: 'warning', message: 'A minimum value of 1000 impressions is expected.' };

      default:
        return { status: 'success' };
    }
  }

  changeValue(value) {
    if (value === this.state.impressions) return;

    const validationResponse = this.validateValue(value);
    const validationState = {
      status: null,
      message: null,
    };
    if (validationResponse.status !== 'success') {
      _.assign(validationState, validationResponse);
    }

    this.setState(_.assign({ impressions: value }, validationState));
  }

  render() {
    return (
      <AlertInput
        value={this.state.impressions}
        suffixAddon="impressions"
        alertStatus={this.state.status}
        alertMessage={this.state.message}
        onValueChange={(event) => this.changeValue(event.target.value)}
      />
    );
  }
}


const exampleProps = {
  componentName: 'Alert Input',
  exampleCodeSnippet: `
    <AlertInput
      value={this.state.impressions}
      suffixAddon="impressions"
      alertStatus={this.state.status}
      alertMessage={this.state.message}
      onValueChange={(event) => this.changeValue(event.target.value)}
    />
  `,
  propTypes: [
    {
      propType: 'defaultValue',
      type: 'string',
      defaultValue: 'text',
    }, {
      propType: 'value',
      type: "string|number",
    }, {
      propType: 'min',
      type: 'number',
    }, {
      propType: 'placeholder',
      type: 'string',
    }, {
      propType: 'prefixAddon',
      type: 'node',
    }, {
      propType: 'suffixAddon',
      type: 'node',
    }, {
      propType: 'alertMessage',
      type: 'string',
    }, {
      propType: 'onValueChange',
      type: 'func',
    }, {
      propType: 'onBlur',
      type: 'func',
    }, {
      propType: 'onFocus',
      type: 'func',
    }, {
      propType: 'type',
      type: "oneOf: 'text', 'number'",
    }, {
      propType: 'alertStatus',
      type: "oneOf: 'success', 'info', 'warning', 'error'",
    },
  ],
};


export default () => <Example {...exampleProps}><AlertInputExample /></Example>;
