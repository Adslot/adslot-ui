import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/* eslint-disable react/prop-types */
// disable proptypes check because it doesn't take into consideration extended types
import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { expandDts } from '../../lib/utils';

var Button = function Button(props) {
  var _classNames;

  var theme = props.theme,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      dts = props.dts,
      href = props.href,
      inverse = props.inverse,
      isLoading = props.isLoading,
      size = props.size,
      target = props.target,
      type = props.type;
  var baseClass = 'aui--button';
  var classes = classNames(baseClass, (_classNames = {
    'btn-inverse': inverse,
    'btn-large': size === 'large'
  }, _defineProperty(_classNames, "btn-".concat(theme), !_.isEmpty(theme)), _defineProperty(_classNames, 'has-anchor', href), _classNames), className);

  var renderSpinner = function renderSpinner() {
    return isLoading ? /*#__PURE__*/React.createElement("div", {
      className: "spinner-container"
    }, /*#__PURE__*/React.createElement(Spinner, {
      size: size === 'large' ? 'medium' : 'small'
    })) : null;
  };

  var renderChildren = function renderChildren() {
    return href ? !disabled ? /*#__PURE__*/React.createElement("a", {
      className: "aui--button-anchor",
      href: href,
      target: target,
      rel: "noopener noreferrer"
    }, children) : /*#__PURE__*/React.createElement("div", {
      className: "aui--button-anchor"
    }, children) : children;
  };

  return /*#__PURE__*/React.createElement("button", Object.assign({
    disabled: isLoading || disabled,
    className: classes,
    type: type
  }, expandDts(dts), _.omit(props, _.keys(adslotButtonPropTypes))), renderSpinner(), /*#__PURE__*/React.createElement("div", {
    className: classNames('aui--button-children-container', {
      'is-loading': isLoading
    })
  }, renderChildren()));
};

var adslotButtonPropTypes = {
  /**
   * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
   */
  theme: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'link']),
  className: PropTypes.string,
  dts: PropTypes.string,
  href: PropTypes.string,

  /**
   * The target attribute specifies where to open the linked document when there is a defined 'href',
   * PropTypes.oneOf(['_blank', '_self', '_parent', '_top'])
   */
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  inverse: PropTypes.bool,
  isLoading: PropTypes.bool,

  /**
   * PropTypes.oneOf(['small', 'large'])
   */
  size: PropTypes.oneOf(['small', 'large']),

  /**
   * PropTypes.oneOf(['button', 'reset', 'submit'])
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};
Button.propTypes = _objectSpread({}, adslotButtonPropTypes);
Button.defaultProps = {
  inverse: false,
  isLoading: false,
  size: 'small',
  theme: 'default',
  target: '_self',
  type: 'button'
};
export default Button;