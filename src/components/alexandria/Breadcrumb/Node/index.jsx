import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class BreadcrumbNode extends PureComponent {
  onClickNode = () => this.props.onClick(this.props.node.id);

  render() {
    const baseClass = 'breadcrumbnode-component';
    if (this.props.isLast) {
      return (
        <span className={baseClass}>
          {this.props.node.label}
        </span>);
    }

    return (
      <span className={`${baseClass} ${baseClass}-link`} onClick={this.onClickNode}>
        {this.props.node.label}
      </span>);
  }
}

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
