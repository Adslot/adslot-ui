/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TreePickerComponent from 'components/adslotUi/TreePickerComponent';
import { deepFreeze } from 'helpers/deepSetObjectMutability';

describe('TreePickerComponent', () => {
  const runComponentDidMount = ({ shallowRenderer }) =>
    shallowRenderer._instance._instance.componentDidMount();

  const runComponentWillUnmount = ({ shallowRenderer }) =>
    shallowRenderer._instance._instance.componentWillUnmount();

  const createAndMountComponent = (component, props = {}) => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(component, props));
    runComponentDidMount({ shallowRenderer });
    return shallowRenderer.getRenderOutput();
  };

  const baseItem = {
    label: 'Awesome Product',
    value: 10000,
  };

  const rootTypes = [
    {
      label: 'Geography',
      id: 'a',
      icon: 'http://placehold.it/16x16',
      emptyIcon: 'http://placehold.it/70x70',
      isRequired: true,
    },
    { label: 'Audiences', id: 'b', icon: 'http://placehold.it/16x16', isRequired: false },
    { label: 'Segments', id: 'c', icon: 'http://placehold.it/16x16', isRequired: true },
  ];

  const actNode =
    { id: '0', label: 'Australian Capital Territory', type: 'State', path: ['AU'], value: 1000, rootTypeId: 'a' };
  const ntNode = { id: '1', label: 'Northern Territory', type: 'State', path: ['AU'], value: 500, rootTypeId: 'a' };
  const qldNode = { id: '2', label: 'Queensland', type: 'State', path: ['AU'], value: 500, rootTypeId: 'a' };
  const saNode = { id: '3', label: 'South Australia', type: 'State', path: ['AU'], value: 500, rootTypeId: 'a' };

  const cbrNode = { id: '0a', label: 'Canberra', type: 'City', path: ['AU', 'ACT'], value: 2000, rootTypeId: 'a' };

  const maleNode = { id: '4', label: 'Males', type: '', path: [], value: 500, rootTypeId: 'b' };

  const getTreePickerPureElement = (rootComponent) => {
    const modalBodyElement = rootComponent.props.children[1];
    return modalBodyElement.props.children;
  };

  const getSubtree = ({ rootTypeId, query, nodeId }, cb) => {
    if (rootTypeId === 'a') {
      if (!query && !nodeId) {
        return cb([
          actNode,
          ntNode,
          qldNode,
          saNode,
        ]);
      }

      if (query === 'myQuery') { return cb([ntNode, saNode]); }

      if (nodeId === actNode.id) { return cb([cbrNode]); }

      return cb([]);
    }

    expect(rootTypeId).to.equal('b');
    return cb([maleNode]);
  };

  const valueFormatter = (value) => value;

  deepFreeze([baseItem, rootTypes, actNode, ntNode, qldNode, saNode, cbrNode, maleNode]);

  let initialSelection;

  beforeEach(() => {
    initialSelection = [
      actNode,
      ntNode,
    ];
  });

  it('should render with defaults', () => {
    const component = createAndMountComponent(TreePickerComponent);
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
    expect(treePickerPureElement.props.averageWithinRootType).to.equal(false);
    expect(treePickerPureElement.props.baseItem).to.be.an('undefined');
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.breadcrumbOnClick).to.be.a('function');
    expect(treePickerPureElement.props.emptyIcon).to.be.an('undefined');
    expect(treePickerPureElement.props.expandNode).to.be.a('function');
    expect(treePickerPureElement.props.includeNode).to.be.a('function');
    expect(treePickerPureElement.props.removeNode).to.be.a('function');
    expect(treePickerPureElement.props.rootTypes).to.deep.equal([]);
    expect(treePickerPureElement.props.searchOnChange).to.be.a('function');
    expect(treePickerPureElement.props.searchOnClear).to.be.a('function');
    expect(treePickerPureElement.props.searchValue).to.equal('');
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
    const component = createAndMountComponent(TreePickerComponent, {
      averageWithinRootType: true,
      baseItem,
      getSubtree,
      helpText: {
        average: 'An average explanation.',
        sum: 'The sum of all fears.',
      },
      initialSelection,
      modalTitle: 'Edit Targeting',
      rootTypes,
      selectedLabel: 'Selected Targeting',
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

    expect(treePickerPureElement.props.activeRootTypeId).to.equal('a');
    expect(treePickerPureElement.props.averageWithinRootType).to.equal(true);
    expect(treePickerPureElement.props.baseItem).to.equal(baseItem);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.breadcrumbOnClick).to.be.a('function');
    expect(treePickerPureElement.props.emptyIcon).to.equal('http://placehold.it/70x70');
    expect(treePickerPureElement.props.expandNode).to.be.a('function');
    expect(treePickerPureElement.props.helpText).to.deep.equal({
      average: 'An average explanation.',
      sum: 'The sum of all fears.',
    });
    expect(treePickerPureElement.props.includeNode).to.be.a('function');
    expect(treePickerPureElement.props.removeNode).to.be.a('function');
    expect(treePickerPureElement.props.rootTypes).to.equal(rootTypes);
    expect(treePickerPureElement.props.searchOnChange).to.be.a('function');
    expect(treePickerPureElement.props.searchOnClear).to.be.a('function');
    expect(treePickerPureElement.props.searchValue).to.equal('');
    expect(treePickerPureElement.props.selectedLabel).to.equal('Selected Targeting');
    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(
      _.groupBy(initialSelection, 'rootTypeId')
    );
    getSubtree({ rootTypeId: 'a' }, (subtree) => {
      expect(treePickerPureElement.props.subtree).to.deep.equal(subtree);
    });
    expect(treePickerPureElement.props.valueFormatter).to.equal(valueFormatter);
    expect(treePickerPureElement.props.warnOnRequired).to.equal(true);
  });

  it('should change `activeRootTypeId`, `searchValue` and `subtree` after a changeRootType action', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      initialSelection={initialSelection}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    let treePickerPureElement = getTreePickerPureElement(component);

    // So we know if the searchValue has reset to blank.
    treePickerPureElement.props.searchOnChange('needle');

    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.searchValue).to.equal('needle');
    treePickerPureElement.props.changeRootType('b');

    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.searchValue).to.equal('');
    expect(treePickerPureElement.props.activeRootTypeId).to.equal('b');
    expect(treePickerPureElement.props.subtree).to.deep.equal([maleNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after a search action, then again on search clear', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      initialSelection={initialSelection}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
      throttleTime={0}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.searchOnChange('myQuery');

    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([ntNode, saNode]);

    treePickerPureElement.props.searchOnClear();
    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.subtree).to.deep.equal([
      actNode,
      ntNode,
      qldNode,
      saNode,
    ]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after a breadcrumbOnClick action of `all`', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      initialSelection={initialSelection}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.expandNode(actNode);

    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);

    treePickerPureElement.props.breadcrumbOnClick('all');

    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([]);
    getSubtree({ rootTypeId: 'a' }, (subtree) => {
      expect(treePickerPureElement.props.subtree).to.deep.equal(subtree);
    });
  });

  it('should change `breadcrumbNodes` and `subtree` state after a breadcrumbOnClick action', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      initialSelection={initialSelection}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });
    let treePickerPureElement = getTreePickerPureElement(component);

    treePickerPureElement.props.expandNode(actNode);
    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);

    treePickerPureElement.props.expandNode(cbrNode);
    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode, cbrNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);

    treePickerPureElement.props.breadcrumbOnClick(actNode.id);
    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after an expandNode action', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      initialSelection={initialSelection}
      getSubtree={getSubtree}
      rootTypes={rootTypes}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.expandNode(actNode);

    component = shallowRenderer.getRenderOutput();
    treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.props.breadcrumbNodes).to.deep.equal([actNode]);
    expect(treePickerPureElement.props.subtree).to.deep.equal([cbrNode]);
  });

  it('should change `selected` state after an includeNode action', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.includeNode(qldNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(
      _(initialSelection)
        .push(qldNode)
        .groupBy('rootTypeId')
        .value()
    );
  });

  it('should change `selected` state after an includeNode action for a new rootType', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.includeNode(maleNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(
      _(initialSelection)
        .push(maleNode)
        .groupBy('rootTypeId')
        .value()
    );
  });

  it('should change `selected` state after a removeNode action', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.removeNode(actNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy([ntNode], 'rootTypeId'));
  });

  it('should change `selected` state to an empty object after a removeNode action on all nodes', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.removeNode(actNode);
    treePickerPureElement.props.removeNode(ntNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal({});
  });

  it('should show modal when `show` is true', () => {
    const component = createAndMountComponent(TreePickerComponent, { show: true });
    expect(component.props.show).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createAndMountComponent(TreePickerComponent, { show: false });
    expect(component.props.show).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = null;
    let closeCalls = 0;
    const applyMock = (selectedIds) => applyCalls = selectedIds;
    const closeMock = () => closeCalls += 1;
    const component = createAndMountComponent(TreePickerComponent, {
      modalApply: applyMock,
      modalClose: closeMock,
      initialSelection,
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    applyButtonElement.props.onClick();

    expect(applyCalls).to.deep.equal({ a: ['0', '1'] });
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createAndMountComponent(TreePickerComponent, { initialSelection });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.props.onClick).to.throw(
      'AdslotUi TreePicker needs a modalApply handler for {"a":["0","1"]}'
    );
  });

  it('should call `modalClose` and re-fetch data when we click Cancel', () => {
    let closeCalls = 0;
    let getSubtreeCalls = 0;
    const closeMock = () => closeCalls += 1;
    const getSubtreeMock = ({ rootTypeId, query, nodeId }, cb) => {
      getSubtreeCalls += 1;
      if (getSubtreeCalls === 2) { return cb([maleNode]); }

      return cb([]);
    };

    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      modalClose={closeMock}
      getSubtree={getSubtreeMock}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(getSubtreeCalls).to.equal(1);

    let modalBodyElement = component.props.children[1];
    let treePickerPureElement = modalBodyElement.props.children;
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);

    cancelButtonElement.props.onClick();
    component = shallowRenderer.getRenderOutput();

    modalBodyElement = component.props.children[1];
    treePickerPureElement = modalBodyElement.props.children;
    expect(treePickerPureElement.props.subtree).to.deep.equal([maleNode]);

    expect(closeCalls).to.equal(1);
    expect(getSubtreeCalls).to.equal(2);
  });

  it('should not set the state to the new subtree if we unmount the component before the data returns', () => {
    let closeCalls = 0;
    let getSubtreeCalls = 0;
    const closeMock = () => closeCalls += 1;
    const getSubtreeMock = ({ rootTypeId, query, nodeId }, cb) => {
      getSubtreeCalls += 1;
      if (getSubtreeCalls === 2) {return cb([maleNode]);}

      return cb([]);
    };

    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TreePickerComponent
      modalClose={closeMock}
      getSubtree={getSubtreeMock}
    />);
    let component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(getSubtreeCalls).to.equal(1);

    let modalBodyElement = component.props.children[1];
    let treePickerPureElement = modalBodyElement.props.children;
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);

    runComponentWillUnmount({ shallowRenderer });
    cancelButtonElement.props.onClick();
    component = shallowRenderer.getRenderOutput();

    modalBodyElement = component.props.children[1];
    treePickerPureElement = modalBodyElement.props.children;
    expect(treePickerPureElement.props.subtree).to.deep.equal([]);

    expect(closeCalls).to.equal(1);
    expect(getSubtreeCalls).to.equal(2);
  });

  it('should throw when we click Close without a handler', () => {
    const component = createAndMountComponent(TreePickerComponent);

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.props.onClick).to.throw('AdslotUi TreePicker needs a modalClose handler');
  });
});
