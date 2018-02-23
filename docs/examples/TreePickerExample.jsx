import React from 'react';
import Example from '../components/Example';
import _ from 'lodash';
import { TreePickerSimplePure } from '../../src';

class TreePickerExample extends React.Component {
  constructor() {
    super();
    this.state = {
      itemType: 'segment value',
      treePickerPureSubtree: [],
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
    this.setPickerSearchValue = this.setPickerSearchValue.bind(this);
  }

  setPickerSearchValue(newValue) {
    this.setState({ pickerSearchValue: newValue });
    this.setState({
      treePickerPureSubtree: _.filter(this.state.subTree, ({ label }) => {
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
        selectedNodes={this.state.selectedNodes}
        subtree={this.state.treePickerPureSubtree}
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
      defaultValue: <pre>0</pre>,
      note: 'Interval time on search',
    },
    {
      propType: 'disabled',
      type: 'bool',
      defaultValue: <pre>false</pre>,
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
          shapeOf <a href="#svg-symbol-example">SVG Symbol</a> prop types.
        </span>
      ),
      note: `displays this svg symbol when there will be no item on both left or right Grid`,
    },
    {
      propType: 'emptySelectedListSvgSymbol',
      type: (
        <span>
          shapeOf <a href="#svg-symbol-example">SVG Symbol</a> prop types.
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
          shapeOf <a href="#svg-symbol-example">SVG Symbol</a> prop types.
        </span>
      ),
      note: 'same as emptySymbol',
    },
    {
      propType: 'itemType',
      type: 'string',
      defaultValue: <pre>'node'</pre>,
      note: 'uses for specific className',
    },
    {
      propType: 'isLoading',
      type: 'bool',
      defaultValue: <pre>false</pre>,
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
      propType: 'searchOnChange',
      type: 'bool',
      defaultValue: <pre>true</pre>,
      note: 'When true, search is triggered as soon as the user types in the search field',
    },
    {
      propType: 'searchOnEnterKey',
      type: 'bool',
      defaultValue: <pre>false</pre>,
      note: 'When true, triggers search when the user presses the Enter key',
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
      note: `A list of available unselected nodes. This prop is not required,
        but an empty array is not allowed. At least one element is required in the array.`,
    },
    {
      propType: 'svgSymbolCancel',
      type: (
        <span>
          shapeOf <a href="#svg-symbol-example">SVG Symbol</a> prop types.
        </span>
      ),
    },
    {
      propType: 'svgSymbolSearch',
      type: (
        <span>
          shapeOf <a href="#svg-symbol-example">SVG Symbol</a> prop types.
        </span>
      ),
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
      defaultValue: <pre>false</pre>,
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <TreePickerExample />
  </Example>
);
