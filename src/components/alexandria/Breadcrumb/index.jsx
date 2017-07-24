import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from 'components/alexandria/Breadcrumb/Node';
import './styles.scss';

const Breadcrumb = ({ nodes, onClick }) => {
  const baseClass = 'breadcrumb-component';

  if (nodes.length === 0) {
    return <div className={baseClass} />;
  }

  return (
    <div className={baseClass}>
      <BreadcrumbNode
        isLast={false}
        node={{ id: 'all', label: 'All' }}
        onClick={onClick}
      />
      {
        _.map(nodes, (node, index) =>
          <span className={`${baseClass}-node`} key={node.id}>
            <span className={`${baseClass}-node-divider`}> > </span>
            <BreadcrumbNode
              isLast={index === nodes.length - 1}
              node={node}
              onClick={onClick}
            />
          </span>
        )
      }
    </div>
  );
};

Breadcrumb.displayName = 'AlexandriaBreadcrumbComponent';

Breadcrumb.propTypes = {
  nodes: PropTypes.arrayOf(BreadcrumbNode.propTypes.node).isRequired,
  onClick: PropTypes.func.isRequired,
};
Breadcrumb.defaultProps = {
  nodes: [],
  onClick: (newActiveId) => {
    throw new Error(`Alexandria Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
};

export default Breadcrumb;
