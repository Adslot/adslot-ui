import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

var BreadcrumbNode = function BreadcrumbNode(_ref) {
  var isLast = _ref.isLast,
      node = _ref.node,
      onClick = _ref.onClick;
  var className = classnames('aui--breadcrumb-node', {
    'aui--breadcrumb-node-link': !isLast
  });

  var onClickNode = function onClickNode() {
    if (!isLast) onClick(node.id);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: onClickNode
  }, node.label);
};

BreadcrumbNode.propTypes = {
  isLast: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired
};
export default BreadcrumbNode;