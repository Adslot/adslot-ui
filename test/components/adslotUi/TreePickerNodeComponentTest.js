import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import React from 'react';
import TreePickerMocks from 'mocks/TreePickerMocks';
import TreePickerNodeComponent from 'components/adslotUi/TreePickerNodeComponent';
import { GridCell, GridRow } from 'alexandria-adslot';
import { shallow, mount } from 'enzyme';

describe('TreePickerNodeComponent', () => {
  const { cbrNode, actNode } = TreePickerMocks;

  it('should render a node with defaults', () => {
    const component = shallow(<TreePickerNodeComponent node={cbrNode} />);
    expect(component.prop('className')).to.equal('treepickernode-component');
    expect(component.type()).to.equal('div');

    const rowElement = component.find(GridRow);
    expect(rowElement.parent().prop('data-test-selector')).to.equal('treepicker-grid-row');
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell
    expect(component.find(Button)).to.have.length(1);

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.children()).to.have.length(2);

    const labelElement = labelWrapperCellElement.children().first();
    expect(labelElement.text()).to.equal('Canberra');

    const metaDataElement = component.find('.treepickernode-component-metadata');
    expect(metaDataElement).to.have.length(1);
    expect(metaDataElement.children()).to.have.length(5);
    expect(metaDataElement.children().at(0).text()).to.equal(' (');
    expect(metaDataElement.children().at(1).text()).to.equal('City');
    expect(metaDataElement.children().at(2).text()).to.equal(' in ');

    const pathElement = metaDataElement.children().at(3);
    expect(pathElement.prop('className')).to.equal('treepickernode-component-path');
    expect(pathElement.children().text()).to.equal('ACT, AU');
    expect(metaDataElement.children().at(4).text()).to.equal(')');

    const valueCellElement = cellElements.at(1);
    expect(valueCellElement.children().text()).to.equal('2000');

    const buttonLastCellElement = cellElements.last();
    expect(buttonLastCellElement.prop('classSuffixes')).to.deep.equal(['button']);

    const buttonElement = buttonLastCellElement.find(Button);
    expect(buttonElement.prop('onClick')).to.be.a('function');
    expect(buttonElement.prop('disabled')).to.equal(false);
    expect(buttonElement.children().text()).to.equal('+');
  });

  it('should render unselectable nodes with an include button', () => {
    const component = shallow(<TreePickerNodeComponent node={actNode} />);

    const rowElement = component.find(GridRow);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell and value cell
    expect(component.find(Button)).to.have.length(1);
  });

  it('should render the button first when selected is true', () => {
    const component = shallow(<TreePickerNodeComponent node={cbrNode} selected />);

    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // remove button cell, meta data cell and value cell
    expect(component.find(Button)).to.have.length(1);

    const buttonFirstCellElement = cellElements.first();
    expect(buttonFirstCellElement.prop('classSuffixes')).to.deep.equal(['button']);

    const buttonElement = buttonFirstCellElement.find(Button);
    expect(buttonElement.prop('onClick')).to.be.a('function');
    expect(buttonElement.children().text()).to.equal('−');
  });

  it('should render button as disabled when disabled is true', () => {
    let fireCount = 0;
    const testFunction = () => { fireCount += 1; };

    const component = mount(<TreePickerNodeComponent node={cbrNode} removeNode={testFunction} selected disabled />);
    const buttonElement = component.find(Button);
    expect(buttonElement.prop('disabled')).to.equal(true);
    buttonElement.simulate('click');
    expect(fireCount).to.equal(0);
  });

  it('should filter value when provided', () => {
    const valueFormatter = (value) => `€${value / 100}`;
    const component = shallow(<TreePickerNodeComponent node={cbrNode} valueFormatter={valueFormatter} />);

    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const valueCellElement = rowElement.prop('children')[3];
    expect(valueCellElement.props.children).to.equal('€20');
  });

  it('should hide value when no value Number', () => {
    const node = _.clone(cbrNode);
    delete node.value;
    const component = shallow(<TreePickerNodeComponent {...{ node }} />);

    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    expect(rowElement.prop('children')).to.have.length(5);
    const valueCellElement = rowElement.prop('children')[3];
    expect(valueCellElement).to.be.a('null');
  });

  it('should fire expandNode when clicking on the `expand` cell', () => {
    const nodes = [];
    const expandNode = (node) => nodes.push(node);
    const component = shallow(<TreePickerNodeComponent node={cbrNode} expandNode={expandNode} />);

    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(4); // meta data cell, expander cell, value cell and include button cell

    const expanderCellElement = cellElements.at(1);
    const expanderElement = expanderCellElement.find(GridCell);
    expect(expanderElement.children().prop('className')).to.equal('treepickernode-component-expander');
    expanderCellElement.simulate('click');
    expect(nodes).to.deep.equal([cbrNode]);
  });

  it('should fire expandNode when clicking on the label cell', () => {
    const nodes = [];
    const expandNode = (node) => nodes.push(node);
    const component = shallow(<TreePickerNodeComponent node={cbrNode} expandNode={expandNode} />);

    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(4); // meta data cell, expander cell, value cell and include button cell

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.prop('stretch')).to.equal(true);
    labelWrapperCellElement.simulate('click');
    expect(nodes).to.deep.equal([cbrNode]);
  });

  it('should not show the expander element when the node is not expandable', () => {
    const nonExpandableNode = _.defaults({ isExpandable: false }, cbrNode);
    const nodes = [];
    const expandNode = (node) => nodes.push(node);
    const component = shallow(<TreePickerNodeComponent node={nonExpandableNode} expandNode={expandNode} />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell
  });

  it('should fire includeNode when clicking on the `include` button', () => {
    const nodes = [];
    const includeNode = (node) => nodes.push(node);
    const component = shallow(<TreePickerNodeComponent node={cbrNode} includeNode={includeNode} />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell

    const buttonLastCellElement = cellElements.last();
    const buttonElement = buttonLastCellElement.find(Button);
    buttonElement.simulate('click');
    expect(nodes).to.deep.equal([cbrNode]);
  });

  it('should error on click of `include` button without includeNode handler', () => {
    const component = shallow(<TreePickerNodeComponent node={cbrNode} />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
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
    const component = shallow(<TreePickerNodeComponent node={node} />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
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
    const component = shallow(<TreePickerNodeComponent node={node} />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // meta data cell, value cell and include button cell

    const labelWrapperCellElement = cellElements.first();
    expect(labelWrapperCellElement.children()).to.have.length(1);

    const labelElement = labelWrapperCellElement.children().first();
    expect(labelElement.text()).to.equal('Toyota');

    const metaDataElement = component.find('.treepickernode-component-metadata');
    expect(metaDataElement).to.have.length(0);

    const valueCellElement = cellElements.at(1);
    expect(valueCellElement.children().text()).to.equal('400');
  });

  it('should fire removeNode when clicking on the `remove` button', () => {
    const nodes = [cbrNode];
    const removeNode = (node) => _.remove(nodes, { id: node.id });
    const props = { node: cbrNode, removeNode, selected: true };
    const component = shallow(<TreePickerNodeComponent {...props} />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
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
    const component = shallow(<TreePickerNodeComponent node={cbrNode} selected />);
    const rowElement = component.find('[data-test-selector="treepicker-grid-row"]').childAt(0);
    const cellElements = rowElement.find(GridCell);
    expect(cellElements).to.have.length(3); // remove button cell, meta data cell and value cell

    const buttonLastCellElement = cellElements.first();
    const buttonElement = buttonLastCellElement.find(Button);
    expect(() => {
      buttonElement.simulate('click');
    }).to.throw('AdslotUi TreePickerNode needs a removeNode handler');
  });
});
