import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from './Node';
import './styles.scss';

const Breadcrumb = ({ rootNode, divider, nodes, onClick, disabled }) => {
  const baseClass = 'aui--breadcrumb';
  const className = classnames(baseClass, { [`${baseClass}--disabled`]: disabled });
  const onClickFunc = (newActiveId) => !disabled && onClick(newActiveId);

  if (nodes.length === 0) {
    return <div data-testid="breadcrumb-wrapper" className={className} />;
  }

  return (
    <div data-testid="breadcrumb-wrapper" className={className}>
      <BreadcrumbNode isLast={false} node={rootNode} onClick={onClickFunc} />
      {_.map(nodes, (node, index) => (
        <React.Fragment key={node.id}>
          <div data-testid="breadcrumb-node-divider" className={`${baseClass}-node-divider`}>
            {divider}
          </div>
          <BreadcrumbNode isLast={index === nodes.length - 1} node={node} onClick={onClickFunc} />
        </React.Fragment>
      ))}
    </div>
  );
};

Breadcrumb.propTypes = {
  rootNode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  divider: PropTypes.node,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  rootNode: { id: 'all', label: 'All' },
  divider: '>',
  nodes: [],
  onClick: (newActiveId) => {
    throw new Error(`Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
  disabled: false,
};

export default Breadcrumb;
