import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BreadcrumbNode from 'alexandria/Breadcrumb/Node';
import './styles.scss';

class Breadcrumb extends PureComponent {
  onClickFunc = (newActiveId) => !this.props.disabled && this.props.onClick(newActiveId);

  render() {
    const { nodes, disabled } = this.props;
    const baseClass = 'breadcrumb-component';
    const className = `${baseClass} ${disabled ? 'disabled' : ''}`;

    if (nodes.length === 0) {
      return <div className={className} />;
    }

    return (
      <div className={className}>
        <BreadcrumbNode
          isLast={false}
          node={{ id: 'all', label: 'All' }}
          onClick={this.onClickFunc}
        />
        {
          _.map(nodes, (node, index) =>
            <span className={`${baseClass}-node`} key={node.id}>
              <span className={`${baseClass}-node-divider`}> > </span>
              <BreadcrumbNode
                isLast={index === nodes.length - 1}
                node={node}
                onClick={this.onClickFunc}
              />
            </span>
          )
        }
      </div>
    );
  }
}

Breadcrumb.displayName = 'AlexandriaBreadcrumbComponent';

Breadcrumb.propTypes = {
  nodes: PropTypes.arrayOf(BreadcrumbNode.propTypes.node).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
Breadcrumb.defaultProps = {
  nodes: [],
  onClick: (newActiveId) => {
    throw new Error(`Alexandria Breadcrumb needs an onClick handler to take ${newActiveId}`);
  },
  disabled: false,
};

export default Breadcrumb;
