import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import _ from 'lodash';

import TreePicker from './index';
import SvgSymbol from '../SvgSymbol';
import Search from '../Search';

const meta = {
  title: 'Pending Review/TreePicker',
  component: TreePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof TreePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [selectedSearchValue, setSelectedSearchValue] = React.useState('');
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  const [pickerSearchValue, setPickerSearchValue] = React.useState('');
  const subTree = [
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
  ];

  const getSelectedNodes = () => {
    if (_.isEmpty(selectedSearchValue)) return selectedNodes;

    return _.filter(selectedNodes, ({ label }) => _.includes(label.toLowerCase(), selectedSearchValue.toLowerCase()));
  };

  const getSubtree = () => {
    let treePickerPureSubtree = [];

    // filter out nodes that do not contain search string
    if (!_.isEmpty(pickerSearchValue)) {
      treePickerPureSubtree = _.filter(subTree, ({ label }) =>
        _.includes(label.toLowerCase(), pickerSearchValue.toLowerCase())
      );
    }

    // filter out nodes that do not contain the selected search string
    // however keep the nodes that are not selected but do not contain the selected search string
    if (!_.isEmpty(selectedSearchValue)) {
      treePickerPureSubtree = _.filter(treePickerPureSubtree, ({ id, label }) => {
        if (_.find(selectedNodes, { id })) {
          return _.includes(label.toLowerCase(), selectedSearchValue.toLowerCase());
        }

        return true;
      });
    }

    return treePickerPureSubtree;
  };

  return (
    <div style={{ width: 900 }}>
      <TreePicker
        itemType={'segment value'}
        hideIcon
        selectedNodes={getSelectedNodes()}
        subtree={getSubtree()}
        emptySvgSymbol={
          <SvgSymbol classSuffixes={['gray-darker', '70']} href="/svg-symbols.svg#checklist-incomplete" isCircle />
        }
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
        searchValue={pickerSearchValue}
        onChange={setPickerSearchValue}
        searchOnClear={() => setPickerSearchValue('')}
        includeNode={(node) => setSelectedNodes(_.concat([], selectedNodes, node))}
        removeNode={(node) => setSelectedNodes(_.reject(selectedNodes, { id: node.id }))}
        additionalClassNames={pickerSearchValue ? undefined : ['background-highlighted', 'test-class']}
        selectedTopSearch={
          <div className="selected-search">
            <Search onSearch={setSelectedSearchValue} />
          </div>
        }
      />
    </div>
  );
};

export const Default: Story = {
  args: {},
  render: () => DefaultComponent(),
};
