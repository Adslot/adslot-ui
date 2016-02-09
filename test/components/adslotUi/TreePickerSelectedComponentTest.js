/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import createComponent from 'helpers/shallowRenderHelper';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import React from 'react';
import TreePickerSelected from 'components/adslotUi/TreePickerSelectedComponent';
import { Alert, Empty, FlexSpacer, Grid, GridCell, GridRow, Totals } from 'alexandria-adslot';
import { deepFreeze } from 'helpers/deepSetObjectMutability';

describe('TreePickerSelectedComponent', () => {
  const indices = {
    header: 0,
    baseItemGrid: 1,
    scrollable: 2,
    alert: 3,
    totals: 4,
  };

  const gridIndices = {
    headerRow: 0,
    nodes: 1,
    subFooterRow: 2,
  };

  const scrollableIndices = {
    grids: 0,
    empty: 1,
    flexSpacer: 2,
  };

  const rootTypes = [
    {
      label: 'Geography',
      id: '0',
      icon: 'http://placehold.it/16x16',
      emptyIcon: 'http://placehold.it/70x70',
      isRequired: true,
    },
    { label: 'Audiences', id: '1', icon: 'http://placehold.it/16x16', isRequired: false },
    { label: 'Segments', id: '2', icon: 'http://placehold.it/16x16', isRequired: true },
  ];

  const actNode =
    { id: '0', label: 'Australian Capital Territory', type: 'State', path: ['AU'], value: 1000, rootTypeId: '0' };

  const ntNode =
    { id: '1', label: 'Northern Territory', type: 'State', path: ['AU'], value: 500, rootTypeId: '0' };

  const selectedNodesByRootType = _.groupBy([actNode, ntNode], 'rootTypeId');

  const checkHeader = (component, props = {}) => {
    const headerElement = component.props.children[indices.header];
    expect(headerElement.type).to.equal('h1');
    expect(headerElement.props.className).to.equal('treepickerselected-component-header');
    expect(headerElement.props.children).to.equal(props.selectedLabel || 'Selected');

    const baseItemGridElement = component.props.children[indices.baseItemGrid];
    expect(baseItemGridElement.type).to.equal((<Grid />).type);

    const gridRowElement = baseItemGridElement.props.children;
    expect(gridRowElement.type).to.equal((<GridRow />).type);

    const firstGridCellElement = gridRowElement.props.children[0];
    expect(firstGridCellElement.type).to.equal((<GridCell />).type);
    expect(firstGridCellElement.props.stretch).to.equal(true);
    expect(firstGridCellElement.props.children).to.equal('Base');

    const secondGridCellElement = gridRowElement.props.children[1];
    expect(secondGridCellElement.type).to.equal((<GridCell />).type);
    expect(secondGridCellElement.props.children).to.equal(0);
  };

  deepFreeze([indices, gridIndices, scrollableIndices, rootTypes, actNode, ntNode, selectedNodesByRootType]);

  it('should render with defaults', () => {
    const component = createComponent(TreePickerSelected);
    expect(component.props.className).to.equal('treepickerselected-component');

    checkHeader(component);

    const scrollableElement = component.props.children[indices.scrollable];
    expect(scrollableElement.props.className).to.equal('treepickerselected-component-scrollable');

    const gridElements = scrollableElement.props.children[scrollableIndices.grids];
    expect(gridElements).to.have.length(0);

    const emptyElement = scrollableElement.props.children[scrollableIndices.empty];

    expect(emptyElement.type).to.equal((<Empty />).type);
    expect(emptyElement.props.collection).to.have.length(0);
    expect(emptyElement.props.icon).to.equal('//placehold.it/70x70');
    expect(emptyElement.props.text).to.equal('Nothing Selected');
    const flexSpacerElement = scrollableElement.props.children[scrollableIndices.flexSpacer];
    expect(flexSpacerElement.type).to.equal((<FlexSpacer />).type);

    const alertElement = component.props.children[indices.alert];
    expect(alertElement).to.be.a('null');

    const totalsElement = component.props.children[indices.totals];
    expect(totalsElement.type).to.equal((<Totals />).type);
    expect(totalsElement.props.toSum).to.deep.equal([
      { value: 0, isHidden: true },
      { label: 'Selected', value: 0 },
    ]);
    expect(totalsElement.props.valueFormatter).to.be.a('function');
  });

  it('should render with props', () => {
    const component = createComponent(TreePickerSelected, {
      averageWithinRootType: true,
      emptyIcon: 'awesome-url',
      selectedLabel: 'Selected Targeting',
      rootTypes,
      selectedNodesByRootType,
      valueLabel: 'Galactic Credits',
    });
    expect(component.props.className).to.equal('treepickerselected-component');

    checkHeader(component, { selectedLabel: 'Selected Targeting' });

    const totalsElement = component.props.children[indices.totals];

    expect(totalsElement.type).to.equal((<Totals />).type);
    expect(totalsElement.props.toSum).to.deep.equal([
      { value: 0, isHidden: true },
      { label: 'Selected Targeting', value: 750 },
    ]);
    expect(totalsElement.props.valueFormatter).to.be.a('function');

    const alertElement = component.props.children[indices.alert];

    expect(alertElement.type).to.equal((<Alert />).type);
    expect(alertElement.props.type).to.equal('danger');
    expect(alertElement.props.children).to.deep.equal(['Required: ', 'Segments', '.']);

    const scrollableElement = component.props.children[indices.scrollable];
    expect(scrollableElement.props.className).to.equal('treepickerselected-component-scrollable is-short');

    const gridElements = scrollableElement.props.children[scrollableIndices.grids];
    expect(gridElements).to.have.length(1);

    const gridElement = gridElements[0];

    expect(gridElement.type).to.equal((<Grid />).type);

    const headerRowElement = gridElement.props.children[gridIndices.headerRow];

    expect(headerRowElement.type).to.equal((<GridRow />).type);
    expect(headerRowElement.props.type).to.equal('header');

    const headerFirstCell = headerRowElement.props.children[0];

    expect(headerFirstCell.type).to.equal((<GridCell />).type);
    expect(headerFirstCell.props.stretch).to.equal(true);
    expect(headerFirstCell.props.children).to.equal('Geography');

    const headerSecondCell = headerRowElement.props.children[1];

    expect(headerSecondCell.type).to.equal((<GridCell />).type);
    expect(headerSecondCell.props.children).to.equal('Galactic Credits');

    const nodeElements = gridElement.props.children[gridIndices.nodes];
    expect(nodeElements).to.have.length(2);

    expect(nodeElements[0].props.selected).to.equal(true);
    expect(nodeElements[0].props.valueFormatter).to.be.a('function');
    expect(nodeElements[0].props.includeNode).to.be.a('function');
    expect(nodeElements[0].props.includeNode()).to.be.a('null');
    expect(nodeElements[0].props.node).to.deep.equal(actNode);
    expect(nodeElements[0].props.removeNode).to.be.a('function');
    expect(nodeElements[0].props.removeNode()).to.be.a('null');

    expect(nodeElements[1].props.node).to.deep.equal(ntNode);

    const subFooterRowElement = gridElement.props.children[gridIndices.subFooterRow];

    expect(subFooterRowElement.type).to.equal((<GridRow />).type);
    expect(subFooterRowElement.props.type).to.equal('subfooter');

    const subFooterFirstCell = subFooterRowElement.props.children[0];

    expect(subFooterFirstCell.type).to.equal((<GridCell />).type);
    expect(subFooterFirstCell.props.stretch).to.equal(true);
    expect(subFooterFirstCell.props.children).to.be.an('undefined');

    const subFooterSecondCell = subFooterRowElement.props.children[1];

    expect(subFooterSecondCell.type).to.equal((<GridCell />).type);
    const overlayTriggerElement = subFooterSecondCell.props.children;
    expect(overlayTriggerElement.type).to.equal((<OverlayTrigger overlay={<span />}/>).type);
    expect(overlayTriggerElement.props.placement).to.equal('left');
    const popoverElement = overlayTriggerElement.props.overlay;
    expect(popoverElement.type).to.equal((<Popover id=""/>).type);
    expect(popoverElement.props.id).to.equal('subtotal-0');
    expect(popoverElement.props.children).to.equal('Selecting adjusts the set distribution, but not the set size.');

    const subtotalTextElement = overlayTriggerElement.props.children;
    expect(subtotalTextElement.props.children).to.equal('Average');

    const subFooterThirdCell = subFooterRowElement.props.children[2];

    expect(subFooterThirdCell.type).to.equal((<GridCell />).type);
    expect(subFooterThirdCell.props.children).to.equal(750);

    const emptyElement = scrollableElement.props.children[scrollableIndices.empty];

    expect(emptyElement.type).to.equal((<Empty />).type);
    expect(emptyElement.props.collection).to.deep.equal([[actNode, ntNode]]);
    expect(emptyElement.props.icon).to.equal('awesome-url');
    expect(emptyElement.props.text).to.equal('Nothing Selected');
  });

  it('should render with averageWithinRootType false', () => {
    const component = createComponent(TreePickerSelected, {
      averageWithinRootType: false,
      rootTypes,
      selectedNodesByRootType,
    });
    const totalsElement = component.props.children[indices.totals];

    expect(totalsElement.type).to.equal((<Totals />).type);
    expect(totalsElement.props.toSum).to.deep.equal([
      { value: 0, isHidden: true },
      { label: 'Selected', value: 1500 },
    ]);

    const scrollableElement = component.props.children[indices.scrollable];

    const gridElements = scrollableElement.props.children[scrollableIndices.grids];

    const gridElement = gridElements[0];

    const subFooterRowElement = gridElement.props.children[gridIndices.subFooterRow];

    const subFooterSecondCell = subFooterRowElement.props.children[1];
    expect(subFooterSecondCell.type).to.equal((<GridCell />).type);
    const overlayTriggerElement = subFooterSecondCell.props.children;
    expect(overlayTriggerElement.type).to.equal((<OverlayTrigger overlay={<span />}/>).type);
    expect(overlayTriggerElement.props.placement).to.equal('left');
    const popoverElement = overlayTriggerElement.props.overlay;
    expect(popoverElement.props.id).to.equal('subtotal-0');
    expect(popoverElement.props.children).to.equal('Selecting adjusts the set distribution and size.');

    const subtotalTextElement = overlayTriggerElement.props.children;
    expect(subtotalTextElement.props.children).to.equal('Subtotal');
  });

  it('should render alert as warning when warnOnRequired is true', () => {
    const component = createComponent(TreePickerSelected, {
      rootTypes,
      selectedNodesByRootType,
      warnOnRequired: true,
    });
    expect(component.props.className).to.equal('treepickerselected-component');

    const alertElement = component.props.children[indices.alert];

    expect(alertElement.type).to.equal((<Alert />).type);
    expect(alertElement.props.type).to.equal('warning');
    expect(alertElement.props.children).to.deep.equal(['Required: ', 'Segments', '.']);
  });

  it('should error when there is a selectedNode with no corresponding rootType', () => {
    expect(() => {
      createComponent(TreePickerSelected, { selectedNodesByRootType });
    }).to.throw('TreePickerSelectedComponent requires a rootType for id 0');
  });
});
