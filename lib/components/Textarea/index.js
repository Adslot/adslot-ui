"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

class Textarea extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    const valueString = _lodash.default.toString(this.props.value);

    const charCountRemaining = this.props.maxLength - valueString.length;
    this.state = {
      charCountRemaining
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      charCountRemaining: this.props.maxLength - event.target.value.length
    });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const {
      maxLength,
      statusClass
    } = this.props;

    const restProps = _lodash.default.omit(this.props, ['statusClass']);

    const classNames = (0, _classnames.default)('form-control', restProps.className);
    return _lodash.default.isNil(maxLength) ? /*#__PURE__*/_react.default.createElement("textarea", Object.assign({}, restProps, {
      className: classNames
    })) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("textarea", Object.assign({}, restProps, {
      className: classNames,
      onChange: this.handleChange
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: statusClass
    }, this.state.charCountRemaining, " characters remaining"));
  }

}

Textarea.propTypes = {
  maxLength: _propTypes.default.number,
  statusClass: _propTypes.default.string,
  onChange: _propTypes.default.func,
  value: _propTypes.default.string
};
Textarea.defaultProps = {
  statusClass: ''
};
var _default = Textarea;
exports.default = _default;