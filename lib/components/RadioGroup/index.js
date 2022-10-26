"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRadioGroup = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _hooks = require("../../hooks");

var _utils = require("../../lib/utils");

const itemClass = 'aui--radio';

const RadioGroupContext = /*#__PURE__*/_react.default.createContext({});

const RadioGroupProvider = _ref => {
  let {
    children,
    value,
    onChange,
    variant,
    name
  } = _ref;

  const context = _react.default.useMemo(() => ({
    value,
    onChange,
    variant,
    name
  }), [value, onChange, variant, name]);

  return /*#__PURE__*/_react.default.createElement(RadioGroupContext.Provider, {
    value: context
  }, children);
};

const useRadioGroup = () => _react.default.useContext(RadioGroupContext);

exports.useRadioGroup = useRadioGroup;

const RadioGroup = _ref2 => {
  let {
    name,
    value,
    onChange,
    orientation = 'vertical',
    className,
    dts,
    children,
    variant = 'default',
    inline,
    ...rest
  } = _ref2;
  (0, _utils.invariant)(!inline, 'RadioGroup: the inline prop has been replaced by orientation="vertical"');

  const ref = _react.default.useRef();

  (0, _hooks.useArrowFocus)({
    ref,
    onFocus: el => onChange(el.dataset.auiValue),
    selector: `.${itemClass}[role=radio]`,
    loop: true,
    orientation
  });
  return /*#__PURE__*/_react.default.createElement(RadioGroupProvider, {
    value: value,
    onChange: onChange,
    variant: variant,
    name: name
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    role: 'radiogroup',
    "aria-orientation": orientation,
    className: (0, _classnames.default)('aui--radio-group', className, {
      'is-vertical': orientation === 'vertical',
      'is-default': variant === 'default'
    })
  }, (0, _utils.expandDts)(dts), {
    ref: ref
  }), children));
};

RadioGroup.propTypes = {
  value: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  orientation: _propTypes.default.oneOf(['vertical', 'horizontal']),
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  variant: _propTypes.default.oneOf(['default', 'box']),
  id: _propTypes.default.string,

  /**
   *  @deprecated use orientation="horizontal" instead
   **/
  inline: _propTypes.default.bool
};
var _default = RadioGroup;
exports.default = _default;