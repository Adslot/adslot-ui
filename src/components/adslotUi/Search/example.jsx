import React, { Component } from 'react';
import Search from './';

export default class SearchExample extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  onClear() {
    this.setState({ value: '' });
  }

  render() {
    const props = {
      placeholder: 'Cities',
      onChange: this.onChange,
      onClear: this.onClear,
      value: this.state.value,
    };

    return (
      <div>
        <h2>Search</h2>
        <div className="row">
          <div className="col-xs-12">
            <Search {...props} />
          </div>
        </div>
      </div>
    );
  }
}
