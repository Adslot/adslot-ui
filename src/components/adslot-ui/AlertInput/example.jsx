import React, { Component } from 'react';
import AlertInput from '.';

export default class AlertInputExample extends Component {
  constructor() {
    super();
    this.state = {
      default: 'Initial value',
      success: '123.45',
      info: '120,000,000',
      warning: '123.45',
      error: 'patrick.ivers@adslot.com',
    };
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    const style = { marginBottom: '10px' };

    return (
      <div>
        <div style={style}>
          <AlertInput
            value={this.state.default}
            onValueChange={(event) => this.changeValue('default', event.target.value)}
          />
        </div>
        <div style={style}>
          <AlertInput
            value={this.state.success}
            alertStatus="success"
            alertMessage="This is a success message"
            onValueChange={(event) => this.changeValue('success', event.target.value)}
          />
        </div>
        <div style={style}>
          <AlertInput
            value={this.state.info}
            suffixAddon="impressions"
            alertStatus="info"
            alertMessage="This is an info message"
            onValueChange={(event) => this.changeValue('info', event.target.value)}
          />
        </div>
        <div style={style}>
          <AlertInput
            value={this.state.warning}
            prefixAddon="$"
            suffixAddon="CPM"
            alertStatus="warning"
            alertMessage="This is a warning message"
            onValueChange={(event) => this.changeValue('warning', event.target.value)}
          />
        </div>
        <div style={style}>
          <AlertInput
            value={this.state.error}
            prefixAddon="@"
            alertStatus="error"
            alertMessage="This is an error message"
            onValueChange={(event) => this.changeValue('error', event.target.value)}
          />
        </div>
      </div>
    );
  }
}
