import _ from 'lodash';
import React from 'react';
import TreePickerGrid from 'components/adslotUi/TreePickerGridComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';
import { Empty, Grid } from 'alexandria-adslot';
import { shallow } from 'enzyme';

describe('TreePickerGridComponent', () => {
  it('should render with props', () => {
    const props = {
      emptySvgSymbol: TreePickerMocks.svgSymbol,
      emptyText: 'Empty!',
      expandNode: _.noop,
      includeNode: _.noop,
      nodes: [TreePickerMocks.qldNode, TreePickerMocks.saNode],
      removeNode: _.noop,
      selected: false,
      valueFormatter: TreePickerMocks.valueFormatter,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    expect(gridElement).to.have.length(1);

    expect(gridElement.children()).to.have.length(3); // Two nodes and an Empty.
    _.forEach(props.nodes, (node, index) => {
      const nodeElement = gridElement.childAt(index);
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
      emptySvgSymbol: TreePickerMocks.svgSymbol,
      emptyText: 'Empty!',
      expandNode: _.noop,
      includeNode: _.noop,
      nodes: undefined,
      removeNode: _.noop,
      selected: false,
      valueFormatter: TreePickerMocks.valueFormatter,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    const emptyElement = gridElement.find(Empty);

    expect(emptyElement).to.have.length(0);
  });
});
