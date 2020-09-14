import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BreadcrumbNode = ({ isLast, node, onClick }) => {
  const className = classnames('aui--breadcrumb-node', { 'aui--breadcrumb-node-link': !isLast });

  const onClickNode = () => {
    if (!isLast) onClick(node.id);
  };

  return (
    <div data-testid="breadcrumb-node-wrapper" className={className} onClick={onClickNode}>
      {node.label}
    </div>
  );
};

BreadcrumbNode.propTypes = {
  isLast: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default BreadcrumbNode;
