import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from './Node';

const Breadcrumb = _ref => {
  let {
    rootNode,
    divider,
    nodes,
    onClick,
    disabled
  } = _ref;
  const baseClass = 'aui--breadcrumb';
  const className = classnames(baseClass, {
    [`${baseClass}--disabled`]: disabled
  });

  const onClickFunc = newActiveId => !disabled && onClick(newActiveId);

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
  }), _.map(nodes, (node, index) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: node.id
  }, /*#__PURE__*/React.createElement("div", {
    className: `${baseClass}-node-divider`
  }, divider), /*#__PURE__*/React.createElement(BreadcrumbNode, {
    isLast: index === nodes.length - 1,
    node: node,
    onClick: onClickFunc
  }))));
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
  onClick: newActiveId => {
    throw new Error(`Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
  disabled: false
};
export default Breadcrumb;