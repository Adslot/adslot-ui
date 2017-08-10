import _ from 'lodash';
import React, { Component } from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import TreePickerSimplePure from '../../components/adslotUi/TreePicker/TreePickerSimplePureComponent';

const groupFormatter = (node) => (`${node.label.split(' ').length} words`);

const dataSet = [
  { id: '1', label: 'Australia', path: [], type: '', isExpandable: true, isSelectable: false },
  { id: '10', label: 'USA', path: [], type: '', isExpandable: true, isSelectable: false },
  { id: '11', label: 'New Zealand (not selectable)', path: [], type: '', isExpandable: false, isSelectable: false },
  { id: '100', label: 'United Kingdom', path: [], type: '', isExpandable: true, isSelectable: false },
  { id: '101', label: 'Victoria', path: [{ id: '1', label: 'AU' }], type: '', isExpandable: false },
  { id: '110', label: 'New South Wales', path: [{ id: '1', label: 'AU' }], type: '', isExpandable: false },
  { id: '111', label: 'Queensland', path: [{ id: '1', label: 'AU' }], type: '', isExpandable: false },
  { id: '1000', label: 'Tasmania', path: [{ id: '1', label: 'AU' }], type: '', isExpandable: false },
  { id: '1001', label: 'South Australia', path: [{ id: '1', label: 'AU' }], type: '', isExpandable: false },
  { id: '1010', label: 'Western Australia', path: [{ id: '1', label: 'AU' }], type: '', isExpandable: false },
  { id: '1100', label: 'Alaska', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '1101', label: 'Arizona', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '1110', label: 'Arkansas', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '1111', label: 'California', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10000', label: 'Colorado', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10001', label: 'Connecticut', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10010', label: 'Delaware', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10011', label: 'Florida', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10100', label: 'Georgia', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10101', label: 'Hawaii', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '10111', label: 'Idaho', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11000', label: 'Illinois', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11001', label: 'Indiana', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11010', label: 'Iowa', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11011', label: 'Kansas', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11100', label: 'Kentucky', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11101', label: 'Louisiana', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11110', label: 'Maine', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '11111', label: 'Maryland', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100000', label: 'Massachusetts', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100001', label: 'Michigan', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100010', label: 'Minnesota', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100011', label: 'Mississippi', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100100', label: 'Missouri', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100101', label: 'Montana', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100110', label: 'Nebraska', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '100111', label: 'Nevada', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101000', label: 'New Hampshire', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101001', label: 'New Jersey', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101010', label: 'New Mexico', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101011', label: 'New York', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101100', label: 'North Carolina', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101101', label: 'North Dakota', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101110', label: 'Ohio', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '101111', label: 'Oklahoma', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110000', label: 'Oregon', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110001', label: 'Pennsylvania', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110010', label: 'Rhode Island', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110011', label: 'South Carolina', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110100', label: 'South Dakota', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110101', label: 'Tennessee', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110110', label: 'Texas', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '110111', label: 'Utah', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '111000', label: 'Vermont', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '111001', label: 'Virginia', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '111010', label: 'Washington', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '111011', label: 'West Virginia', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '111100', label: 'Wisconsin', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
  { id: '111101', label: 'Wyoming', path: [{ id: '10', label: 'US' }], type: '', isExpandable: false },
];

class TreePickerSimplePureDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: 'tree picker example',    // this is only for dts
      searchValue: '',
      selectedNodes: [],
      subtree: _.filter(dataSet, (data) => _.isEmpty(data.path)),
      displayGroupHeader: false,
      breadcrumbNodes: [],
      dataSet,
      disabled: false,
      searchOnEnterKey: false,
      debounceInterval: 0,
    };

    for (const propsFunction of [
      'toggleDisplayGroupHeader',
      'setSearchValue',
      'selectNode',
      'deselectNode',
      'expandNode',
      'breadcrumbOnClick',
      'toggleDisabled',
      'toggleSearchOnEnterKey',
      'onClear',
      'onSearch',
    ]) { this[propsFunction] = this[propsFunction].bind(this); }

    this.getSubtree = this.getSubtree.bind(this);
    this.title = 'TreePickerSimplePure with interactive data';
  }

  onSearch(value) {
    if (!_.isEmpty(value)) {
      this.setState({
        subtree: _.filter(this.state.dataSet, ({ label }) => {
          if (value) {
            return _.includes(label.toLowerCase(), value.toLowerCase());
          }

          return false;
        }),
      });
    } else {
      // go back to current breadcrumb node
      this.setState({
        subtree: this.getSubtree(_.last(this.state.breadcrumbNodes)),
      });
    }
  }

  onClear(value) {
    this.setSearchValue(value);
    this.onSearch(value);
  }

  setSearchValue(newValue) {
    this.setState({
      searchValue: newValue,
    });
  }

  getSubtree(node = 'all') {
    return _.filter(this.state.dataSet, (data) => {
      if (node === 'all') {
        return _.isEmpty(data.path);
      }

      return !_.isEmpty(data.path) && (node.id === data.path[0].id);
    });
  }

  toggleSearchOnEnterKey() {
    this.setState({
      searchOnEnterKey: !this.state.searchOnEnterKey,
    });
  }

  breadcrumbOnClick(nodeId) {
    const { breadcrumbNodes } = this.state;
    const newBreadcrumbHeadIndex = _.findIndex(breadcrumbNodes, { id: nodeId });
    const newHeadNode = breadcrumbNodes[newBreadcrumbHeadIndex];

    this.setState({
      breadcrumbNodes: _.slice(breadcrumbNodes, 0, newBreadcrumbHeadIndex + 1),
      subtree: this.getSubtree(nodeId === 'all' ? 'all' : newHeadNode),
    });
  }

  expandNode(node) {
    const { breadcrumbNodes } = this.state;

    this.setState({
      breadcrumbNodes: breadcrumbNodes.concat([_.cloneDeep(node)]),
      searchValue: '',
      subtree: this.getSubtree(node),
    });
  }

  deselectNode(node) {
    const { selectedNodes } = this.state;

    this.setState({
      selectedNodes: _.remove(selectedNodes, ({ id }) => id !== node.id),
    });
  }

  selectNode(node) {
    const { selectedNodes } = this.state;

    this.setState({
      selectedNodes: selectedNodes.concat([_.cloneDeep(node)]),
    });
  }

  toggleDisplayGroupHeader() {
    this.setState({
      displayGroupHeader: !this.state.displayGroupHeader,
    });
  }

  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    const treePickerProps = {
      groupFormatter,
      emptySelectedListText: (<div><b>Choose items of interest</b></div>),
      initialStateNode: (<div><b>Start by searching for items</b></div>),
      searchValue: this.state.searchValue,
      displayGroupHeader: this.state.displayGroupHeader,
      subtree: this.state.subtree,
      selectedNodes: this.state.selectedNodes,
      breadcrumbNodes: this.state.breadcrumbNodes,
      onChange: this.setSearchValue,
      onClear: this.onClear,
      onSearch: this.onSearch,
      searchOnChange: !this.state.searchOnEnterKey,
      searchOnEnterKey: this.state.searchOnEnterKey,
      includeNode: this.selectNode,
      removeNode: this.deselectNode,
      expandNode: this.expandNode,
      breadcrumbOnClick: this.breadcrumbOnClick,
      disabled: this.state.disabled,
      debounceInterval: this.state.debounceInterval,
    };

    return (
      <div className="tree-picker-simple-pure-demo">
        <h2>{this.title}</h2>

        <div className="row">
          <Checkbox checked={this.state.displayGroupHeader} onChange={this.toggleDisplayGroupHeader}>
            Toggle Group Header
          </Checkbox>
          <Checkbox checked={this.state.disabled} onChange={this.toggleDisabled}>
            Toggle Disabled
          </Checkbox>
          <Checkbox checked={this.state.searchOnEnterKey} onChange={this.toggleSearchOnEnterKey}>
            Toggle Search On Enter Key
          </Checkbox>
        </div>
        <div className="row">
          <TreePickerSimplePure {...treePickerProps} />
        </div>
      </div>
    );
  }
}

export default TreePickerSimplePureDemo;
