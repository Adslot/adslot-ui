import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import React from 'react';
/**
 * fastStatelessWrapper - Limit re-render of a component to changeable props.
 *                        Use when you have a performance problem, do not prematurely optimise.
 *
 * @deprecated see React.memo
 * @param  {Node}  ComposedComponent The React component to render.
 * @param  {Array} propsToCheck     An Array of properties causing re-render eg. `['foo.bar', 'baz']`.
 * @return {Node}  A Component that wraps the provided React Component.
 */

var fastStatelessWrapper = function fastStatelessWrapper(ComposedComponent, propsToCheck) {
  return /*#__PURE__*/function (_React$Component) {
    _inherits(FastStatelessWrapperComponent, _React$Component);

    var _super = _createSuper(FastStatelessWrapperComponent);

    function FastStatelessWrapperComponent() {
      _classCallCheck(this, FastStatelessWrapperComponent);

      return _super.apply(this, arguments);
    }

    _createClass(FastStatelessWrapperComponent, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        var _this = this;

        var isEqualProps = function isEqualProps(toGet) {
          var getFromProps = function getFromProps(props) {
            return _.get(props, toGet);
          };

          return getFromProps(nextProps) === getFromProps(_this.props);
        };

        return !_.every(propsToCheck, isEqualProps);
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement(ComposedComponent, this.props);
      }
    }]);

    return FastStatelessWrapperComponent;
  }(React.Component);
};

export default fastStatelessWrapper;