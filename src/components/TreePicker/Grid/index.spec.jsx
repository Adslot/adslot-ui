import _ from 'lodash';
import { Empty, Grid, Spinner } from 'adslot-ui';
import { shallow } from 'enzyme';
import React from 'react';
import TreePickerGrid from '.';
import TreePickerNode from '../Node';
import TreePickerMocks from '../mocks';

describe('TreePickerGridComponent', () => {
  const { itemType, qldNode, saNode, nodeRenderer, valueFormatter } = TreePickerMocks;
  const svgSymbol = <div />;

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
      displayGroupHeader: true,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    expect(gridElement).to.have.length(1);
    expect(gridElement.children()).to.have.length(2); // Group node and an Empty.

    const groupElement = gridElement.find('.treepickergrid-component-group');
    expect(groupElement).to.have.length(1);
    expect(groupElement.children()).to.have.length(3); // Group label and two nodes

    _.forEach(props.nodes, (node, index) => {
      const nodeElement = groupElement.childAt(index + 1); // since index = 0 is the group label
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

  describe('should render with groups', () => {
    let props = {};

    beforeEach(() => {
      props = {
        emptySvgSymbol: svgSymbol,
        emptyText: 'Empty!',
        expandNode: _.noop,
        groupFormatter: node => node.id,
        includeNode: _.noop,
        itemType,
        nodes: [qldNode, saNode],
        nodeRenderer,
        removeNode: _.noop,
        selected: false,
        valueFormatter,
      };
    });

    it('should render with groups by default', () => {
      const component = shallow(<TreePickerGrid {...props} />);
      const gridElement = component.find(Grid);
      expect(gridElement).to.have.length(1);
      expect(gridElement.children()).to.have.length(3); // Two group node and an Empty.

      const groupElements = gridElement.find('.treepickergrid-component-group');
      expect(groupElements).to.have.length(2);

      _.forEach(props.nodes, (node, index) => {
        const groupElement = groupElements.at(index);
        const labelElement = groupElement.find('.treepickergrid-component-group-label');
        expect(
          labelElement
            .children()
            .children()
            .text()
        ).to.equal(node.id);

        const nodeElement = groupElement.find(TreePickerNode);
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

    it('should render with no group header when displayGroupHeader is false', () => {
      props = _.assign({}, props, {
        nodes: [qldNode],
        displayGroupHeader: false,
      });
      const component = shallow(<TreePickerGrid {...props} />);
      const gridElement = component.find(Grid);
      expect(gridElement).to.have.length(1);
      expect(gridElement.children()).to.have.length(2); // One group node and an Empty.
      const groupElement = gridElement.find('.treepickergrid-component-group');
      expect(groupElement).to.have.length(1);
      expect(groupElement.children()).to.have.length(1);
    });
  });

  it('should display empty when there is no valid group', () => {
    const props = {
      emptySvgSymbol: svgSymbol,
      emptyText: 'Empty!',
      expandNode: _.noop,
      groupFormatter: node => node.randomAttr,
      includeNode: _.noop,
      itemType,
      nodes: [qldNode],
      nodeRenderer,
      removeNode: _.noop,
      selected: false,
      valueFormatter,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    const gridElement = component.find(Grid);
    const emptyElement = gridElement.find(Empty);

    expect(emptyElement).to.have.length(1);
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

  it('should display a loading state instead of empty state when isLoading is set to true', () => {
    const props = {
      selected: false,
      itemType: 'test',
      emptyText: 'nothing here',
      isLoading: true,
    };
    const component = shallow(<TreePickerGrid {...props} />);
    expect(component.find(Spinner)).to.have.length(1);
  });

  it('should display a loading state instead of nodes when isLoading is set to true', () => {
    const props = {
      selected: false,
      itemType: 'test',
      emptyText: 'nothing here',
      nodes: [qldNode],
    };

    const component = shallow(<TreePickerGrid {...props} isLoading />);
    expect(component.find(Spinner)).to.have.length(1);
  });
});
