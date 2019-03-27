import React from 'react';
import moment from 'moment';
import Example from '../components/Example';
import { DatePicker } from 'adslot-ui';

class DatePickerExample extends React.Component {
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
      <DatePicker
        className="form-control"
        dateFormat="DD MMM YYYY"
        selected={this.state.startDate}
        onChange={this.setSelectedDate}
        placeholderText="Date e.g. 03 Sep 2016"
      />
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
  propTypeSectionArray: [],
};

export default () => (
  <Example {...exampleProps}>
    <DatePickerExample />
  </Example>
);
