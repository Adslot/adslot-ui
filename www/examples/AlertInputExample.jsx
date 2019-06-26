import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import { AlertInput } from '../../src';

const initialState = {
  impressions: null,
  status: null,
  message: null,
};

class AlertInputExample extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    if (typeof this.state.impressions != 'string') this.state.impressions = '';
    this.changeValue = this.changeValue.bind(this);
  }

  validateValue(value) {
    switch (true) {
      case _.isEmpty(value):
        return { status: 'success' };

      case !_.isNumber(+value) || _.isNaN(+value):
        return { status: 'error', message: 'Impressions should be a number.' };

      case value < 1000:
        return {
          status: 'warning',
          message: 'A minimum value of 1000 impressions is expected.',
        };

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
        onValueChange={event => this.changeValue(event.target.value)}
      />
    );
  }
}

const exampleProps = {
  componentName: 'Alert Input',
  designNotes: (
    <p>
      <code className="text-bold">Alert input</code> provide direct feedback by{' '}
      <code className="text-orange text-bold">‘Warning’</code> the user but not blocking them.{' '}
      <code className="text-red text-bold">‘Required’</code> informing the users there is required information or they
      have entered incorrect information.
    </p>
  ),
  exampleCodeSnippet: `
    <AlertInput
      value={this.state.impressions}
      suffixAddon="impressions"
      alertStatus={this.state.status}
      alertMessage={this.state.message}
      onValueChange={(event) => this.changeValue(event.target.value)}
    />
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'defaultValue',
          type: 'string',
        },
        {
          propType: 'value',
          type: 'string|number',
        },
        {
          propType: 'type',
          type: "oneOf: 'text', 'number'",
          defaultValue: 'text',
        },
        {
          propType: 'min',
          type: 'number',
        },
        {
          propType: 'placeholder',
          type: 'string',
        },
        {
          propType: 'prefixAddon',
          type: 'node',
        },
        {
          propType: 'suffixAddon',
          type: 'node',
        },
        {
          propType: 'alertStatus',
          type: "oneOf: 'success', 'info', 'warning', 'error'",
          defaultValue: 'success',
          note: (
            <span>
              As <code>success</code> is assumed, and help is always displayed independently, the accepted pattern is to
              only use <code>warning</code> and <code>error</code> feedback states with this component. Otherwise leave
              type undefined for <code>success</code>.
            </span>
          ),
        },
        {
          propType: 'alertMessage',
          type: 'string',
        },
        {
          propType: 'onValueChange',
          type: 'func',
        },
        {
          propType: 'onBlur',
          type: 'func',
        },
        {
          propType: 'onFocus',
          type: 'func',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <AlertInputExample />
  </Example>
);
