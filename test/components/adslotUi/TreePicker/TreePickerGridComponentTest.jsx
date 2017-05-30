import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import TreePickerGrid, { TreePickerNodeFast } from 'components/adslotUi/TreePicker/TreePickerGridComponent';
import Empty from 'components/alexandria/Empty';
import Grid from 'components/alexandria/Grid';
import TreePickerMocks from 'mocks/TreePickerMocks';

describe('TreePickerGridComponent', () => {
  const {
    itemType,
    qldNode,
    saNode,
    svgSymbol,
    nodeRenderer,
    valueFormatter,
  } = TreePickerMocks;

  it('should render with props', () => {
    const props = {
      emptySvgSymbol: svgSymbol,
      emptyText: 'Empty!',
      expandNode: _.noop,
      includeNode: _.noop,
      itemType,
      nodes: [qldNode, saNode],
      nodeRenderer,
      removeNode: _.noop,
      selected: false,
      valueFormatter,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    expect(gridElement).to.have.length(1);
    expect(gridElement.children()).to.have.length(2); // Group node and an Empty.

    const groupElement = gridElement.find('.treepickergrid-component-group');
    expect(groupElement).to.have.length(1);
    expect(groupElement.children()).to.have.length(2); // Two nodes

    _.forEach(props.nodes, (node, index) => {
      const nodeElement = groupElement.childAt(index);
      expect(nodeElement.prop('expandNode')).to.equal(props.expandNode);
      expect(nodeElement.prop('includeNode')).to.equal(props.includeNode);
      expect(nodeElement.prop('removeNode')).to.equal(props.removeNode);
      expect(nodeElement.prop('node')).to.equal(node);
    });

    const emptyElement = gridElement.find(Empty);
    expect(emptyElement).to.have.length(1);
    expect(emptyElement.prop('collection')).to.equal(props.nodes);
    expect(emptyElement.prop('svgSymbol')).to.equal(props.emptySvgSymbol);
    expect(emptyElement.prop('text')).to.equal(props.emptyText);
  });

  it('should render with groups', () => {
    const props = {
      emptySvgSymbol: svgSymbol,
      emptyText: 'Empty!',
      expandNode: _.noop,
      groupFormatter: (node) => node.id,
      includeNode: _.noop,
      itemType,
      nodes: [qldNode, saNode],
      nodeRenderer,
      removeNode: _.noop,
      selected: false,
      valueFormatter,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    expect(gridElement).to.have.length(1);
    expect(gridElement.children()).to.have.length(3); // Two group node and an Empty.

    const groupElements = gridElement.find('.treepickergrid-component-group');
    expect(groupElements).to.have.length(2);

    _.forEach(props.nodes, (node, index) => {
      const groupElement = groupElements.at(index);
      const labelElement = groupElement.find('.treepickergrid-component-group-label');
      expect(labelElement.children().children().text()).to.equal(node.id);

      const nodeElement = groupElement.find(TreePickerNodeFast);
      expect(nodeElement.prop('expandNode')).to.equal(props.expandNode);
      expect(nodeElement.prop('includeNode')).to.equal(props.includeNode);
      expect(nodeElement.prop('removeNode')).to.equal(props.removeNode);
      expect(nodeElement.prop('node')).to.equal(node);
    });

    const emptyElement = gridElement.find(Empty);
    expect(emptyElement).to.have.length(1);
    expect(emptyElement.prop('collection')).to.equal(props.nodes);
    expect(emptyElement.prop('svgSymbol')).to.equal(props.emptySvgSymbol);
    expect(emptyElement.prop('text')).to.equal(props.emptyText);
  });

  it('should not display empty with an undefined nodes list', () => {
    const props = {
      emptySvgSymbol: svgSymbol,
      emptyText: 'Empty!',
      expandNode: _.noop,
      includeNode: _.noop,
      itemType,
      nodes: undefined,
      removeNode: _.noop,
      selected: false,
      valueFormatter,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    const emptyElement = gridElement.find(Empty);

    expect(emptyElement).to.have.length(0);
  });
});
