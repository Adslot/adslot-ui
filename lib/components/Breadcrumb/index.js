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

const Breadcrumb = _ref => {
  let {
    rootNode,
    divider,
    nodes,
    onClick,
    disabled
  } = _ref;
  const baseClass = 'aui--breadcrumb';
  const className = (0, _classnames.default)(baseClass, {
    [`${baseClass}--disabled`]: disabled
  });

  const onClickFunc = newActiveId => !disabled && onClick(newActiveId);

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
  onClick: newActiveId => {
    throw new Error(`Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
  disabled: false
};
var _default = Breadcrumb;
exports.default = _default;