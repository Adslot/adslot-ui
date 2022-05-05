import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

var Textarea = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Textarea, _React$PureComponent);

  var _super = _createSuper(Textarea);

  function Textarea(props) {
    var _this;

    _classCallCheck(this, Textarea);

    _this = _super.call(this, props);

    var valueString = _.toString(_this.props.value);

    var charCountRemaining = _this.props.maxLength - valueString.length;
    _this.state = {
      charCountRemaining: charCountRemaining
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Textarea, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        charCountRemaining: this.props.maxLength - event.target.value.length
      });

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          maxLength = _this$props.maxLength,
          statusClass = _this$props.statusClass;

      var restProps = _.omit(this.props, ['statusClass']);

      var classNames = classnames('form-control', restProps.className);
      return _.isNil(maxLength) ? /*#__PURE__*/React.createElement("textarea", Object.assign({}, restProps, {
        className: classNames
      })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", Object.assign({}, restProps, {
        className: classNames,
        onChange: this.handleChange
      })), /*#__PURE__*/React.createElement("span", {
        className: statusClass
      }, this.state.charCountRemaining, " characters remaining"));
    }
  }]);

  return Textarea;
}(React.PureComponent);

Textarea.propTypes = {
  maxLength: PropTypes.number,
  statusClass: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};
Textarea.defaultProps = {
  statusClass: ''
};
export default Textarea;