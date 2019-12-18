import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import { ActionPanel, AlertInput, Button, Checkbox, FlexibleSpacer } from '../../src';
import { popoverPlacements } from '../../src/components/Popover/constants';

/**
 * @param {string} value
 * @return {{status: string}|{message: string, status: string}}
 */
const validateValue = value => {
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
};

class AlertInputExample extends React.Component {
  state = {
    hasPrefix: false,
    hasSuffix: true,
    isDisabled: false,
    impressions: null,
    status: null,
    message: null,
    showModal: false,
  };

  toggleShowModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }));

  renderAlertInputExample = () => (
    <React.Fragment>
      <div className="adslot-ui-example__options">
        <Checkbox
          inline
          name="prefix"
          checked={this.state.hasPrefix}
          label="Show Prefix"
          onChange={this.togglePrefix}
        />
        <Checkbox
          inline
          name="suffix"
          checked={this.state.hasSuffix}
          label="Show Suffix"
          onChange={this.toggleSuffix}
        />
        <Checkbox
          inline
          name="disabled"
          checked={this.state.isDisabled}
          label="Disable"
          onChange={this.toggleDisabled}
        />
      </div>
      <AlertInput
        value={this.state.impressions || ''}
        disabled={this.state.isDisabled}
        prefixAddon={this.state.hasPrefix ? 'Max' : null}
        suffixAddon={this.state.hasSuffix ? 'impressions' : null}
        alertStatus={this.state.status}
        alertMessage={this.state.message}
        onValueChange={event => this.changeValue(event.target.value)}
      />
    </React.Fragment>
  );

  changeValue = value => {
    if (value === this.state.impressions) return;

    const validationResponse = validateValue(value);
    const validationState = {
      status: null,
      message: null,
    };
    if (validationResponse.status !== 'success') {
      _.assign(validationState, validationResponse);
    }

    this.setState(_.assign({ impressions: value }, validationState));
  };

  togglePrefix = nextState => this.setState({ hasPrefix: nextState });

  toggleSuffix = nextState => this.setState({ hasSuffix: nextState });

  toggleDisabled = nextState => this.setState({ isDisabled: nextState });

  render() {
    return (
      <React.Fragment>
        {this.renderAlertInputExample()}

        <FlexibleSpacer />

        <div className="adslot-ui-example__options">
          <Button onClick={this.toggleShowModal}>AlertInput in Modal</Button>
        </div>

        {this.state.showModal && (
          <ActionPanel isModal size="small" onClose={this.toggleShowModal} title="AlertInput in Modal">
            {this.renderAlertInputExample()}
          </ActionPanel>
        )}
      </React.Fragment>
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
          propType: '...inputProps',
          type: 'any',
          note: 'Any valid react input props, e.g. <AlertInput autofocus disabled type="text" defaultValue="xxx" />',
        },
        {
          propType: 'className',
          type: 'string',
        },
        {
          propType: 'dts',
          type: 'string',
        },
        {
          propType: 'disabled',
          type: 'bool',
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
          propType: 'popoverPlacement',
          type: `oneOf: ${popoverPlacements.map(placement => `'${placement}'`).join(', ')}`,
          defaultValue: 'bottom',
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
