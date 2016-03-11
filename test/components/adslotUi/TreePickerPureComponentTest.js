import _ from 'lodash';
import React from 'react';
import SplitPaneComponent from 'components/adslotUi/SplitPaneComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';
import TreePickerNavComponent from 'components/adslotUi/TreePickerNavComponent';
import TreePickerPureComponent from 'components/adslotUi/TreePickerPureComponent';
import TreePickerSelectedComponent from 'components/adslotUi/TreePickerSelectedComponent';
import { Empty, FlexSpacer, Grid, SvgSymbol } from 'alexandria-adslot';
import { shallow } from 'enzyme';

describe('TreePickerPureComponent', () => {
  const {
    actNode,
    baseItem,
    rootTypes,
  } = TreePickerMocks;

  it('should render with defaults', () => {
    const component = shallow(<TreePickerPureComponent changeRootType={_.noop} />);
    expect(component.prop('className')).to.equal('treepickerpure-component');

    const leftPaneElement = component.find(SplitPaneComponent).first();
    const tabsElement = leftPaneElement.find('ul');
    expect(tabsElement.prop('className')).to.equal('nav nav-tabs');

    const tabElement = tabsElement.find('li');
    expect(tabElement.prop('className')).to.be.an('undefined');
    expect(tabElement.children().type()).to.equal('a');
    expect(tabElement.children().text()).to.equal('Loading');

    const navElement = leftPaneElement.find(TreePickerNavComponent);
    expect(navElement).to.have.length(1);

    const nodesGridElement = leftPaneElement.find(Grid);

    // No treepicker nodes and one empty component
    expect(nodesGridElement.children()).to.have.length(1);

    const emptyElement = nodesGridElement.find(Empty);
    expect(emptyElement.prop('collection')).to.deep.equal([]);
    expect(emptyElement.prop('svgSymbol').href).to.equal('/assets/svg-symbols.svg#checklist-incomplete');
    expect(emptyElement.prop('svgSymbol').classSuffixes).to.deep.equal(['gray-darker', '70', 'circle']);
    expect(emptyElement.prop('text')).to.equal('No items to select.');

    const flexSpacerElement = leftPaneElement.find(FlexSpacer);
    expect(flexSpacerElement).to.have.length(1);

    const rightPaneElement = component.find(SplitPaneComponent).last();
    const treePickerSelectedElement = rightPaneElement.find(TreePickerSelectedComponent);
    expect(treePickerSelectedElement.prop('averageWithinRootType')).to.equal(false);
  });

  it('should render with props', () => {
    const testFunction = () => null;

    const rootTypeChanges = [];

    const props = {
      activeRootTypeId: 'a',
      averageWithinRootType: true,
      baseItem,
      breadcrumbNodes: [],
      breadcrumbOnClick: testFunction,
      changeRootType: (rootType) => rootTypeChanges.push(rootType),
      emptySvgSymbol: { href: '/some.svg#id', classSuffixes: ['gray-light'] },
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
    };
    const component = shallow(<TreePickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('treepickerpure-component');

    const leftPaneElement = component.find(SplitPaneComponent).first();
    const tabsElement = leftPaneElement.find('ul');
    expect(tabsElement.prop('className')).to.equal('nav nav-tabs');

    const firstTabElement = tabsElement.find('li').first();
    expect(firstTabElement.prop('className')).to.equal('active');

    const firstTabAnchor = firstTabElement.find('a');
    expect(firstTabAnchor.children().last().text()).to.equal(rootTypes[0].label);

    expect(rootTypeChanges).to.deep.equal([]);
    firstTabAnchor.simulate('click');
    expect(rootTypeChanges).to.deep.equal([]); // Shouldn't add since its already active.

    const firstTabIcon = firstTabAnchor.find(SvgSymbol);
    expect(firstTabIcon.prop('href')).to.equal(rootTypes[0].svgSymbol.href);
    expect(firstTabIcon.prop('classSuffixes')).to.deep.equal(['gray-darker']);

    const secondTabElement = tabsElement.find('li').at(1);
    expect(secondTabElement.prop('className')).to.equal('');

    const secondTabAnchor = secondTabElement.find('a');
    expect(rootTypeChanges).to.deep.equal([]);
    secondTabAnchor.simulate('click');
    expect(rootTypeChanges).to.deep.equal(['b']);

    const navElement = leftPaneElement.find(TreePickerNavComponent);
    expect(navElement).to.have.length(1);

    const nodesGridElement = leftPaneElement.find(Grid);

    // One treepicker node and one empty component
    expect(nodesGridElement.children()).to.have.length(2);

    const nodeElement = nodesGridElement.children().first();
    expect(nodeElement.prop('node').label).to.equal('Australian Capital Territory');

    const emptyElement = nodesGridElement.find(Empty);
    expect(emptyElement.prop('collection')).to.have.length(1);
    expect(emptyElement.prop('svgSymbol').href).to.equal('/some.svg#id');
    expect(emptyElement.prop('svgSymbol').classSuffixes).to.deep.equal(['gray-light']);
    expect(emptyElement.prop('text')).to.equal('No items to select.');

    const rightPaneElement = component.find(SplitPaneComponent).last();
    const treePickerSelectedElement = rightPaneElement.find(TreePickerSelectedComponent);
    expect(treePickerSelectedElement.prop('averageWithinRootType')).to.equal(true);
    expect(treePickerSelectedElement.prop('selectedLabel')).to.equal('Selected Targeting');
    expect(treePickerSelectedElement.prop('totalsSuffix')).to.equal('CPD');
    expect(treePickerSelectedElement.prop('helpText')).to.deep.equal({
      average: 'An average explanation.',
      sum: 'The sum of all fears.',
    });
  });
});
