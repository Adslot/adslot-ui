import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import './styles.scss';
import { transform } from './transformFormat';

const momentToDate = (date) => (!date || date instanceof Date ? date : date.toDate());

const withMoment = (DatePickerComponent) =>
  React.forwardRef(
    ({ selected, onChange, startDate, endDate, minDate, maxDate, dateFormat, disableMomentFormat, ...props }, ref) => {
      const isDate = selected instanceof Date;
      const handleChange = React.useCallback(
        (newDate) => {
          onChange?.(isDate || !newDate ? newDate : moment(newDate));
        },
        [isDate, onChange]
      );
      return (
        <DatePickerComponent
          ref={ref}
          {...props}
          selected={momentToDate(selected)}
          startDate={momentToDate(startDate)}
          endDate={momentToDate(endDate)}
          minDate={momentToDate(minDate)}
          maxDate={momentToDate(maxDate)}
          dateFormat={disableMomentFormat ? dateFormat : transform(dateFormat)}
          onChange={handleChange}
        />
      );
    }
  );

const DatePicker = withMoment(
  React.forwardRef(({ disableInlineEditing, dts, ...rest }, ref) => {
    const datePickerProps = disableInlineEditing
      ? {
          onChangeRaw: (event) => {
            event.preventDefault();
          },
        }
      : {};

    return (
      <div data-testid="date-picker-wrapper" className="aui--date-picker" data-test-selector={dts}>
        <ReactDatePicker {...rest} {...datePickerProps} />
      </div>
    );
  })
);

DatePicker.propTypes = {
  disableInlineEditing: PropTypes.bool,
  dts: PropTypes.string,
  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat: PropTypes.bool,
};

DatePicker.defaultProps = {
  disableInlineEditing: false,
  disableMomentFormat: false,
};

export default DatePicker;
