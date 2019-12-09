import React from 'react';
import Example from '../components/Example';
import { DatePicker } from '../../src';
import moment from 'moment';

class DatePickerExample extends React.PureComponent {
  constructor() {
    super();
    this.state = { startDate: moment() };
    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  setSelectedDate(newValue) {
    this.setState({ startDate: newValue });
  }

  render() {
    return (
      <div>
        <h3>DatePicker</h3>
        <DatePicker
          className="form-control"
          dateFormat="DD MMM YYYY"
          selected={this.state.startDate}
          onChange={this.setSelectedDate}
          placeholderText="Select Date"
        />
        <h3>DatePicker with inline editing disabled</h3>
        <DatePicker
          className="form-control"
          dateFormat="DD MMM YYYY"
          selected={this.state.startDate}
          onChange={this.setSelectedDate}
          placeholderText="Select Date"
          disableInlineEditing="true"
          isClearable="true"
        />
      </div>
    );
  }
}

const exampleProps = {
  componentName: 'DatePicker',
  notes: (
    <div>
      <p>
        See <a href="https://github.com/Hacker0x01/react-datepicker">React DatePicker Documentation</a>.
      </p>
      <p>
        For a Date Range Picker, use two Date Pickers with <code>minDate</code> and <code>maxDate</code> props for
        validation.
      </p>
    </div>
  ),
  exampleCodeSnippet: `
    <DatePicker
    className="form-control"
    dateFormat="DD MMM YYYY"
    selected={this.state.startDate}
    onChange={this.setSelectedDate}
    placeholderText="Date e.g. 03 Sep 2016"
    />`,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: 'disableInlineEditing',
          type: 'bool',
          note: 'A flag to determine whether date picker inline editing is available or not.',
          defaultValue: 'false',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <DatePickerExample />
  </Example>
);
