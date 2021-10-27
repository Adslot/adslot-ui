import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import './styles.scss';

const DatePicker = ({ disableInlineEditing, dts, ...rest }) => {
  const handleDateChangeRaw = (event) => {
    event.preventDefault();
  };

  const datePickerProps = disableInlineEditing ? { onChangeRaw: handleDateChangeRaw } : {};

  return (
    <div data-testid="date-picker-wrapper" className="aui--date-picker" data-test-selector={dts}>
      <ReactDatePicker {...rest} {...datePickerProps} />
    </div>
  );
};

DatePicker.propTypes = {
  disableInlineEditing: PropTypes.bool,
  dts: PropTypes.string,
};

DatePicker.defaultProps = {
  disableInlineEditing: false,
};

export default DatePicker;
