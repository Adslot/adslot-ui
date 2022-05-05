import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["selected", "onChange", "startDate", "endDate", "minDate", "maxDate", "dateFormat", "disableMomentFormat"],
    _excluded2 = ["disableInlineEditing", "dts"];
import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { transform } from './transformFormat';

var momentToDate = function momentToDate(date) {
  return !date || date instanceof Date ? date : date.toDate();
};

var withMoment = function withMoment(DatePickerComponent) {
  return /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var selected = _ref.selected,
        onChange = _ref.onChange,
        startDate = _ref.startDate,
        endDate = _ref.endDate,
        minDate = _ref.minDate,
        maxDate = _ref.maxDate,
        dateFormat = _ref.dateFormat,
        disableMomentFormat = _ref.disableMomentFormat,
        props = _objectWithoutProperties(_ref, _excluded);

    var isDate = selected instanceof Date;
    var handleChange = React.useCallback(function (newDate) {
      onChange === null || onChange === void 0 ? void 0 : onChange(isDate || !newDate ? newDate : moment(newDate));
    }, [isDate, onChange]);
    return /*#__PURE__*/React.createElement(DatePickerComponent, Object.assign({
      ref: ref
    }, props, {
      selected: momentToDate(selected),
      startDate: momentToDate(startDate),
      endDate: momentToDate(endDate),
      minDate: momentToDate(minDate),
      maxDate: momentToDate(maxDate),
      dateFormat: disableMomentFormat ? dateFormat : transform(dateFormat),
      onChange: handleChange
    }));
  });
};

var DatePicker = withMoment(function (_ref2) {
  var disableInlineEditing = _ref2.disableInlineEditing,
      dts = _ref2.dts,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  var datePickerProps = disableInlineEditing ? {
    onChangeRaw: function onChangeRaw(event) {
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