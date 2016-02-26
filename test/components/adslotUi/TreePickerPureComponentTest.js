/* eslint-env node, mocha */
/* global expect */

import immutable from 'seamless-immutable';
import React from 'react';
import TreePickerMocks from 'mocks/TreePickerMocks';
import TreePickerPureComponent from 'components/adslotUi/TreePickerPureComponent';
import { Empty, FlexSpacer, Grid } from 'alexandria-adslot';
import { createComponent } from 'testHelpers/shallowRenderHelpers';

describe('TreePickerPureComponent', () => {
  const {
    actNode,
    baseItem,
    rootTypes,
  } = TreePickerMocks;

  const indices = immutable({
    leftPane: 0,
    rightPane: 1,
  });

  const leftPaneIndices = immutable({
    tabs: 0,
    nav: 1,
    nodesGrid: 2,
    flexSpacer: 3,
  });

  const nodesGridIndices = immutable({
    nodes: 0,
    empty: 1,
  });

  it('should render with defaults', () => {
    const component = createComponent(TreePickerPureComponent, { changeRootType: () => null });
    expect(component.props.className).to.equal('treepickerpure-component');

    const leftPaneElement = component.props.children[indices.leftPane];
    expect(leftPaneElement.type.name).to.equal('SplitPaneComponent');

    const tabsElement = leftPaneElement.props.children[leftPaneIndices.tabs];
    expect(tabsElement.type).to.equal('ul');
    expect(tabsElement.props.className).to.equal('nav nav-tabs');
    const tabElement = tabsElement.props.children;
    expect(tabElement.type).to.equal('li');
    expect(tabElement.props.className).to.be.an('undefined');
    expect(tabElement.props.children.type).to.equal('a');
    expect(tabElement.props.children.props.children).to.equal('Loading');

    const navElement = leftPaneElement.props.children[leftPaneIndices.nav];
    expect(navElement.type.name).to.equal('TreePickerNavComponent');

    const nodesGridElement = leftPaneElement.props.children[leftPaneIndices.nodesGrid];
    expect(nodesGridElement.type).to.equal((<Grid />).type);

    expect(nodesGridElement.props.children).to.have.length(2);
    const nodesElements = nodesGridElement.props.children[nodesGridIndices.nodes];
    expect(nodesElements).to.have.length(0);

    const emptyElement = nodesGridElement.props.children[nodesGridIndices.empty];
    expect(emptyElement.type).to.equal((<Empty />).type);
    expect(emptyElement.props.collection).to.deep.equal([]);
    expect(emptyElement.props.icon).to.equal('//placehold.it/70x70');
    expect(emptyElement.props.text).to.equal('No items to select.');

    const flexSpacerElement = leftPaneElement.props.children[leftPaneIndices.flexSpacer];
    expect(flexSpacerElement.type).to.equal((<FlexSpacer />).type);

    const rightPaneElement = component.props.children[indices.rightPane];
    expect(rightPaneElement.type.name).to.equal('SplitPaneComponent');

    const treePickerSelectedElement = rightPaneElement.props.children;
    expect(treePickerSelectedElement.type.name).to.equal('TreePickerSelectedComponent');
    expect(treePickerSelectedElement.props.averageWithinRootType).to.equal(false);
  });

  it('should render with props', () => {
    const testFunction = () => null;

    const rootTypeChanges = [];

    const component = createComponent(TreePickerPureComponent, {
      activeRootTypeId: 'a',
      averageWithinRootType: true,
      baseItem,
      breadcrumbNodes: [],
      breadcrumbOnClick: testFunction,
      changeRootType: (rootType) => rootTypeChanges.push(rootType),
      emptyIcon: 'url',
      emptySvgSymbol: { href: '/some.svg#id' },
      helpText: {
        average: 'An average explanation.',
        sum: 'The sum of all fears.',
      },
      includeNode: testFunction,
      removeNode: testFunction,
      rootTypes,
      searchOnQuery: testFunction,
      selectedLabel: 'Selected Targeting',
      selectedNodesByRootType: {},
      subtree: [actNode],
      totalsSuffix: 'CPD',
      valueFormatter: testFunction,
      warnOnRequired: true,
    });
    expect(component.props.className).to.equal('treepickerpure-component');

    const leftPaneElement = component.props.children[indices.leftPane];
    expect(leftPaneElement.type.name).to.equal('SplitPaneComponent');

    const tabsElement = leftPaneElement.props.children[leftPaneIndices.tabs];
    expect(tabsElement.type).to.equal('ul');
    expect(tabsElement.props.className).to.equal('nav nav-tabs');
    const tabElements = tabsElement.props.children;
    expect(tabElements[0].type).to.equal('li');
    expect(tabElements[0].props.className).to.equal('active');
    const firstTabAnchor = tabElements[0].props.children;
    expect(firstTabAnchor.type).to.equal('a');

    expect(rootTypeChanges).to.deep.equal([]);
    firstTabAnchor.props.onClick();
    expect(rootTypeChanges).to.deep.equal([]); // Shouldn't add since its already active.

    const firstTabIcon = firstTabAnchor.props.children[0];
    expect(firstTabIcon.type).to.equal('img');
    expect(firstTabIcon.props.className).to.equal('icon');
    expect(firstTabIcon.props.src).to.equal(rootTypes[0].icon);
    expect(firstTabAnchor.props.children[1]).to.equal(rootTypes[0].label);

    expect(tabElements[1].type).to.equal('li');
    expect(tabElements[1].props.className).to.equal('');
    const secondTabAnchor = tabElements[1].props.children;
    expect(secondTabAnchor.type).to.equal('a');

    expect(rootTypeChanges).to.deep.equal([]);
    secondTabAnchor.props.onClick();
    expect(rootTypeChanges).to.deep.equal(['b']);

    const navElement = leftPaneElement.props.children[leftPaneIndices.nav];
    expect(navElement.type.name).to.equal('TreePickerNavComponent');

    const nodesGridElement = leftPaneElement.props.children[leftPaneIndices.nodesGrid];
    expect(nodesGridElement.type).to.equal((<Grid />).type);

    expect(nodesGridElement.props.children).to.have.length(2);
    const nodesElements = nodesGridElement.props.children[nodesGridIndices.nodes];
    expect(nodesElements).to.have.length(1);
    expect(nodesElements[0].props.node.label).to.equal('Australian Capital Territory');

    const emptyElement = nodesGridElement.props.children[nodesGridIndices.empty];
    expect(emptyElement.type).to.equal((<Empty />).type);

    expect(emptyElement.props.collection).to.have.length(1);
    expect(emptyElement.props.icon).to.equal('url');
    expect(emptyElement.props.svgSymbol).to.deep.equal({ href: '/some.svg#id' });
    expect(emptyElement.props.text).to.equal('No items to select.');

    const rightPaneElement = component.props.children[indices.rightPane];
    expect(rightPaneElement.type.name).to.equal('SplitPaneComponent');

    const treePickerSelectedElement = rightPaneElement.props.children;
    expect(treePickerSelectedElement.type.name).to.equal('TreePickerSelectedComponent');
    expect(treePickerSelectedElement.props.averageWithinRootType).to.equal(true);
    expect(treePickerSelectedElement.props.selectedLabel).to.equal('Selected Targeting');
    expect(treePickerSelectedElement.props.totalsSuffix).to.equal('CPD');
    expect(treePickerSelectedElement.props.helpText).to.deep.equal({
      average: 'An average explanation.',
      sum: 'The sum of all fears.',
    });
  });
});
