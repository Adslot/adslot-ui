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

var _utils = require("../../lib/utils");

var RadioGroup = function RadioGroup(_ref) {
  var className = _ref.className,
      onChange = _ref.onChange,
      children = _ref.children,
      name = _ref.name,
      value = _ref.value,
      inline = _ref.inline,
      id = _ref.id,
      dts = _ref.dts;
  var classNames = (0, _classnames.default)(['radio-group-component', className]);

  var onChangeDefault = function onChangeDefault(event) {
    var newValue = event.currentTarget.value;
    onChange(newValue);
  };

  var renderChildren = function renderChildren() {
    return _react.default.Children.map(children, function (child) {
      var childProps = _lodash.default.assign({}, child.props, {
        name: name,
        checked: value === child.props.value,
        onChange: function onChange() {
          var _child$props;

          (_child$props = child.props).onChange.apply(_child$props, arguments);

          onChangeDefault.apply(void 0, arguments);
        },
        inline: inline
      });

      return /*#__PURE__*/_react.default.cloneElement(child, childProps);
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    id: id,
    className: classNames
  }, (0, _utils.expandDts)(dts)), renderChildren());
};

RadioGroup.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  onChange: _propTypes.default.func.isRequired,
  dts: _propTypes.default.string,
  inline: _propTypes.default.bool
};
var _default = RadioGroup;
exports.default = _default;