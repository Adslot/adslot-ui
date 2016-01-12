/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import createComponent from 'helpers/shallowRenderHelper';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TreePickerComponent from 'components/adslotUi/TreePickerComponent';

describe('TreePickerComponent', () => {
  const baseItem = {
    label: 'Awesome Product',
    value: 10000,
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
  const ntNode = { id: '1', label: 'Northern Territory', type: 'State', path: ['AU'], value: 500, rootTypeId: '0' };
  const qldNode = { id: '2', label: 'Queensland', type: 'State', path: ['AU'], value: 500, rootTypeId: '0' };
  const saNode = { id: '3', label: 'South Australia', type: 'State', path: ['AU'], value: 500, rootTypeId: '0' };

  const cbrNode = { id: '0a', label: 'Canberra', type: 'City', path: ['AU', 'ACT'], value: 2000, rootTypeId: '0' };

  const maleNode = { id: '4', label: 'Males', type: '', path: [], value: 500, rootTypeId: '1' };

  const getSelected = () => {
    return [
      actNode,
      ntNode,
    ];
  };

  const getSubtree = (rootTypeId, query) => {
    if (rootTypeId === '0') {
      switch (query) {
        case '': return [
          actNode,
          ntNode,
          qldNode,
          saNode,
        ];
        case actNode.id: return [cbrNode];
        case cbrNode.id: return [];
        case 'myQuery': return [ntNode, saNode];
        default: return null;
      }
    }

    expect(rootTypeId).to.equal('1');
    return [maleNode];
  };

  const valueFormatter = (value) => value;

  it('should render with defaults', () => {
    const component = createComponent(TreePickerComponent);
    expect(component.props.className).to.equal('treepicker-component');

    const treePickerPureElement = component.props.children;
    expect(treePickerPureElement.type.name).to.equal('TreePickerPureComponent');

    expect(treePickerPureElement.props.activeRootTypeId).to.be.an('undefined');
    expect(treePickerPureElement.props.baseItem).to.be.an('undefined');
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.breadcrumbOnClick).to.be.a('function');
    expect(treePickerPureElement.props.emptyIcon).to.be.an('undefined');
    expect(treePickerPureElement.props.expandNode).to.be.a('function');
    expect(treePickerPureElement.props.includeNode).to.be.a('function');
    expect(treePickerPureElement.props.removeNode).to.be.a('function');
    expect(treePickerPureElement.props.rootTypes).to.deep.equal([]);
    expect(treePickerPureElement.props.searchOnQuery).to.be.a('function');
    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal({});
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);
    expect(treePickerPureElement.props.valueFormatter).to.be.an('undefined');
    expect(treePickerPureElement.props.warnOnRequired).to.equal(false);
  });

  it('should render with props', () => {
    const component = createComponent(TreePickerComponent, {
      baseItem,
      valueFormatter,
      getSelected,
      getSubtree,
      rootTypes,
      warnOnRequired: true,
    });
    expect(component.props.className).to.equal('treepicker-component');

    const treePickerPureElement = component.props.children;
    expect(treePickerPureElement.type.name).to.equal('TreePickerPureComponent');

    expect(treePickerPureElement.props.activeRootTypeId).to.equal('0');
    expect(treePickerPureElement.props.baseItem).to.equal(baseItem);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.breadcrumbOnClick).to.be.a('function');
    expect(treePickerPureElement.props.emptyIcon).to.equal('http://placehold.it/70x70');
    expect(treePickerPureElement.props.expandNode).to.be.a('function');
    expect(treePickerPureElement.props.includeNode).to.be.a('function');
    expect(treePickerPureElement.props.removeNode).to.be.a('function');
    expect(treePickerPureElement.props.rootTypes).to.equal(rootTypes);
    expect(treePickerPureElement.props.searchOnQuery).to.be.a('function');
    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy(getSelected(), 'rootTypeId'));
    expect(treePickerPureElement.props.subtree).to.deep.equal(getSubtree('0', ''));
    expect(treePickerPureElement.props.valueFormatter).to.equal(valueFormatter);
    expect(treePickerPureElement.props.warnOnRequired).to.equal(true);
  });

  it('should change `activeRootTypeId` and `subtree` after a changeRootType action', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TreePickerComponent
      getSelected={getSelected}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = renderer.getRenderOutput();

    let treePickerPureElement = component.props.children;
    treePickerPureElement.props.changeRootType('1');

    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;

    expect(treePickerPureElement.props.activeRootTypeId).to.equal('1');
    expect(treePickerPureElement.props.subtree).to.deep.equal([maleNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after a search action', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TreePickerComponent
      getSelected={getSelected}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = renderer.getRenderOutput();

    let treePickerPureElement = component.props.children;
    treePickerPureElement.props.searchOnQuery('myQuery');

    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([ntNode, saNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after a breadcrumbOnClick action of `all`', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TreePickerComponent
      getSelected={getSelected}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = renderer.getRenderOutput();

    let treePickerPureElement = component.props.children;
    treePickerPureElement.props.expandNode(actNode);

    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);

    treePickerPureElement.props.breadcrumbOnClick('all');

    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.subtree).to.deep.equal(getSubtree('0', ''));
  });

  it('should change `breadcrumbNodes` and `subtree` state after a breadcrumbOnClick action', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TreePickerComponent
      getSelected={getSelected}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = renderer.getRenderOutput();
    let treePickerPureElement = component.props.children;

    treePickerPureElement.props.expandNode(actNode);
    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);

    treePickerPureElement.props.expandNode(cbrNode);
    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode, cbrNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);

    treePickerPureElement.props.breadcrumbOnClick(actNode.id);
    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after an expandNode action', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TreePickerComponent
      getSelected={getSelected}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = renderer.getRenderOutput();

    let treePickerPureElement = component.props.children;
    treePickerPureElement.props.expandNode(actNode);

    component = renderer.getRenderOutput();
    treePickerPureElement = component.props.children;

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);
  });

  it('should change `selected` state after an includeNode action', () => {
    const component = createComponent(TreePickerComponent, {
      getSelected,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = component.props.children;
    treePickerPureElement.props.includeNode(qldNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(
      _(getSelected())
        .push(qldNode)
        .groupBy('rootTypeId')
        .value()
    );
  });

  it('should change `selected` state after an includeNode action for a new rootType', () => {
    const component = createComponent(TreePickerComponent, {
      getSelected,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = component.props.children;
    treePickerPureElement.props.includeNode(maleNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(
      _(getSelected())
        .push(maleNode)
        .groupBy('rootTypeId')
        .value()
    );
  });

  it('should change `selected` state after a removeNode action', () => {
    const component = createComponent(TreePickerComponent, {
      getSelected,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = component.props.children;
    treePickerPureElement.props.removeNode(actNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy([ntNode], 'rootTypeId'));
  });

  it('should change `selected` state to an empty object after a removeNode action on all nodes', () => {
    const component = createComponent(TreePickerComponent, {
      getSelected,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = component.props.children;
    treePickerPureElement.props.removeNode(actNode);
    treePickerPureElement.props.removeNode(ntNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal({});
  });
});
