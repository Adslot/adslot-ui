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
  propTypes: [{
    propType: 'breadcrumbNodes',
    type: 'arrayOf { id: string/number, label: string }',    
    note: 'returns node id'
  },
  {
    propType: 'breadcrumbOnClick',
    type: 'func',    
    note: 'required. This propType creates a list of breadcrumb node'
  },
  {
    propType: 'debounceInterval',
    type: 'number',
    defaultValue: <pre>0</pre>,
    note: 'Interval time on search'
  },
  {
    propType: 'disabled',
    type: 'bool',
    defaultValue: <pre>false</pre>,
    note: 'disables treepicker including serach bar'
  },
  {
    propType: 'disableInclude',
    type: 'bool',   
    note: `disables treepicker's grid item`
  },
  {
    propType: 'emptySvgSymbol',
    type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,   
    note: `displays this svg symbol when there will be no item on both left or right Grid`
  },
  {
    propType: 'emptySelectedListSvgSymbol',
    type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,
    note: `displays this svg symbol when there will be no item on right Grid(Selected list)`
  },
  {
    propType: 'emptyText',
    type: 'string',
    note: `displays this text when there will be no item on left Grid`
  },
  {
    propType: 'emptySelectedListText',
    type: 'string',
    note: `displays this text when there will be no item on right Grid(Selected list)`
  },
  {
    propType: 'expandNode',
    type: 'func',
    note: `triggers when clicking any item in the left Grid`
  },
  {
    propType: 'groupFormatter',
    type: 'func',
    note: `this function use to transform keys of the list item in the left Grid`
  },
  {
    propType: 'hideIcon',
    type: 'bool',
    note: `hides icon when displays empty symbol`
  },
  {
    propType: 'includeNode',
    type: 'func',
    note: `onclick event on '+' button of each list Item`
  },
  {
    propType: 'initialStateNode',
    type: 'node',
    note: 'same as emptyText'
  },
  {
    propType: 'initialStateSymbol',
    type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,
    note: 'same as emptySymbol'
  },
  {
    propType: 'itemType',
    type: 'string',
    defaultValue: <pre>node</pre>,
    note: 'uses for specific className'
  },
  {
    propType: 'isLoading',
    type: 'bool',
    defaultValue: <pre>false</pre>,
  },
  {
    propType: 'nodeRenderer',
    type: 'func',
    note: 'uses for rendering custom node'
  },
  {
    propType: 'removeNode',
    type: 'func'
  },
  {
    propType: 'onChange',
    type: 'func', 
    note: 'triggers search input onchange'
  },
  {
    propType: 'onSearch',
    type: 'func',
    note: 'not specified'
  },
  {
    propType: 'searchOnChange',
    type: 'bool',
    defaultValue: <pre>true</pre>,
    note: 'Serach for item on onChange trigger when the value is true'
  },
  {
    propType: 'searchOnEnterKey',
    type: 'bool',
    defaultValue: <pre>false</pre>,
    note: 'Serach for item on Enter key trigger when the value is true'
  },
  {
    propType: 'searchPlaceholder',
    type: 'string',
  },
  {
    propType: 'searchValue',
    type: 'string',
  },
  {
    propType: 'selectedNodes',
    type: 'arrayOf Treepicker Nodes',
    note: 'required',
  },
  {
    propType: 'subtree',
    type: 'arrayOf Treepicker Nodes',
    note: 'required. A list of available unselected nodes',
  },
  {
    propType: 'svgSymbolCancel',
    type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,
  },
  {
    propType: 'svgSymbolSearch',
    type: <span>shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.</span>,
  },
  {
    propType: 'displayGroupHeader',
    type: 'bool',
    defaultValue: <pre>true</pre>,
    note: 'e.g: Default Group',
  },
  {
    propType: 'hideSearchOnRoot',
    type: 'bool',
    defaultValue: <pre>false</pre>
  },
],
};

export default () => <Example {...exampleProps}><TreePickerExample /></Example>;
