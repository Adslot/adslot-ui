import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from './Node';

var Breadcrumb = function Breadcrumb(_ref) {
  var rootNode = _ref.rootNode,
      divider = _ref.divider,
      nodes = _ref.nodes,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  var baseClass = 'aui--breadcrumb';
  var className = classnames(baseClass, _defineProperty({}, "".concat(baseClass, "--disabled"), disabled));

  var onClickFunc = function onClickFunc(newActiveId) {
    return !disabled && onClick(newActiveId);
  };

  if (nodes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: className
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(BreadcrumbNode, {
    isLast: false,
    node: rootNode,
    onClick: onClickFunc
  }), _.map(nodes, function (node, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: node.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(baseClass, "-node-divider")
    }, divider), /*#__PURE__*/React.createElement(BreadcrumbNode, {
      isLast: index === nodes.length - 1,
      node: node,
      onClick: onClickFunc
    }));
  }));
};

Breadcrumb.propTypes = {
  rootNode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }),
  divider: PropTypes.node,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
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
export default Breadcrumb;