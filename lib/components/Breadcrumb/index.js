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
var _Node = _interopRequireDefault(require("./Node"));
const Breadcrumb = ({
  rootNode = {
    id: 'all',
    label: 'All'
  },
  className,
  divider = '>',
  nodes = [],
  onClick,
  disabled = false
}) => {
  const baseClass = 'aui--breadcrumb';
  const classNames = (0, _classnames.default)(baseClass, {
    [`${baseClass}--disabled`]: disabled
  }, className);
  const onClickFunc = newActiveId => !disabled && onClick(newActiveId);
  if (nodes.length === 0) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classNames
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classNames
  }, /*#__PURE__*/_react.default.createElement(_Node.default, {
    isLast: false,
    node: rootNode,
    onClick: onClickFunc
  }), _lodash.default.map(nodes, (node, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: node.id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${baseClass}-node-divider`
  }, divider), /*#__PURE__*/_react.default.createElement(_Node.default, {
    isLast: index === nodes.length - 1,
    node: node,
    onClick: onClickFunc
  }))));
};
Breadcrumb.propTypes = {
  rootNode: _propTypes.default.shape({
    id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
    label: _propTypes.default.string.isRequired
  }),
  divider: _propTypes.default.node,
  nodes: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
    label: _propTypes.default.string.isRequired
  })),
  onClick: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string
};
var _default = exports.default = Breadcrumb;