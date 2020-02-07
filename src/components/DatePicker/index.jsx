import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import './styles.scss';

const adslotDatePickerPropTypes = {
  disableInlineEditing: PropTypes.bool,
};

class DatePicker extends React.PureComponent {
  handleDateChangeRaw = event => {
    event.preventDefault();
  };

  render() {
    const { disableInlineEditing } = this.props;

    const datePickerProps = disableInlineEditing ? { onChangeRaw: this.handleDateChangeRaw } : {};

    return (
      <div className="aui--date-picker" data-test-selector={this.props.dts}>
        <ReactDatePicker {..._.omit(this.props, _.keys(adslotDatePickerPropTypes))} {...datePickerProps} />
      </div>
    );
  }
}

DatePicker.propTypes = { ...adslotDatePickerPropTypes };

DatePicker.defaultProps = {
  disableInlineEditing: false,
};

export default DatePicker;
