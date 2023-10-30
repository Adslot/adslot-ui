import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from './Node';
const Breadcrumb = ({
  rootNode,
  className,
  divider,
  nodes,
  onClick,
  disabled
}) => {
  const baseClass = 'aui--breadcrumb';
  const classNames = classnames(baseClass, {
    [`${baseClass}--disabled`]: disabled
  }, className);
  const onClickFunc = newActiveId => !disabled && onClick(newActiveId);
  if (nodes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: classNames
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired
  }),
  divider: PropTypes.node,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired
  })),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
Breadcrumb.defaultProps = {
  rootNode: {
    id: 'all',
    label: 'All'
  },
  divider: '>',
  nodes: [],
  disabled: false
};
export default Breadcrumb;