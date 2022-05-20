import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { expandDts } from '../../lib/utils';

var ButtonGroup = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ButtonGroup, _React$PureComponent);

  var _super = _createSuper(ButtonGroup);

  function ButtonGroup() {
    _classCallCheck(this, ButtonGroup);

    return _super.apply(this, arguments);
  }

  _createClass(ButtonGroup, [{
    key: "injectProps",
    value: function injectProps(children) {
      var _this = this;

      return React.Children.map(children, function (child) {
        if ( /*#__PURE__*/React.isValidElement(child)) {
          var buttonProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _this.props.color ? {
            color: _this.props.color
          } : {}), !_.isNil(_this.props.variant) ? {
            variant: _this.props.variant
          } : {}), !_.isNil(_this.props.disabled) ? {
            disabled: _this.props.disabled
          } : {}), _this.props.size ? {
            size: _this.props.size
          } : {});

          var childNodes = React.Children.map(child.props.children, function (childNode) {
            return /*#__PURE__*/React.isValidElement(childNode) ? /*#__PURE__*/React.cloneElement(childNode, _objectSpread(_objectSpread({}, childNode.props), childNode.type.name === Button.name ? buttonProps : {})) : childNode;
          });
          return /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread(_objectSpread({}, child.props), child.type.name === Button.name ? buttonProps : {}), !_.isEmpty(childNodes) ? {
            children: childNodes.length === 1 ? childNodes[0] : childNodes
          } : {}));
        }

        return child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          dts = _this$props.dts;
      var content = this.injectProps(children);
      return /*#__PURE__*/React.createElement("div", Object.assign({}, expandDts(dts), {
        className: "aui--button-group"
      }), content);
    }
  }]);

  return ButtonGroup;
}(React.PureComponent);

ButtonGroup.propTypes = {
  dts: PropTypes.string,
  children: PropTypes.node,

  /**
   * primary, success, danger
   */
  color: PropTypes.oneOf(['primary', 'success', 'danger']),
  variant: PropTypes.oneOf(['inverse', 'borderless', 'solid']),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['large'])
};
export default ButtonGroup;