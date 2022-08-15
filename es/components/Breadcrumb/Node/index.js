import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const BreadcrumbNode = _ref => {
  let {
    isLast,
    node,
    onClick
  } = _ref;
  const className = classnames('aui--breadcrumb-node', {
    'aui--breadcrumb-node-link': !isLast
  });

  const onClickNode = () => {
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