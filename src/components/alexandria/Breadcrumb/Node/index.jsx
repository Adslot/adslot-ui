import React, { PropTypes } from 'react';
import './styles.scss';

const BreadcrumbNode = ({ isLast, node, onClick }) => {
  const baseClass = 'breadcrumbnode-component';
  if (isLast) {
    return (
      <span className={baseClass}>
        {node.label}
      </span>);
  }

  const onClickNode = () => onClick(node.id);
  return (
    <span className={`${baseClass} ${baseClass}-link`} onClick={onClickNode}>
      {node.label}
    </span>);
};

BreadcrumbNode.displayName = 'AlexandriaBreadcrumbNodeComponent';

BreadcrumbNode.propTypes = {
  isLast: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default BreadcrumbNode;
