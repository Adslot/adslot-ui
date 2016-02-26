import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';
import TreePickerPure from 'components/adslotUi/TreePickerPureComponent';
import { SvgSymbol } from 'alexandria-adslot';
import React, { PropTypes } from 'react';

const pathIncludesId = ({ id, path }) => _(path).map('id').includes(id);
const getIds = (nodes) => _.map(nodes, 'id');

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
      'loadData',
      'removeNode',
      'searchOnChange',
      'searchOnClear',
      'searchOnQuery',
    ]) {this[methodName] = this[methodName].bind(this);}

    this.state = {};
    this.throttledSearchOnQuery = _.throttle(() => this.searchOnQuery(this.state.searchValue), props.throttleTime);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (!_(nextProps.initialSelection)
      .thru(getIds)
      .xor(getIds(this.props.initialSelection))
      .isEmpty()
    ) {this.loadData(nextProps.initialSelection);}
  }

  componentWillUnmount() { this._isMounted = false; }

  loadData(initialSelection = this.props.initialSelection) {
    const rootType = _.first(this.props.rootTypes);
    const selectedNodesByRootType = _(initialSelection)
      .sortBy('label')
      .groupBy('rootTypeId')
      .value();

    this.props.getSubtree({ rootTypeId: _.get(rootType, 'id') }, (subtree) => {
      if (this._isMounted) {
        this.setState({
          breadcrumbNodes: [],
          rootType,
          searchValue: '',
          selectedNodesByRootType,
          subtree,
        });
      }
    });
  }

  changeRootType(rootTypeId) {
    this.props.getSubtree({ rootTypeId }, (subtree) => {
      this.setState({
        rootType: _.find(this.props.rootTypes, { id: rootTypeId }),
        searchValue: '',
        subtree,
      });
    });
  }

  searchOnChange(value) { this.setState({ searchValue: value }, this.throttledSearchOnQuery); }

  searchOnClear() { this.searchOnChange(''); }

  searchOnQuery(query) {
    this.props.getSubtree({ rootTypeId: this.state.rootType.id, query }, (subtree) => {
      this.setState({
        breadcrumbNodes: [],
        subtree,
      });
    });
  }

  breadcrumbOnClick(newActiveId) {
    const { breadcrumbNodes, rootType } = this.state;
    const { getSubtree } = this.props;
    if (newActiveId === 'all') {
      getSubtree({ rootTypeId: rootType.id }, (subtree) => {
        this.setState({
          breadcrumbNodes: [],
          subtree,
        });
      });
    } else {
      getSubtree({ rootTypeId: rootType.id, nodeId: newActiveId }, (subtree) => {
        this.setState({
          breadcrumbNodes: breadcrumbNodes.slice(0, 1 + _.findIndex(breadcrumbNodes, { id: newActiveId })),
          subtree,
        });
      });
    }
  }

  expandNode(node) {
    const { breadcrumbNodes, rootType } = this.state;
    this.props.getSubtree({ rootTypeId: rootType.id, nodeId: node.id }, (subtree) => {
      this.setState({
        breadcrumbNodes: breadcrumbNodes.concat([node]),
        searchValue: '',
        subtree,
      });
    });
  }

  includeNode(node) {
    const newSelected = this.state.selectedNodesByRootType;
    const { rootTypeId } = node;
    if (_.isEmpty(newSelected[rootTypeId])) {newSelected[rootTypeId] = [];}

    newSelected[rootTypeId].push(node);
    _.remove(newSelected[rootTypeId], ({ id, path }) =>
      pathIncludesId({ id: node.id, path }) || pathIncludesId({ id, path: node.path })
    );

    this.setState({ selectedNodesByRootType: newSelected });
  }

  removeNode(node) {
    const newSelected = this.state.selectedNodesByRootType;
    const { rootTypeId } = node;
    newSelected[rootTypeId] = _.reject(newSelected[rootTypeId], { id: node.id });
    if (_.isEmpty(newSelected[rootTypeId])) {delete newSelected[rootTypeId];}

    this.setState({ selectedNodesByRootType: newSelected });
  }

  cancelAction() {
    this.props.modalClose();
    this.loadData();
  }

  applyAction() {
    this.props.modalApply(_.mapValues(this.state.selectedNodesByRootType, getIds));
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
            averageWithinRootType={props.averageWithinRootType}
            baseItem={props.baseItem}
            breadcrumbNodes={state.breadcrumbNodes}
            breadcrumbOnClick={this.breadcrumbOnClick}
            changeRootType={this.changeRootType}
            emptyIcon={_.get(state, 'rootType.emptyIcon')}
            emptySvgSymbol={_.get(state, 'rootType.emptySvgSymbol')}
            expandNode={this.expandNode}
            helpText={props.helpText}
            includeNode={this.includeNode}
            removeNode={this.removeNode}
            rootTypes={props.rootTypes}
            searchOnChange={this.searchOnChange}
            searchOnClear={this.searchOnClear}
            searchValue={state.searchValue}
            selectedLabel={props.selectedLabel}
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
  averageWithinRootType: PropTypes.bool.isRequired,
  baseItem: PropTypes.shape(),
  getSubtree: PropTypes.func,
  helpText: PropTypes.shape({
    average: PropTypes.string,
    sum: PropTypes.string,
  }),
  initialSelection: PropTypes.arrayOf(TreePickerPropTypes.node).isRequired,
  modalApply: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  rootTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      icon: PropTypes.string,
      emptyIcon: PropTypes.string,
      emptySvgSymbol: PropTypes.shape(SvgSymbol.propTypes),
      isRequired: PropTypes.bool.isRequired,
    })
  ),
  selectedLabel: PropTypes.string,
  show: PropTypes.bool.isRequired,
  throttleTime: PropTypes.number.isRequired,
  valueFormatter: PropTypes.func,
  warnOnRequired: PropTypes.bool.isRequired,
};
TreePickerComponent.defaultProps = {
  averageWithinRootType: false,
  getSubtree: ({ rootTypeId, query, nodeId }, cb) => cb([]),
  initialSelection: [],
  modalApply: (selected) => {
    throw new Error(`AdslotUi TreePicker needs a modalApply handler for ${JSON.stringify(selected)}`);
  },

  modalClose: () => {throw new Error('AdslotUi TreePicker needs a modalClose handler');},

  modalTitle: 'Edit Tree',
  rootTypes: [],
  show: false,
  throttleTime: 300,
  warnOnRequired: false,
};

export default TreePickerComponent;
