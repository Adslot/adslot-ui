import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BreadcrumbNode = ({ isLast, node, onClick }) => {
  const baseClass = 'breadcrumbnode-component';
  if (isLast) {
    return (
      <span data-testid="breadcrumb-node-wrapper" className={baseClass}>
        {node.label}
      </span>
    );
  }

  const onClickNode = () => onClick(node.id);
  return (
    <span data-testid="breadcrumb-node-wrapper" className={`${baseClass} ${baseClass}-link`} onClick={onClickNode}>
      {node.label}
    </span>
  );
};

BreadcrumbNode.displayName = 'BreadcrumbNodeComponent';

BreadcrumbNode.propTypes = {
  isLast: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default BreadcrumbNode;
