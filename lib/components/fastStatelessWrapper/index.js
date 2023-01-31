"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireDefault(require("react"));
/**
 * fastStatelessWrapper - Limit re-render of a component to changeable props.
 *                        Use when you have a performance problem, do not prematurely optimise.
 *
 * @deprecated see React.memo
 * @param  {Node}  ComposedComponent The React component to render.
 * @param  {Array} propsToCheck     An Array of properties causing re-render eg. `['foo.bar', 'baz']`.
 * @return {Node}  A Component that wraps the provided React Component.
 */

const fastStatelessWrapper = (ComposedComponent, propsToCheck) => class FastStatelessWrapperComponent extends _react.default.Component {
  shouldComponentUpdate(nextProps) {
    const isEqualProps = toGet => {
      const getFromProps = props => _lodash.default.get(props, toGet);
      return getFromProps(nextProps) === getFromProps(this.props);
    };
    return !_lodash.default.every(propsToCheck, isEqualProps);
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, this.props);
  }
};
var _default = fastStatelessWrapper;
exports.default = _default;