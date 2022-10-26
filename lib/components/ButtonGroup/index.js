"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

var _utils = require("../../lib/utils");

class ButtonGroup extends _react.default.PureComponent {
  injectProps(children) {
    return _react.default.Children.map(children, child => {
      if ( /*#__PURE__*/_react.default.isValidElement(child)) {
        const buttonProps = { ...(this.props.color ? {
            color: this.props.color
          } : {}),
          ...(!_lodash.default.isNil(this.props.variant) ? {
            variant: this.props.variant
          } : {}),
          ...(!_lodash.default.isNil(this.props.disabled) ? {
            disabled: this.props.disabled
          } : {}),
          ...(this.props.size ? {
            size: this.props.size
          } : {})
        };

        const childNodes = _react.default.Children.map(child.props.children, childNode => /*#__PURE__*/_react.default.isValidElement(childNode) ? /*#__PURE__*/_react.default.cloneElement(childNode, { ...childNode.props,
          ...(childNode.type.name === _Button.default.name ? buttonProps : {})
        }) : childNode);

        return /*#__PURE__*/_react.default.cloneElement(child, { ...child.props,
          ...(child.type.name === _Button.default.name ? buttonProps : {}),
          ...(!_lodash.default.isEmpty(childNodes) ? {
            children: childNodes.length === 1 ? childNodes[0] : childNodes
          } : {})
        });
      }

      return child;
    });
  }

  render() {
    const {
      children,
      dts
    } = this.props;
    const content = this.injectProps(children);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, (0, _utils.expandDts)(dts), {
      className: "aui--button-group"
    }), content);
  }

}

ButtonGroup.propTypes = {
  dts: _propTypes.default.string,
  children: _propTypes.default.node,

  /**
   * primary, success, danger
   */
  color: _propTypes.default.oneOf(['primary', 'success', 'danger']),
  variant: _propTypes.default.oneOf(['inverse', 'borderless', 'solid']),
  disabled: _propTypes.default.bool,
  size: _propTypes.default.oneOf(['large'])
};
var _default = ButtonGroup;
exports.default = _default;