/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import createComponent from 'helpers/shallowRenderHelper';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
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

  const getTreePickerPureElement = (rootComponent) => {
    const modalBodyElement = rootComponent.props.children[1];
    return modalBodyElement.props.children;
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
    expect(component.type).to.equal((<Modal />).type);
    expect(component.props.show).to.equal(false);
    expect(component.props.bsSize).to.equal('large');
    expect(component.props.keyboard).to.equal(false);

    const modalHeaderElement = component.props.children[0];
    expect(modalHeaderElement.type).to.equal((<Modal.Header />).type);
    const modalTitleElement = modalHeaderElement.props.children;
    expect(modalTitleElement.type).to.equal((<Modal.Title />).type);
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Edit Tree');

    const modalBodyElement = component.props.children[1];
    expect(modalBodyElement.type).to.equal((<Modal.Body />).type);

    const treePickerPureElement = modalBodyElement.props.children;
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

    const modalFooterElement = component.props.children[2];
    expect(modalFooterElement.type).to.equal((<Modal.Footer />).type);

    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.type).to.equal((<Button />).type);
    expect(cancelButtonElement.props.className).to.equal('btn-inverse');
    expect(cancelButtonElement.props.onClick).to.be.a('function');
    expect(cancelButtonElement.props.children).to.equal('Cancel');

    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.type).to.equal((<Button />).type);
    expect(applyButtonElement.props.bsStyle).to.equal('primary');
    expect(applyButtonElement.props.onClick).to.be.a('function');
    expect(applyButtonElement.props.children).to.equal('Apply');
  });

  it('should render with props', () => {
    const component = createComponent(TreePickerComponent, {
      baseItem,
      getSelected,
      getSubtree,
      modalTitle: 'Edit Targeting',
      rootTypes,
      valueFormatter,
      warnOnRequired: true,
    });
    expect(component.props.className).to.equal('treepicker-component');

    const modalHeaderElement = component.props.children[0];
    const modalTitleElement = modalHeaderElement.props.children;
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Edit Targeting');

    const treePickerPureElement = getTreePickerPureElement(component);
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

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.changeRootType('1');

    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

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

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.searchOnQuery('myQuery');

    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

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

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.expandNode(actNode);

    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);

    treePickerPureElement.props.breadcrumbOnClick('all');

    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

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
    let treePickerPureElement = getTreePickerPureElement(component);

    treePickerPureElement.props.expandNode(actNode);
    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);

    treePickerPureElement.props.expandNode(cbrNode);
    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode, cbrNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);

    treePickerPureElement.props.breadcrumbOnClick(actNode.id);
    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
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

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.expandNode(actNode);

    component = renderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);
  });

  it('should change `selected` state after an includeNode action', () => {
    const component = createComponent(TreePickerComponent, {
      getSelected,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
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
    const treePickerPureElement = getTreePickerPureElement(component);
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
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.removeNode(actNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy([ntNode], 'rootTypeId'));
  });

  it('should change `selected` state to an empty object after a removeNode action on all nodes', () => {
    const component = createComponent(TreePickerComponent, {
      getSelected,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.removeNode(actNode);
    treePickerPureElement.props.removeNode(ntNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal({});
  });

  it('should show modal when `show` is true', () => {
    const component = createComponent(TreePickerComponent, { show: true });
    expect(component.props.show).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createComponent(TreePickerComponent, { show: false });
    expect(component.props.show).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = null;
    let closeCalls = 0;
    const applyMock = (selectedIds) => applyCalls = selectedIds;
    const closeMock = () => closeCalls += 1;
    const component = createComponent(TreePickerComponent, {
      modalApply: applyMock,
      modalClose: closeMock,
      getSelected,
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    applyButtonElement.props.onClick();

    expect(applyCalls).to.deep.equal(['0', '1']);
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createComponent(TreePickerComponent, { getSelected });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.props.onClick).to.throw('AdslotUi TreePicker needs a modalApply handler for 0,1');
  });

  it('should call `modalClose` and re-fetch data when we click Cancel', () => {
    let closeCalls = 0;
    let getSelectedCalls = 0;
    const closeMock = () => closeCalls += 1;
    const getSelectedMock = () => getSelectedCalls += 1;
    const component = createComponent(TreePickerComponent, {
      modalClose: closeMock,
      getSelected: getSelectedMock,
    });

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(getSelectedCalls).to.equal(1);

    cancelButtonElement.props.onClick();

    expect(closeCalls).to.equal(1);
    expect(getSelectedCalls).to.equal(2);
  });

  it('should throw when we click Close without a handler', () => {
    const component = createComponent(TreePickerComponent);

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.props.onClick).to.throw('AdslotUi TreePicker needs a modalClose handler');
  });
});
