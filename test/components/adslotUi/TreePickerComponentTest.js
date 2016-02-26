/* eslint-env node, mocha */
/* global expect */

import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import TreePickerComponent from 'components/adslotUi/TreePickerComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';
import {
  createAndMountComponent,
  createShallowRenderer,
  runComponentDidMount,
  runComponentWillUnmount,
  runComponentWillReceiveProps,
} from 'testHelpers/shallowRenderHelpers';

describe('TreePickerComponent', () => {
  const {
    actNode,
    baseItem,
    cbrNode,
    initialSelection,
    maleNode,
    ntNode,
    qldNode,
    rootTypes,
    saNode,
    valueFormatter,
  } = TreePickerMocks;

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

  const getShallowTreePickerPure = () => {
    const shallowRenderer = createShallowRenderer(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
      throttleTime: 0,
    });
    const component = shallowRenderer.getRenderOutput();
    runComponentDidMount({ shallowRenderer });

    const treePickerPureElement = getTreePickerPureElement(component);
    return { shallowRenderer, treePickerPureElement };
  };

  const checkLoadingData = ({
    expectedCount,
    expectedSelection,
    getSubtreeCount,
    shallowRenderer,
  }) => {
    const component = shallowRenderer.getRenderOutput();
    expect(getSubtreeCount).to.equal(expectedCount);
    const treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(
      _.groupBy(expectedSelection, 'rootTypeId')
    );
  };

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
    expect(treePickerPureElement.props.emptySvgSymbol).to.be.an('undefined');
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
    expect(treePickerPureElement.props.emptySvgSymbol).to.deep.equal({ href: '/some.svg#id' });
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
    const componentRender = getShallowTreePickerPure();
    const { shallowRenderer } = componentRender;
    let { treePickerPureElement } = componentRender;

    // So we know if the searchValue has reset to blank.
    treePickerPureElement.props.searchOnChange('needle');

    let component = shallowRenderer.getRenderOutput();
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
    const shallowRenderer = createShallowRenderer(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
      throttleTime: 0,
    });
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
    const componentRender = getShallowTreePickerPure();
    const { shallowRenderer } = componentRender;
    let { treePickerPureElement } = componentRender;

    treePickerPureElement.props.expandNode(actNode);

    let component = shallowRenderer.getRenderOutput();
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
    const componentRender = getShallowTreePickerPure();
    const { shallowRenderer } = componentRender;
    let { treePickerPureElement } = componentRender;

    treePickerPureElement.props.expandNode(actNode);

    let component = shallowRenderer.getRenderOutput();
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
    const componentRender = getShallowTreePickerPure();
    const { shallowRenderer } = componentRender;
    let { treePickerPureElement } = componentRender;

    treePickerPureElement.props.expandNode(actNode);

    const component = shallowRenderer.getRenderOutput();
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
      _.groupBy([actNode, ntNode, qldNode], 'rootTypeId')
    );
  });

  it('should change `selected` state after an includeNode action, removing subnodes of the added node', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection: [cbrNode],
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.includeNode(actNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy([actNode], 'rootTypeId'));
  });

  it('should change `selected` state after an includeNode action, removing parents of the added node', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection: [actNode],
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.includeNode(cbrNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy([cbrNode], 'rootTypeId'));
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
      _.groupBy([actNode, ntNode, maleNode], 'rootTypeId')
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

  it('should change `selected` state to an empty object after a removeNode action on all nodes per rootType', () => {
    const component = createAndMountComponent(TreePickerComponent, {
      initialSelection,
      getSubtree,
      rootTypes,
    });
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props.changeRootType('b');
    treePickerPureElement.props.includeNode(maleNode);
    treePickerPureElement.props.removeNode(actNode);
    treePickerPureElement.props.removeNode(ntNode);

    expect(treePickerPureElement.props.selectedNodesByRootType).to.deep.equal(_.groupBy([maleNode], 'rootTypeId'));
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
    const applyMock = (selectedIds) => {applyCalls = selectedIds;};

    const closeMock = () => {closeCalls += 1;};

    const component = createAndMountComponent(TreePickerComponent, {
      modalApply: applyMock,
      modalClose: closeMock,
      initialSelection,
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    applyButtonElement.props.onClick();

    expect(applyCalls).to.deep.equal({ a: ['au-act', 'au-nt'] });
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createAndMountComponent(TreePickerComponent, { initialSelection });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.props.onClick).to.throw(
      'AdslotUi TreePicker needs a modalApply handler for {"a":["au-act","au-nt"]}'
    );
  });

  it('should call `modalClose` and re-fetch data when we click Cancel', () => {
    let closeCalls = 0;
    let getSubtreeCalls = 0;
    const closeMock = () => {closeCalls += 1;};

    const getSubtreeMock = ({ rootTypeId, query, nodeId }, cb) => {
      getSubtreeCalls += 1;
      if (getSubtreeCalls === 2) { return cb([maleNode]); }

      return cb([]);
    };

    const shallowRenderer = createShallowRenderer(TreePickerComponent, {
      getSubtree: getSubtreeMock,
      modalClose: closeMock,
    });
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
    const closeMock = () => {closeCalls += 1;};

    const getSubtreeMock = ({ rootTypeId, query, nodeId }, cb) => {
      getSubtreeCalls += 1;
      if (getSubtreeCalls === 2) {return cb([maleNode]);}

      return cb([]);
    };

    const shallowRenderer = createShallowRenderer(TreePickerComponent, {
      getSubtree: getSubtreeMock,
      modalClose: closeMock,
    });
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

  it('should load data again if the initialSelection changes with new ids', () => {
    let getSubtreeCount = 0;
    const initialProps = {
      initialSelection,
      getSubtree: (options, cb) => {
        getSubtreeCount += 1;
        cb();
      },
    };
    const shallowRenderer = createShallowRenderer(TreePickerComponent, initialProps);
    runComponentDidMount({ shallowRenderer });

    checkLoadingData({ expectedCount: 1, expectedSelection: initialSelection, getSubtreeCount, shallowRenderer });

    const nextProps = _.defaults({
      initialSelection: [maleNode],
    }, initialProps);
    runComponentWillReceiveProps({ shallowRenderer, nextProps });

    checkLoadingData({ expectedCount: 2, expectedSelection: [maleNode], getSubtreeCount, shallowRenderer });
  });

  it('should not load data again if the initialSelection changes with the same ids', () => {
    let getSubtreeCount = 0;
    const initialProps = {
      initialSelection,
      getSubtree: (options, cb) => {
        getSubtreeCount += 1;
        cb();
      },
    };
    const shallowRenderer = createShallowRenderer(TreePickerComponent, initialProps);
    runComponentDidMount({ shallowRenderer });

    checkLoadingData({ expectedCount: 1, expectedSelection: initialSelection, getSubtreeCount, shallowRenderer });

    const nextProps = _.defaults({
      initialSelection: _.clone(initialSelection).reverse(),
    }, initialProps);
    runComponentWillReceiveProps({ shallowRenderer, nextProps });

    checkLoadingData({ expectedCount: 1, expectedSelection: initialSelection, getSubtreeCount, shallowRenderer });
  });
});
