"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _moment = _interopRequireDefault(require("moment"));

var _transformFormat = require("./transformFormat");

var _excluded = ["selected", "onChange", "startDate", "endDate", "minDate", "maxDate", "dateFormat", "disableMomentFormat"],
    _excluded2 = ["disableInlineEditing", "dts"];

var momentToDate = function momentToDate(date) {
  return !date || date instanceof Date ? date : date.toDate();
};

var withMoment = function withMoment(DatePickerComponent) {
  return /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
    var selected = _ref.selected,
        onChange = _ref.onChange,
        startDate = _ref.startDate,
        endDate = _ref.endDate,
        minDate = _ref.minDate,
        maxDate = _ref.maxDate,
        dateFormat = _ref.dateFormat,
        disableMomentFormat = _ref.disableMomentFormat,
        props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var isDate = selected instanceof Date;

    var handleChange = _react.default.useCallback(function (newDate) {
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
      dateFormat: disableMomentFormat ? dateFormat : (0, _transformFormat.transform)(dateFormat),
      onChange: handleChange
    }));
  });
};

var DatePicker = withMoment(function (_ref2) {
  var disableInlineEditing = _ref2.disableInlineEditing,
      dts = _ref2.dts,
      rest = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var datePickerProps = disableInlineEditing ? {
    onChangeRaw: function onChangeRaw(event) {
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