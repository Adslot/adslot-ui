"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Node = _interopRequireDefault(require("./Node"));

var Breadcrumb = function Breadcrumb(_ref) {
  var rootNode = _ref.rootNode,
      divider = _ref.divider,
      nodes = _ref.nodes,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  var baseClass = 'aui--breadcrumb';
  var className = (0, _classnames2.default)(baseClass, (0, _defineProperty2.default)({}, "".concat(baseClass, "--disabled"), disabled));

  var onClickFunc = function onClickFunc(newActiveId) {
    return !disabled && onClick(newActiveId);
  };

  if (nodes.length === 0) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: className
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_Node.default, {
    isLast: false,
    node: rootNode,
    onClick: onClickFunc
  }), _lodash.default.map(nodes, function (node, index) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: node.id
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(baseClass, "-node-divider")
    }, divider), /*#__PURE__*/_react.default.createElement(_Node.default, {
      isLast: index === nodes.length - 1,
      node: node,
      onClick: onClickFunc
    }));
  }));
};

Breadcrumb.propTypes = {
  rootNode: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  }),
  divider: _propTypes.default.node,
  nodes: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  })),
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool
};
Breadcrumb.defaultProps = {
  rootNode: {
    id: 'all',
    label: 'All'
  },
  divider: '>',
  nodes: [],
  onClick: function onClick(newActiveId) {
    throw new Error("Breadcrumb needs an onClick handler to take ".concat(newActiveId));
  },
  disabled: false
};
var _default = Breadcrumb;
exports.default = _default;