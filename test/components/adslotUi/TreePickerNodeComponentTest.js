/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import createComponent from 'helpers/shallowRenderHelper';
import Button from 'react-bootstrap/lib/Button';
import React from 'react';
import TreePickerNodeComponent from 'components/adslotUi/TreePickerNodeComponent';
import { GridCell, GridRow } from 'alexandria-adslot';
import { deepFreeze } from 'helpers/deepSetObjectMutability';

describe('TreePickerNodeComponent', () => {
  const indices = {
    buttonFirstCell: 0,
    labelWrapperCell: 1,
    expanderCell: 2,
    valueCell: 3,
    buttonLastCell: 4,
  };

  const newYorkNode = {
    id: '2',
    label: 'New York',
    type: 'City',
    value: 200,
    path: [{ id: '0', label: 'USA' }, { id: '1', label: 'NY' }],
    isExpandable: true,
  };

  deepFreeze([indices, newYorkNode]);

  it('should render a node with defaults', () => {
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode });
    expect(component.props.className).to.equal('treepickernode-component');
    expect(component.type).to.equal('div');

    const rowElement = component.props.children;

    expect(rowElement.type).to.equal((<GridRow />).type);

    const buttonFirstCellElement = rowElement.props.children[indices.buttonFirstCell];
    expect(buttonFirstCellElement).to.be.a('null');

    const labelWrapperCellElement = rowElement.props.children[indices.labelWrapperCell];
    expect(labelWrapperCellElement.props.children).to.have.length(2);

    const labelElement = labelWrapperCellElement.props.children[0];
    expect(labelElement.props.children).to.equal('New York');

    const metaDataElement = labelWrapperCellElement.props.children[1];
    expect(metaDataElement.props.className).to.equal('treepickernode-component-metadata');
    expect(metaDataElement.props.children).to.have.length(5);
    expect(metaDataElement.props.children[0]).to.equal(' (');
    expect(metaDataElement.props.children[1]).to.equal('City');
    expect(metaDataElement.props.children[2]).to.equal(' in ');
    const pathElement = metaDataElement.props.children[3];
    expect(pathElement.props.className).to.equal('treepickernode-component-path');
    expect(pathElement.props.children).to.equal('NY, USA');
    expect(metaDataElement.props.children[4]).to.equal(')');

    const expanderElementCell = rowElement.props.children[indices.expanderCell];
    expect(expanderElementCell).to.be.an('undefined');

    const valueCellElement = rowElement.props.children[indices.valueCell];

    expect(valueCellElement.type).to.equal((<GridCell/>).type);
    expect(valueCellElement.props.children).to.equal(200);

    const buttonLastCellElement = rowElement.props.children[indices.buttonLastCell];

    expect(buttonLastCellElement.type).to.equal((<GridCell/>).type);
    expect(buttonLastCellElement.props.classSuffixes).to.deep.equal(['button']);

    const buttonElement = buttonLastCellElement.props.children;

    expect(buttonElement.type).to.equal((<Button />).type);
    expect(buttonElement.props.onClick).to.be.a('function');
    expect(buttonElement.props.children).to.equal('Include');
  });

  it('should render the button first when selected is true', () => {
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode, selected: true });
    const rowElement = component.props.children;

    const buttonFirstCellElement = rowElement.props.children[indices.buttonFirstCell];

    expect(buttonFirstCellElement.type).to.equal((<GridCell/>).type);
    expect(buttonFirstCellElement.props.classSuffixes).to.deep.equal(['button']);
    const buttonElement = buttonFirstCellElement.props.children;

    expect(buttonElement.type).to.equal((<Button />).type);
    expect(buttonElement.props.onClick).to.be.a('function');
    expect(buttonElement.props.children).to.equal('Remove');

    const buttonLastCellElement = rowElement.props.children[indices.buttonLastCell];
    expect(buttonLastCellElement).to.be.a('null');
  });

  it('should filter value when provided', () => {
    const valueFormatter = (value) => `€${value / 100}`;
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode, valueFormatter });
    const rowElement = component.props.children;

    const valueCellElement = rowElement.props.children[indices.valueCell];

    expect(valueCellElement.type).to.equal((<GridCell/>).type);
    expect(valueCellElement.props.children).to.equal('€2');
  });

  it('should fire expandNode when clicking on the `expand` button', () => {
    const nodes = [];
    const expandNode = (node) => nodes.push(node);
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode, expandNode });

    const rowElement = component.props.children;
    const expanderCellElement = rowElement.props.children[indices.expanderCell];
    expect(expanderCellElement.type).to.equal((<GridCell />).type);
    const expanderElement = expanderCellElement.props.children;

    expect(expanderElement.props.className).to.equal('treepickernode-component-expander');
    expanderElement.props.onClick();
    expect(nodes).to.deep.equal([newYorkNode]);
  });

  it('should not show the expander element when the node is not expandable', () => {
    const nonExpandableNode = _.extend({}, newYorkNode, { isExpandable: false });
    const nodes = [];
    const expandNode = (node) => nodes.push(node);
    const component = createComponent(TreePickerNodeComponent, { node: nonExpandableNode, expandNode });

    const rowElement = component.props.children;
    const expanderElementCell = rowElement.props.children[indices.expanderCell];

    expect(expanderElementCell).to.be.an('undefined');
  });

  it('should fire includeNode when clicking on the `include` button', () => {
    const nodes = [];
    const includeNode = (node) => nodes.push(node);
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode, includeNode });
    const rowElement = component.props.children;

    const buttonLastCellElement = rowElement.props.children[indices.buttonLastCell];
    const buttonElement = buttonLastCellElement.props.children;
    buttonElement.props.onClick();
    expect(nodes).to.deep.equal([newYorkNode]);
  });

  it('should error on click of `include` button without includeNode handler', () => {
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode });
    const rowElement = component.props.children;

    const buttonLastCellElement = rowElement.props.children[indices.buttonLastCell];
    const buttonElement = buttonLastCellElement.props.children;
    expect(() => {
      buttonElement.props.onClick();
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
    const component = createComponent(TreePickerNodeComponent, { node });
    const rowElement = component.props.children;

    const labelWrapperCellElement = rowElement.props.children[indices.labelWrapperCell];
    expect(labelWrapperCellElement.props.children).to.have.length(2);

    const labelElement = labelWrapperCellElement.props.children[0];
    expect(labelElement.props.children).to.equal('Cameroon');

    const metaDataElement = labelWrapperCellElement.props.children[1];
    expect(metaDataElement).to.be.a('null');

    const valueCellElement = rowElement.props.children[indices.valueCell];

    expect(valueCellElement.type).to.equal((<GridCell/>).type);
    expect(valueCellElement.props.children).to.equal(400);
  });

  it('should render a provided node with an empty type', () => {
    const node = {
      id: '3',
      label: 'Toyota',
      type: '',
      value: 400,
      path: [{ id: '30', label: 'Cars' }],
    };
    const component = createComponent(TreePickerNodeComponent, { node });
    const rowElement = component.props.children;

    const labelWrapperCellElement = rowElement.props.children[indices.labelWrapperCell];
    expect(labelWrapperCellElement.props.children).to.have.length(2);

    const labelElement = labelWrapperCellElement.props.children[0];
    expect(labelElement.props.children).to.equal('Toyota');

    const metaDataElement = labelWrapperCellElement.props.children[1];
    expect(metaDataElement).to.be.a('null');

    const valueCellElement = rowElement.props.children[indices.valueCell];

    expect(valueCellElement.type).to.equal((<GridCell/>).type);
    expect(valueCellElement.props.children).to.equal(400);
  });

  it('should fire removeNode when clicking on the `remove` button', () => {
    const nodes = [newYorkNode];
    const removeNode = (node) => _.remove(nodes, { id: node.id });
    const component = createComponent(TreePickerNodeComponent, {
      node: newYorkNode,
      removeNode,
      selected: true,
    });
    const rowElement = component.props.children;

    const buttonFirstCellElement = rowElement.props.children[indices.buttonFirstCell];
    const buttonElement = buttonFirstCellElement.props.children;
    expect(buttonElement.props.children).to.equal('Remove');

    expect(nodes).to.deep.equal([newYorkNode]);
    buttonElement.props.onClick();
    expect(nodes).to.deep.equal([]);
  });

  it('should error on click of `remove` button without removeNode handler', () => {
    const component = createComponent(TreePickerNodeComponent, { node: newYorkNode, selected: true });
    const rowElement = component.props.children;

    const buttonFirstCellElement = rowElement.props.children[indices.buttonFirstCell];
    const buttonElement = buttonFirstCellElement.props.children;
    expect(buttonElement.props.children).to.equal('Remove');
    expect(() => {
      buttonElement.props.onClick();
    }).to.throw('AdslotUi TreePickerNode needs a removeNode handler');
  });
});
