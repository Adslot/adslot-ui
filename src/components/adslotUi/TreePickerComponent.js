import _ from 'lodash';
import TreePickerPure from 'components/adslotUi/TreePickerPureComponent';
import React, { PropTypes } from 'react';

class TreePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.breadcrumbOnClick = this.breadcrumbOnClick.bind(this);
    this.changeRootType = this.changeRootType.bind(this);
    this.expandNode = this.expandNode.bind(this);
    this.includeNode = this.includeNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.searchOnQuery = this.searchOnQuery.bind(this);

    const rootType = _.first(props.rootTypes);
    this.state = {
      breadcrumbNodes: [],
      rootType,
      selectedNodesByRootType: _.groupBy(this.props.getSelected(), 'rootTypeId'),
      subtree: this.props.getSubtree(_.get(rootType, 'id'), ''),
    };
  }

  changeRootType(newRootTypeId) {
    this.setState({
      rootType: _.find(this.props.rootTypes, { id: newRootTypeId }),
      subtree: this.props.getSubtree(newRootTypeId, ''),
    });
  }

  searchOnQuery(query) {
    this.setState({
      breadcrumbNodes: [],
      subtree: this.props.getSubtree(this.state.rootType.id, query),
    });
  }

  breadcrumbOnClick(newActiveId) {
    const { breadcrumbNodes, rootType } = this.state;
    const { getSubtree } = this.props;
    if (newActiveId === 'all') {
      this.setState({
        breadcrumbNodes: [],
        subtree: getSubtree(rootType.id, ''),
      });
    } else {
      this.setState({
        breadcrumbNodes: breadcrumbNodes.slice(0, 1 + _.findIndex(breadcrumbNodes, { id: newActiveId })),
        subtree: getSubtree(rootType.id, newActiveId),
      });
    }
  }

  expandNode(node) {
    const { breadcrumbNodes, rootType } = this.state;

    this.setState({
      breadcrumbNodes: breadcrumbNodes.concat([node]),
      subtree: this.props.getSubtree(rootType.id, node.id),
    });
  }

  includeNode(node) {
    const newSelected = this.state.selectedNodesByRootType;
    const { rootTypeId } = node;
    if (_.isEmpty(newSelected[rootTypeId])) {newSelected[rootTypeId] = [];}

    newSelected[rootTypeId].push(node);
    this.setState({ selectedNodesByRootType: newSelected });
  }

  removeNode(node) {
    const newSelected = this.state.selectedNodesByRootType;
    const { rootTypeId } = node;
    newSelected[rootTypeId] = _.reject(newSelected[rootTypeId], { id: node.id });
    if (_.isEmpty(newSelected[rootTypeId])) {delete newSelected[this.state.rootType.id];}

    this.setState({ selectedNodesByRootType: newSelected });
  }

  render() {
    const { state, props } = this;

    return (
      <div className="treepicker-component">
        <TreePickerPure
          activeRootTypeId={_.get(state, 'rootType.id')}
          baseItem={props.baseItem}
          breadcrumbNodes={state.breadcrumbNodes}
          breadcrumbOnClick={this.breadcrumbOnClick}
          changeRootType={this.changeRootType}
          emptyIcon={_.get(state, 'rootType.emptyIcon')}
          expandNode={this.expandNode}
          includeNode={this.includeNode}
          removeNode={this.removeNode}
          rootTypes={props.rootTypes}
          searchOnQuery={this.searchOnQuery}
          selectedNodesByRootType={state.selectedNodesByRootType}
          subtree={state.subtree}
          valueFormatter={props.valueFormatter}
          warnOnRequired={props.warnOnRequired}
        />

      </div>
    );
  }
}

TreePickerComponent.displayName = 'AdslotUiTreePickerComponent';

TreePickerComponent.propTypes = {
  baseItem: PropTypes.shape(),
  valueFormatter: PropTypes.func,
  getSelected: PropTypes.func,
  getSubtree: PropTypes.func,
  rootTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      icon: PropTypes.string,
      emptyIcon: PropTypes.string,
      isRequired: PropTypes.bool.isRequired,
    })
  ),
  warnOnRequired: PropTypes.bool.isRequired,
};
TreePickerComponent.defaultProps = {
  rootTypes: [],
  getSelected: () => null,

  getSubtree: () => [],

  warnOnRequired: false,
};

export default TreePickerComponent;
