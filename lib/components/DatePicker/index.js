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

const withMoment = DatePickerComponent => /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
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

  const _dateFormat = _react.default.useMemo(() => disableMomentFormat ? dateFormat : (0, _transformFormat.transform)(dateFormat), [dateFormat, disableMomentFormat]);

  const isDate = selected instanceof Date;

  const handleChange = _react.default.useCallback(newDate => {
    onChange === null || onChange === void 0 ? void 0 : onChange(isDate || !newDate ? newDate : (0, _moment.default)(newDate));
  }, [isDate, onChange]);

  return /*#__PURE__*/_react.default.createElement(DatePickerComponent, Object.assign({
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--date-picker",
    "data-test-selector": dts
  }, /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, Object.assign({}, rest, datePickerProps)));
});
DatePicker.propTypes = {
  disableInlineEditing: _propTypes.default.bool,
  dts: _propTypes.default.string,

  /**
   * "dateFormat" prop is using momentjs format tokens.
   * set this prop to "true" to enable unicode tokens.
   * read more https://git.io/fxCyr
   */
  disableMomentFormat: _propTypes.default.bool
};
DatePicker.defaultProps = {
  disableInlineEditing: false,
  disableMomentFormat: false
};
var _default = DatePicker;
exports.default = _default;