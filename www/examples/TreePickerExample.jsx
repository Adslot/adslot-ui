import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { TreePickerSimplePure, Search } from '../../src';

class TreePickerExample extends React.Component {
  state = {
    selectedSearchValue: '',
    itemType: 'segment value',
    selectedNodes: [],
    pickerSearchValue: '',
    subTree: [
      {
        id: '0',
        label: 'Northern Territory',
        path: [{ id: '10', label: 'Australia' }],
        type: 'Territory',
      },
      {
        id: '1',
        label: 'Australian Capital Territory',
        path: [{ id: '10', label: 'Australia' }],
        type: 'Territory',
      },
      {
        id: '2',
        label: 'Victoria',
        path: [{ id: '10', label: 'Australia' }],
        type: 'State',
      },
    ],
  };

  setPickerSearchValue = newValue => this.setState({ pickerSearchValue: newValue });

  pickerSearchOnClear = () => this.setPickerSearchValue('');

  getSelectedNodes = () => {
    if (_.isEmpty(this.state.selectedSearchValue)) return this.state.selectedNodes;

    return _.filter(this.state.selectedNodes, ({ label }) =>
      _.includes(label.toLowerCase(), this.state.selectedSearchValue.toLowerCase())
    );
  };

  getSubtree = () => {
    const { pickerSearchValue, selectedSearchValue } = this.state;
    let treePickerPureSubtree = [];

    // filter out nodes that do not contain search string
    if (!_.isEmpty(pickerSearchValue)) {
      treePickerPureSubtree = _.filter(this.state.subTree, ({ label }) =>
        _.includes(label.toLowerCase(), pickerSearchValue.toLowerCase())
      );
    }

    // filter out nodes that do not contain the selected search string
    // however keep the nodes that are not selected but do not contain the selected search string
    if (!_.isEmpty(selectedSearchValue)) {
      treePickerPureSubtree = _.filter(treePickerPureSubtree, ({ id, label }) => {
        if (_.find(this.state.selectedNodes, { id })) {
          return _.includes(label.toLowerCase(), selectedSearchValue.toLowerCase());
        }

        return true;
      });
    }

    return treePickerPureSubtree;
  };

  render() {
    return (
      <TreePickerSimplePure
        itemType={this.state.itemType}
        hideIcon
        selectedNodes={this.getSelectedNodes()}
        subtree={this.getSubtree()}
        emptySelectedListText={
          <div>
            <b>Choose items of interest</b>
          </div>
        }
        initialStateNode={
          <div>
            <b>Start by searching for items</b>
          </div>
        }
        searchValue={this.state.pickerSearchValue}
        onChange={this.setPickerSearchValue}
        searchOnClear={this.pickerSearchOnClear}
        includeNode={node => this.setState({ selectedNodes: _.concat([], this.state.selectedNodes, node) })}
        removeNode={node => this.setState({ selectedNodes: _.reject(this.state.selectedNodes, { id: node.id }) })}
        additionalClassNames={this.state.pickerSearchValue ? undefined : ['background-highlighted', 'test-class']}
        selectedTopSearch={
          <div className="selected-search">
            <Search onSearch={selectedSearchValue => this.setState({ selectedSearchValue })} />
          </div>
        }
      />
    );
  }
}

const exampleProps = {
  componentName: 'TreePicker',
  designNotes: (
    <p>
      Tree pickers are useful for users when we require to configure from large list, allowing users to clearly see the
      result of their action in the right panel. This split view allows the user to quickly edit, review and save their
      selection.
    </p>
  ),
  exampleCodeSnippet: `
<TreePickerSimplePure
  itemType={this.state.itemType}
  hideIcon
  selectedNodes={this.getSelectedNodes()}
  subtree={this.getSubtree()}
  emptySelectedListText={<div><b>Choose items of interest</b></div>}
  initialStateNode={<div><b>Start by searching for items</b></div>}
  searchValue={this.state.pickerSearchValue}
  onChange={this.setPickerSearchValue}
  searchOnClear={this.pickerSearchOnClear}
  includeNode={node => this.setState({ selectedNodes: _.concat([], this.state.selectedNodes, node) })}
  removeNode={node => this.setState({ selectedNodes: _.reject(this.state.selectedNodes, { id: node.id }) })}
  additionalClassNames={this.state.pickerSearchValue ? undefined : ['background-highlighted', 'test-class']}
  selectedTopSearch={
    <div className="selected-search">
      <Search onSearch={selectedSearchValue => this.setState({ selectedSearchValue })} />
    </div>
  }
/>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'additionalClassNames',
          type: 'arrayOf(string)',
          note: 'Class Names for SplitPane component',
        },
        {
          propType: 'breadcrumbNodes',
          type: 'arrayOf { id: string/number, label: string }',
          note: `returns node id. This prop is not required,
          but an empty array is not allowed. At least one element is required in the array.`,
        },
        {
          propType: 'breadcrumbOnClick',
          type: 'func',
          note: 'This propType creates a list of breadcrumb node',
        },
        {
          propType: 'debounceInterval',
          type: 'number',
          defaultValue: <code>0</code>,
          note: 'Interval time on search',
        },
        {
          propType: 'disabled',
          type: 'bool',
          defaultValue: <code>false</code>,
          note: 'disables treepicker including search bar',
        },
        {
          propType: 'disableInclude',
          type: 'bool',
          note: `disables treepicker's grid item`,
        },
        {
          propType: 'emptySvgSymbol',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
          note: `displays this svg symbol when there will be no item on both left or right Grid`,
        },
        {
          propType: 'emptySelectedListSvgSymbol',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
          note: `displays this svg symbol when there will be no item on right Grid(Selected list)`,
        },
        {
          propType: 'emptyText',
          type: 'node',
          note: `displays this text when there will be no item on left Grid. Prefer type 'string', but rich text can be used here.`,
        },
        {
          propType: 'emptySelectedListText',
          type: 'node',
          note: `displays this text when there will be no item on right Grid(Selected list). Prefer type 'string', but rich text can be used here.`,
        },
        {
          propType: 'expandNode',
          type: 'func',
          note: `triggers when clicking any item in the left Grid`,
        },
        {
          propType: 'groupFormatter',
          type: 'func',
          note: `this function use to transform keys of the list item in the left Grid`,
        },
        {
          propType: 'hideIcon',
          type: 'bool',
          note: `hides icon when displays empty symbol`,
        },
        {
          propType: 'includeNode',
          type: 'func',
          note: `onclick event on '+' button of each list Item`,
        },
        {
          propType: 'initialStateNode',
          type: 'node',
          note: 'same as emptyText',
        },
        {
          propType: 'initialStateSymbol',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
          note: 'same as emptySymbol',
        },
        {
          propType: 'itemType',
          type: 'string',
          defaultValue: <code>'node'</code>,
          note: 'uses for specific className',
        },
        {
          propType: 'isLoading',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'nodeRenderer',
          type: 'func',
          note: 'uses for rendering custom node',
        },
        {
          propType: 'removeNode',
          type: 'func',
        },
        {
          propType: 'onChange',
          type: 'func',
          note: 'onChange function triggers, when search input changes',
        },
        {
          propType: 'onClear',
          type: 'func',
          note: 'onClear function triggers, when the user clicks the clear button on search input',
        },
        {
          propType: 'onSearch',
          type: 'func',
          note: 'not specified',
        },
        {
          propType: 'searchOnEnter',
          type: 'bool',
          defaultValue: <code>false</code>,
          note:
            'Default behavior is to trigger onSearch as soon as the user types in the search field, if set to true, onSearch() will only be triggered when the user presses the Enter key',
        },
        {
          propType: 'searchPlaceholder',
          type: 'string',
          defaultValue: <code>'Search'</code>,
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
          note: `A list of available unselected nodes. This prop is not required,
          but an empty array is not allowed. At least one element is required in the array.`,
        },
        {
          propType: 'svgSymbolCancel',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
        },
        {
          propType: 'svgSymbolSearch',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
        },
        {
          propType: 'displayGroupHeader',
          type: 'bool',
          defaultValue: <code>true</code>,
          note: 'e.g: Default Group',
        },
        {
          propType: 'hideSearchOnRoot',
          type: 'bool',
          defaultValue: <code>false</code>,
        },
        {
          propType: 'selectedTopSearch',
          type: 'node',
          note:
            'A react node to be rendered at the top of the right hand side pane. Generally we are expecting a search component.',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <TreePickerExample />
  </Example>
);
