import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Button from 'react-bootstrap/lib/Button';
import TreePickerNode from 'components/adslotUi/TreePicker/TreePickerNodeComponent';
import TreePickerNodeExpander from 'components/adslotUi/TreePicker/TreePickerNodeExpanderComponent';
import GridRow from 'components/alexandria/GridRowComponent';
import GridCell from 'components/alexandria/GridCellComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';

describe('TreePickerNodeComponent', () => {
  const { cbrNode, cbrNodeAlreadySelected, actNode, maleNode, itemType, nodeRenderer } = TreePickerMocks;

  it('should render a node with defaults', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNode} />);
    expect(component.prop('className')).to.equal('treepickernode-component child-node');
    expect(component.type()).to.equal('div');

    const rowElement = component.find(GridRow);
    expect(rowElement.prop('dts')).to.equal(`${_.kebabCase(itemType)}-${cbrNode.id}`);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell
    expect(component.find(Button)).to.have.length(1);

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.children()).to.have.length(2);

    const labelElement = labelWrapperCellElement.children().first();
    expect(labelElement.text()).to.equal('Canberra');

    const metaDataElement = component.find('.treepickernode-component-metadata');
    expect(metaDataElement).to.have.length(1);
    expect(metaDataElement.children()).to.have.length(4);
    expect(metaDataElement.children().at(0).text()).to.equal(' (');
    expect(metaDataElement.children().at(1).text()).to.equal('City in ');

    const pathElement = metaDataElement.children().at(2);
    expect(pathElement.prop('className')).to.equal('treepickernode-component-path');
    expect(pathElement.children().text()).to.equal('ACT, AU');
    expect(metaDataElement.children().at(3).text()).to.equal(')');

    const valueCellElement = cellElements.at(1);
    expect(valueCellElement.children().text()).to.equal('2000');

    const buttonLastCellElement = cellElements.last();
    expect(buttonLastCellElement.prop('classSuffixes')).to.deep.equal(['button']);

    const buttonElement = buttonLastCellElement.find(Button);
    expect(buttonElement.prop('onClick')).to.be.a('function');
    expect(buttonElement.prop('disabled')).to.equal(false);
    expect(buttonElement.children().text()).to.equal('+');
  });

  it('should render metadata of nodes already selected containing ancestory data', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNodeAlreadySelected} />);

    const metaDataElement = component.find('.treepickernode-component-metadata');
    expect(metaDataElement).to.have.length(1);

    expect(metaDataElement.children()).to.have.length(4);
    expect(metaDataElement.children().at(0).text()).to.equal(' (');
    expect(metaDataElement.children().at(1).text()).to.equal('City in ');

    const pathElement = metaDataElement.children().at(2);
    expect(pathElement.prop('className')).to.equal('treepickernode-component-path');
    expect(pathElement.children().text()).to.equal('ACT, AU');
    expect(metaDataElement.children().at(3).text()).to.equal(')');
  });

  it('should render node via nodeRenderer', () => {
    const component = shallow(<TreePickerNode
      itemType={itemType}
      node={actNode}
      nodeRenderer={nodeRenderer}
    />);

    const rowElement = component.find(GridRow);
    const cellElements = rowElement.find(GridCell);
    const labelWrapperCellElement = cellElements.first();
    const labelElement = labelWrapperCellElement.children().first();
    expect(labelElement.text()).to.equal('Test value: Australian Capital Territory');
  });

  it('should render unselectable nodes with an include button', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={actNode} />);

    const rowElement = component.find(GridRow);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell and value cell
    expect(component.find(Button)).to.have.length(1);
  });

  it('should render the button first when selected is true', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNode} selected />);

    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // remove button cell, meta data cell and value cell
    expect(component.find(Button)).to.have.length(1);

    const buttonFirstCellElement = cellElements.first();
    expect(buttonFirstCellElement.prop('classSuffixes')).to.deep.equal(['button']);
    expect(buttonFirstCellElement.prop('dts')).to.deep.equal('button-remove');

    const buttonElement = buttonFirstCellElement.find(Button);
    expect(buttonElement.prop('onClick')).to.be.a('function');
    expect(buttonElement.children().text()).to.equal('−');
  });

  it('should render button as disabled when disabled is true', () => {
    let fireCount = 0;
    const testFunction = () => { fireCount += 1; };

    const component = mount(<TreePickerNode
      itemType={itemType} node={cbrNode} removeNode={testFunction} selected disabled
    />);
    const buttonElement = component.find(Button);
    expect(buttonElement.prop('disabled')).to.equal(true);
    buttonElement.simulate('click');
    expect(fireCount).to.equal(0);
  });

  it('should filter value when provided', () => {
    const valueFormatter = (value) => `€${value / 100}`;
    const component = shallow(<TreePickerNode
      itemType={itemType} node={cbrNode} valueFormatter={valueFormatter}
    />);

    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const valueCellElement = rowElement.prop('children')[3];
    expect(valueCellElement.props.children).to.equal('€20');
  });

  it('should hide value when no value Number', () => {
    const node = _.clone(cbrNode);
    delete node.value;
    const props = { itemType, node };
    const component = shallow(<TreePickerNode {...props} />);

    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    expect(rowElement.prop('children')).to.have.length(5);
    const valueCellElement = rowElement.prop('children')[3];
    expect(valueCellElement).to.be.a('null');
  });

  it('should not have the child node class for root nodes', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={maleNode} />);
    expect(component.prop('className')).to.equal('treepickernode-component');
  });

  it('should have the child node class for child nodes', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNode} />);
    expect(component.prop('className')).to.equal('treepickernode-component child-node');
  });

  it('should fire expandNode when clicking on the label cell', (done) => {
    const props = {
      expandNode: (node) => {
        expect(node).to.deep.equal(cbrNode);
        done();
      },

      node: cbrNode,
      itemType,
    };

    const component = shallow(<TreePickerNode {...props} />);

    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell
    expect(rowElement.find(TreePickerNodeExpander)).to.have.length(1);

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.prop('stretch')).to.equal(true);
    labelWrapperCellElement.simulate('click');
  });

  it('should not show the expander element when the node is not expandable', () => {
    const props = {
      expandNode: sinon.spy(),
      node: _.defaults({ isExpandable: false }, cbrNode),
      itemType,
    };

    const component = shallow(<TreePickerNode {...props} />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell
    expect(rowElement.find(TreePickerNodeExpander)).to.have.length(0);
    const labelWrapperCellElement = cellElements.first();
    labelWrapperCellElement.simulate('click');
    expect(props.expandNode.callCount).to.eql(0);
  });

  it('should fire includeNode when clicking on the `include` button', () => {
    const nodes = [];
    const includeNode = (node) => nodes.push(node);
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNode} includeNode={includeNode} />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell

    const buttonLastCellElement = cellElements.last();
    const buttonElement = buttonLastCellElement.find(Button);
    buttonElement.simulate('click');
    expect(nodes).to.deep.equal([cbrNode]);
  });

  it('should error on click of `include` button without includeNode handler', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNode} />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell

    const buttonLastCellElement = cellElements.last();
    const buttonElement = buttonLastCellElement.find(Button);
    expect(() => {
      buttonElement.simulate('click');
    }).to.throw('AdslotUi TreePickerNode needs an includeNode handler');
  });

  it('should render a provided node with an empty breadcrumb array', () => {
    const node = {
      id: '3',
      label: 'Cameroon',
      type: 'Country',
      value: 400,
      path: [],
    };
    const component = shallow(<TreePickerNode itemType={itemType} node={node} />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${node.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.children()).to.have.length(1);

    const labelElement = labelWrapperCellElement.children().first();
    expect(labelElement.text()).to.equal('Cameroon');

    const metaDataElement = component.find('.treepickernode-component-metadata');
    expect(metaDataElement).to.have.length(0);

    const valueCellElement = cellElements.at(1);
    expect(valueCellElement.children().text()).to.equal('400');
  });

  it('should render a provided node with an empty type', () => {
    const node = {
      id: '3',
      label: 'Toyota',
      type: '',
      value: 400,
      path: [{ id: '30', label: 'Cars' }],
    };
    const component = shallow(<TreePickerNode itemType={itemType} node={node} />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${node.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.children()).to.have.length(2);

    const labelElement = labelWrapperCellElement.children().first();
    expect(labelElement.text()).to.equal('Toyota');

    const metaDataElement = component.find('.treepickernode-component-metadata');
    expect(metaDataElement).to.have.length(1);
    expect(metaDataElement.children()).to.have.length(3);
    expect(metaDataElement.children().at(0).text()).to.equal(' (');
    expect(metaDataElement.children().at(1).text()).to.equal('Cars');
    expect(metaDataElement.children().at(2).text()).to.equal(')');

    const valueCellElement = cellElements.at(1);
    expect(valueCellElement.children().text()).to.equal('400');
  });

  it('should fire removeNode when clicking on the `remove` button', () => {
    const nodes = [cbrNode];
    const removeNode = (node) => _.remove(nodes, { id: node.id });
    const props = { itemType, node: cbrNode, removeNode, selected: true };
    const component = shallow(<TreePickerNode {...props} />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // remove button cell, meta data cell and value cell

    const buttonLastCellElement = cellElements.first();
    const buttonElement = buttonLastCellElement.find(Button);
    expect(buttonElement.children().text()).to.equal('−');
    expect(nodes).to.deep.equal([cbrNode]);
    buttonElement.simulate('click');
    expect(nodes).to.deep.equal([]);
  });

  it('should error on click of `remove` button without removeNode handler', () => {
    const component = shallow(<TreePickerNode itemType={itemType} node={cbrNode} selected />);
    const rowElement = component.find({ dts: `${_.kebabCase(itemType)}-${cbrNode.id}` });
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // remove button cell, meta data cell and value cell

    const buttonLastCellElement = cellElements.first();
    const buttonElement = buttonLastCellElement.find(Button);
    expect(() => {
      buttonElement.simulate('click');
    }).to.throw('AdslotUi TreePickerNode needs a removeNode handler');
  });

  it('should accept both strings and numbers as node ids', () => {
    const stringIdNode = shallow(<TreePickerNode itemType={itemType} node={cbrNode} selected />);
    const numberIdNode = shallow(<TreePickerNode itemType={itemType} node={maleNode} />);

    expect(cbrNode.id).to.equal('au-act-cbr');
    expect(maleNode.id).to.equal(4);
    expect(stringIdNode.find(GridRow).prop('dts')).to.equal('example-item-type-au-act-cbr');
    expect(numberIdNode.find(GridRow).prop('dts')).to.equal('example-item-type-4');
  });
});
