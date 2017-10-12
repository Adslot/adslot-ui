import React from 'react';
import Example from '../components/Example';
import _ from 'lodash';
import {
  TreePickerSimplePure,
} from '../../src/dist-entry';

class TreePickerExample extends React.Component {
  constructor() {
    super();
    this.state = {
      itemType: 'segment value',
      treePickerPureSubtree: [],
      pickerSearchValue: '',
      subTree: [
        { id: '0', label: 'Northern Territory', path: [{ id: '10', label: 'AU' }], type: '' },
        { id: '1', label: 'Australian Capital Territory', path: [{ id: '10', label: 'AU' }], type: '' },
      ],
    };
    this.setPickerSearchValue = this.setPickerSearchValue.bind(this);
  }

  setPickerSearchValue(newValue) {
    this.setState({ pickerSearchValue: newValue });
    this.setState({
      treePickerPureSubtree:
        _.filter(this.state.subTree, ({ label }) => {
          if (newValue) {
            return _.includes(label.toLowerCase(), newValue.toLowerCase());
          }
          return false;
        }),
    });
  }

  pickerSearchOnClear() {
    this.setPickerSearchValue('');
  }

  render() {
    return (
      <TreePickerSimplePure
        itemType={this.state.itemType}
        hideIcon
        selectedNodes={[]}
        subtree={this.state.treePickerPureSubtree}
        emptySelectedListText={<div><b>Choose items of interest</b></div>}
        initialStateNode={<div><b>Start by searching for items</b></div>}
        searchValue={this.state.pickerSearchValue}
        onChange={this.setPickerSearchValue}
        searchOnClear={this.pickerSearchOnClear}
        includeNode={_.noop}
        additionalClassNames={this.state.pickerSearchValue ? undefined : ['background-highlighted', 'test-class']}
      />
    );
  }
}


const exampleProps = {
  componentName: 'TreePicker',
  exampleCodeSnippet: `<TreePickerSimplePure
  itemType={this.state.itemType}
  hideIcon
  selectedNodes={[]}
  subtree={this.state.treePickerPureSubtree}
  emptySelectedListText={<div><b>Choose items of interest</b></div>}
  initialStateNode={<div><b>Start by searching for items</b></div>}
  searchValue={this.state.pickerSearchValue}
  onChange={this.setPickerSearchValue}
  searchOnClear={this.pickerSearchOnClear}
  additionalClassNames={this.state.pickerSearchValue ? undefined : ['background-highlighted', 'test-class']}
/>`,
  propTypes: [],
};


export default () => <Example {...exampleProps}><TreePickerExample /></Example>;
