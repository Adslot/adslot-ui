import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import TreePickerPure from 'components/adslotUi/TreePickerPureComponent';
import React, { PropTypes } from 'react';

class TreePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    for (const methodName of [
      'applyAction',
      'breadcrumbOnClick',
      'cancelAction',
      'changeRootType',
      'expandNode',
      'includeNode',
      'removeNode',
      'loadData',
      'searchOnQuery',
    ]) {this[methodName] = this[methodName].bind(this);}

    this.loadData();
  }

  loadData() {
    const rootType = _.first(this.props.rootTypes);
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

  cancelAction() {
    this.props.modalClose();
    this.loadData();
  }

  applyAction() {
    const { selectedNodesByRootType } = this.state;
    let selectedNodeIds = [];
    _.forEach(selectedNodesByRootType, (nodes) => {
      selectedNodeIds = selectedNodeIds.concat(_.pluck(nodes, 'id'));
    });
    this.props.modalApply(selectedNodeIds);
    this.props.modalClose();
  }

  render() {
    const { state, props } = this;

    return (
      <Modal className="treepicker-component" show={props.show} bsSize="large" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-inverse" onClick={this.cancelAction}>
            Cancel
          </Button>
          <Button bsStyle="primary" onClick={this.applyAction}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TreePickerComponent.displayName = 'AdslotUiTreePickerComponent';

TreePickerComponent.propTypes = {
  baseItem: PropTypes.shape(),
  getSelected: PropTypes.func,
  getSubtree: PropTypes.func,
  modalApply: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  rootTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      icon: PropTypes.string,
      emptyIcon: PropTypes.string,
      isRequired: PropTypes.bool.isRequired,
    })
  ),
  show: PropTypes.bool.isRequired,
  valueFormatter: PropTypes.func,
  warnOnRequired: PropTypes.bool.isRequired,
};
TreePickerComponent.defaultProps = {
  getSelected: () => null,
  getSubtree: () => [],
  modalApply: (selected) => {throw new Error(`AdslotUi TreePicker needs a modalApply handler for ${selected}`);},

  modalClose: () => {throw new Error('AdslotUi TreePicker needs a modalClose handler');},

  modalTitle: 'Edit Tree',
  rootTypes: [],
  show: false,
  warnOnRequired: false,
};

export default TreePickerComponent;
