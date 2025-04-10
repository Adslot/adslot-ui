"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
var _moment = _interopRequireDefault(require("moment"));
var _transformFormat = require("./transformFormat");
const momentToDate = date => !date || date instanceof Date ? date : date.toDate();
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
  ...rest
}) => {
  const datePickerProps = disableInlineEditing ? {
    onChangeRaw: event => {
      event.preventDefault();
    }
  } : {};
  const _dateFormat = _react.default.useMemo(() => disableMomentFormat ? dateFormat : (0, _transformFormat.transform)(dateFormat), [dateFormat, disableMomentFormat]);
  const isDate = selected instanceof Date;
  const handleChange = _react.default.useCallback(newDate => {
    onChange?.(isDate || !newDate ? newDate : (0, _moment.default)(newDate));
  }, [isDate, onChange]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--date-picker",
    "data-test-selector": dts
  }, /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, Object.assign({}, rest, datePickerProps, {
    dateFormat: _dateFormat,
    onChange: handleChange,
    selected: momentToDate(selected),
    startDate: momentToDate(startDate),
    endDate: momentToDate(endDate),
    minDate: momentToDate(minDate),
    maxDate: momentToDate(maxDate)
  })));
};
DatePicker.propTypes = {
  disableInlineEditing: _propTypes.default.bool,
  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat: _propTypes.default.bool,
  dateFormat: _propTypes.default.string,
  dts: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  selected: _propTypes.default.object,
  startDate: _propTypes.default.object,
  endDate: _propTypes.default.object,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object
};
var _default = exports.default = DatePicker;