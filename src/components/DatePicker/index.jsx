import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import cc from 'classnames';
import moment from 'moment';
import { transform } from './transformFormat';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const momentToDate = (date) => (!date || date instanceof Date ? date : date.toDate());

const DatePicker = ({
  disableInlineEditing = false,
  disableMomentFormat = false,
  dateFormat,
  dts,
  onChange,
  selected,
  startDate,
  endDate,
  minDate,
  maxDate,
  className,
  ...rest
}) => {
  const datePickerProps = disableInlineEditing
    ? {
        onChangeRaw: (event) => {
          event.preventDefault();
        },
      }
    : {};

  const _dateFormat = React.useMemo(
    () => (disableMomentFormat ? dateFormat : transform(dateFormat)),
    [dateFormat, disableMomentFormat]
  );

  const isDate = selected instanceof Date;
  const handleChange = React.useCallback(
    (newDate) => {
      onChange?.(isDate || !newDate ? newDate : moment(newDate));
    },
    [isDate, onChange]
  );

  return (
    <div data-testid="date-picker-wrapper" className="aui--date-picker" data-test-selector={dts}>
      <ReactDatePicker
        {...rest}
        {...datePickerProps}
        className={cc('aui-input', className)}
        dateFormat={_dateFormat}
        onChange={handleChange}
        selected={momentToDate(selected)}
        startDate={momentToDate(startDate)}
        endDate={momentToDate(endDate)}
        minDate={momentToDate(minDate)}
        maxDate={momentToDate(maxDate)}
      />
    </div>
  );
};

DatePicker.propTypes = {
  disableInlineEditing: PropTypes.bool,
  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat: PropTypes.bool,
  dateFormat: PropTypes.string,
  dts: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  className: PropTypes.string,
};

export default DatePicker;
