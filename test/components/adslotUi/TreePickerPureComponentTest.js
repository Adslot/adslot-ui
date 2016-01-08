/* eslint-env node, mocha */
/* global expect */

import createComponent from 'helpers/shallowRenderHelper';
import React from 'react';
import TreePickerPureComponent from 'components/adslotUi/TreePickerPureComponent.js';
import { Grid } from 'alexandria-adslot';

describe('TreePickerPureComponent', () => {
  it('should render with defaults', () => {
    const component = createComponent(TreePickerPureComponent);
    expect(component.props.className).to.equal('treepickerpure-component');

    const leftPaneElement = component.props.children[0];
    expect(leftPaneElement.type.name).to.equal('TreePickerPaneComponent');

    const tabsElement = leftPaneElement.props.children[0];
    expect(tabsElement.type).to.equal('ul');
    expect(tabsElement.props.className).to.equal('nav nav-tabs');
    const tabElement = tabsElement.props.children;
    expect(tabElement.type).to.equal('li');
    expect(tabElement.props.className).to.be.an('undefined');
    expect(tabElement.props.children.type).to.equal('a');
    expect(tabElement.props.children.props.children).to.equal('Loading');

    const navElement = leftPaneElement.props.children[1];
    expect(navElement.type.name).to.equal('TreePickerNavComponent');

    const nodesGridElement = leftPaneElement.props.children[2];
    expect(nodesGridElement.type).to.equal((<Grid />).type);
    expect(nodesGridElement.props.children).to.have.length(0);

    const rightPaneElement = component.props.children[1];
    expect(rightPaneElement.type.name).to.equal('TreePickerPaneComponent');

    const treePickerSelectedElement = rightPaneElement.props.children;
    expect(treePickerSelectedElement.type.name).to.equal('TreePickerSelectedComponent');
  });

  it('should render with props', () => {
    const testFunction = () => null;

    const rootTypes = [
      {
        label: 'Geography',
        id: 0,
        icon: 'http://placehold.it/16x16',
        emptyIcon: 'http://placehold.it/70x70',
        isRequired: true,
      },
    ];

    const component = createComponent(TreePickerPureComponent, {
      activeRootTypeId: 0,
      baseItem: {
        label: 'foo',
        value: 100,
      },
      breadcrumbNodes: [],
      breadcrumbOnClick: testFunction,
      emptyIcon: 'url',
      includeNode: testFunction,
      removeNode: testFunction,
      rootTypes,
      searchOnQuery: testFunction,
      selectedNodesByRootType: {},
      subtree: [
        { id: 0, label: 'Australian Capital Territory', type: 'State', path: ['AU'], value: 1000, rootTypeId: 0 },
      ],
      valueFormatter: testFunction,
      warnOnRequired: true,
    });
    expect(component.props.className).to.equal('treepickerpure-component');

    const leftPaneElement = component.props.children[0];
    expect(leftPaneElement.type.name).to.equal('TreePickerPaneComponent');

    const tabsElement = leftPaneElement.props.children[0];
    expect(tabsElement.type).to.equal('ul');
    expect(tabsElement.props.className).to.equal('nav nav-tabs');
    const tabElements = tabsElement.props.children;
    expect(tabElements[0].type).to.equal('li');
    expect(tabElements[0].props.className).to.equal('active');
    const firstTabAnchor = tabElements[0].props.children;
    expect(firstTabAnchor.type).to.equal('a');

    const firstTabIcon = firstTabAnchor.props.children[0];
    expect(firstTabIcon.type).to.equal('img');
    expect(firstTabIcon.props.className).to.equal('icon');
    expect(firstTabIcon.props.src).to.equal(rootTypes[0].icon);
    expect(firstTabAnchor.props.children[1]).to.equal(rootTypes[0].label);

    const navElement = leftPaneElement.props.children[1];
    expect(navElement.type.name).to.equal('TreePickerNavComponent');

    const nodesGridElement = leftPaneElement.props.children[2];
    expect(nodesGridElement.type).to.equal((<Grid />).type);

    expect(nodesGridElement.props.children).to.have.length(1);

    const rightPaneElement = component.props.children[1];
    expect(rightPaneElement.type.name).to.equal('TreePickerPaneComponent');

    const treePickerSelectedElement = rightPaneElement.props.children;
    expect(treePickerSelectedElement.type.name).to.equal('TreePickerSelectedComponent');
  });
});
