import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { transform } from './transformFormat';
const momentToDate = date => !date || date instanceof Date ? date : date.toDate();
const withMoment = DatePickerComponent => /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    selected,
    onChange,
    startDate,
    endDate,
    minDate,
    maxDate,
    dateFormat,
    disableMomentFormat,
    ...props
  } = _ref;
  const _dateFormat = React.useMemo(() => disableMomentFormat ? dateFormat : transform(dateFormat), [dateFormat, disableMomentFormat]);
  const isDate = selected instanceof Date;
  const handleChange = React.useCallback(newDate => {
    onChange?.(isDate || !newDate ? newDate : moment(newDate));
  }, [isDate, onChange]);
  return /*#__PURE__*/React.createElement(DatePickerComponent, Object.assign({
    ref: ref
  }, props, {
    selected: momentToDate(selected),
    startDate: momentToDate(startDate),
    endDate: momentToDate(endDate),
    minDate: momentToDate(minDate),
    maxDate: momentToDate(maxDate),
    dateFormat: _dateFormat,
    onChange: handleChange
  }));
});
const DatePicker = withMoment(_ref2 => {
  let {
    disableInlineEditing,
    dts,
    ...rest
  } = _ref2;
  const datePickerProps = disableInlineEditing ? {
    onChangeRaw: event => {
      event.preventDefault();
    }
  } : {};
  return /*#__PURE__*/React.createElement("div", {
    className: "aui--date-picker",
    "data-test-selector": dts
  }, /*#__PURE__*/React.createElement(ReactDatePicker, Object.assign({}, rest, datePickerProps)));
});
DatePicker.propTypes = {
  disableInlineEditing: PropTypes.bool,
  dts: PropTypes.string,
  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat: PropTypes.bool
};
DatePicker.defaultProps = {
  disableInlineEditing: false,
  disableMomentFormat: false
};
export default DatePicker;