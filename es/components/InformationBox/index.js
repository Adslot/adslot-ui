import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
var styles = ['primary', 'success', 'warning', 'error', 'light'];

var InformationBox = function InformationBox(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      title = _ref.title,
      className = _ref.className,
      theme = _ref.theme,
      dts = _ref.dts;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('aui--information-box', "aui--information-box-".concat(theme), className),
    "data-test-selector": dts
  }, icon ? /*#__PURE__*/React.createElement("div", {
    className: "aui--information-box-icon"
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    className: "aui--information-box-text"
  }, title ? /*#__PURE__*/React.createElement("label", {
    className: "aui--information-box-title"
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: "aui--information-box-node"
  }, children)));
};

InformationBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * oneOf: 'primary', 'success', 'warning', 'error', 'light'
   */
  theme: PropTypes.oneOf(styles),
  title: PropTypes.node,
  icon: PropTypes.node,
  dts: PropTypes.string
};
InformationBox.defaultProps = {
  theme: 'light'
};
export default InformationBox;