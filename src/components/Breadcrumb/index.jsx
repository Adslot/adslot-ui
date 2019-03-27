import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from 'components/Breadcrumb/Node';
import './styles.scss';

const Breadcrumb = ({ nodes, onClick, disabled }) => {
  const baseClass = 'breadcrumb-component';
  const className = `${baseClass} ${disabled ? 'disabled' : ''}`;
  const onClickFunc = newActiveId => !disabled && onClick(newActiveId);

  if (nodes.length === 0) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <BreadcrumbNode isLast={false} node={{ id: 'all', label: 'All' }} onClick={onClickFunc} />
      {_.map(nodes, (node, index) => (
        <span className={`${baseClass}-node`} key={node.id}>
          <span className={`${baseClass}-node-divider`}> &gt; </span>
          <BreadcrumbNode isLast={index === nodes.length - 1} node={node} onClick={onClickFunc} />
        </span>
      ))}
    </div>
  );
};

Breadcrumb.displayName = 'BreadcrumbComponent';

Breadcrumb.propTypes = {
  nodes: PropTypes.arrayOf(BreadcrumbNode.propTypes.node),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
Breadcrumb.defaultProps = {
  nodes: [],
  onClick: newActiveId => {
    throw new Error(`Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
  disabled: false,
};

export default Breadcrumb;
