import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import TreePickerComponent from 'components/adslotUi/TreePickerComponent';
import TreePickerPureComponent from 'components/adslotUi/TreePickerPureComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';
import {
  createAndMountComponent,
  runComponentWillReceiveProps,
} from 'testHelpers/shallowRenderHelpers';
import { shallow } from 'enzyme';

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
    const modalBodyElement = rootComponent.find(Modal.Body);
    return modalBodyElement.find(TreePickerPureComponent);
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
    const props = { initialSelection, getSubtree, rootTypes, throttleTime: 0 };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    return { component, treePickerPureElement: getTreePickerPureElement(component) };
  };

  const checkLoadingData = ({
    component,
    expectedCount,
    expectedSelection,
    getSubtreeCount,
  }) => {
    expect(getSubtreeCount).to.equal(expectedCount);
    const treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.prop('selectedNodesByRootType')).to.deep.equal(
      _.groupBy(expectedSelection, 'rootTypeId')
    );
  };

  it('should render with defaults', () => {
    const component = createAndMountComponent(<TreePickerComponent />);
    expect(component.prop('className')).to.equal('treepicker-component');
    expect(component.type()).to.equal(Modal);
    expect(component.prop('show')).to.equal(false);
    expect(component.prop('bsSize')).to.equal('large');
    expect(component.prop('keyboard')).to.equal(false);

    const modalHeaderElement = component.find(Modal.Header);
    const modalTitleElement = modalHeaderElement.find(Modal.Title);
    expect(modalTitleElement.children().text()).to.equal('Edit Tree');

    const modalBodyElement = component.find(Modal.Body);
    const treePickerPureElement = modalBodyElement.find(TreePickerPureComponent);
    expect(treePickerPureElement.prop('activeRootTypeId')).to.be.an('undefined');
    expect(treePickerPureElement.prop('averageWithinRootType')).to.equal(false);
    expect(treePickerPureElement.prop('baseItem')).to.be.an('undefined');
    expect(treePickerPureElement.prop('breadcrumbNodes')).to.deep.equal([]);
    expect(treePickerPureElement.prop('breadcrumbOnClick')).to.be.a('function');
    expect(treePickerPureElement.prop('emptySvgSymbol')).to.be.an('undefined');
    expect(treePickerPureElement.prop('expandNode')).to.be.a('function');
    expect(treePickerPureElement.prop('includeNode')).to.be.a('function');
    expect(treePickerPureElement.prop('removeNode')).to.be.a('function');
    expect(treePickerPureElement.prop('rootTypes')).to.deep.equal([]);
    expect(treePickerPureElement.prop('searchOnChange')).to.be.a('function');
    expect(treePickerPureElement.prop('searchOnClear')).to.be.a('function');
    expect(treePickerPureElement.prop('searchValue')).to.equal('');
    expect(treePickerPureElement.prop('selectedNodesByRootType')).to.deep.equal({});
    expect(treePickerPureElement.prop('subtree')).to.deep.equal([]);
    expect(treePickerPureElement.prop('totalsSuffix')).to.be.an('undefined');
    expect(treePickerPureElement.prop('valueFormatter')).to.be.an('undefined');
    expect(treePickerPureElement.prop('warnOnRequired')).to.equal(false);

    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find(Button).first();
    expect(cancelButtonElement.prop('data-test-selector')).to.equal('treepicker-cancel-button');
    expect(cancelButtonElement.prop('className')).to.equal('btn-inverse');
    expect(cancelButtonElement.prop('onClick')).to.be.a('function');
    expect(cancelButtonElement.children().text()).to.equal('Cancel');

    const applyButtonElement = modalFooterElement.find(Button).last();
    expect(applyButtonElement.prop('data-test-selector')).to.equal('treepicker-apply-button');
    expect(applyButtonElement.prop('bsStyle')).to.equal('primary');
    expect(applyButtonElement.prop('onClick')).to.be.a('function');
    expect(applyButtonElement.children().text()).to.equal('Apply');
  });

  it('should render with props', () => {
    const props = {
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
      totalsSuffix: 'CPD',
      valueFormatter,
      warnOnRequired: true,
    };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    expect(component.prop('className')).to.equal('treepicker-component');

    const modalHeaderElement = component.find(Modal.Header);
    const modalTitleElement = modalHeaderElement.find(Modal.Title);
    expect(modalTitleElement.children().text()).to.equal('Edit Targeting');

    const treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.prop('activeRootTypeId')).to.equal('a');
    expect(treePickerPureElement.prop('averageWithinRootType')).to.equal(true);
    expect(treePickerPureElement.prop('baseItem')).to.equal(baseItem);
    expect(treePickerPureElement.prop('breadcrumbNodes')).to.deep.equal([]);
    expect(treePickerPureElement.prop('breadcrumbOnClick')).to.be.a('function');
    expect(treePickerPureElement.prop('emptySvgSymbol')).to.deep.equal({ href: '/some.svg#id' });
    expect(treePickerPureElement.prop('expandNode')).to.be.a('function');
    expect(treePickerPureElement.prop('helpText')).to.deep.equal({
      average: 'An average explanation.',
      sum: 'The sum of all fears.',
    });
    expect(treePickerPureElement.prop('includeNode')).to.be.a('function');
    expect(treePickerPureElement.prop('removeNode')).to.be.a('function');
    expect(treePickerPureElement.prop('rootTypes')).to.equal(rootTypes);
    expect(treePickerPureElement.prop('searchOnChange')).to.be.a('function');
    expect(treePickerPureElement.prop('searchOnClear')).to.be.a('function');
    expect(treePickerPureElement.prop('searchValue')).to.equal('');
    expect(treePickerPureElement.prop('selectedLabel')).to.equal('Selected Targeting');
    expect(treePickerPureElement.prop('selectedNodesByRootType')).to.deep.equal(
      _.groupBy(initialSelection, 'rootTypeId')
    );
    getSubtree({ rootTypeId: 'a' }, (subtree) => {
      expect(treePickerPureElement.prop('subtree')).to.deep.equal(subtree);
    });
    expect(treePickerPureElement.prop('totalsSuffix')).to.equal('CPD');
    expect(treePickerPureElement.prop('valueFormatter')).to.equal(valueFormatter);
    expect(treePickerPureElement.prop('warnOnRequired')).to.equal(true);
  });

  it('should change `activeRootTypeId`, `searchValue` and `subtree` after a changeRootType action', () => {
    const { component } = getShallowTreePickerPure();
    let treePickerPureElement = getTreePickerPureElement(component);

    // So we know if the searchValue has reset to blank.
    treePickerPureElement.props().searchOnChange('needle');
    expect(component.state('searchValue')).to.equal('needle');

    treePickerPureElement.props().changeRootType('b');
    component.update();

    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.prop('activeRootTypeId')).to.equal('b');
    expect(component.state('searchValue')).to.equal('');
    expect(component.state('subtree')).to.deep.equal([maleNode]);
  });

  it('should change `activeRootTypeId`, `breadcrumbNodes` and `subtree` after a changeRootType action', () => {
    const { component } = getShallowTreePickerPure();
    let treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props().expandNode(actNode);
    expect(component.state('breadcrumbNodes')).to.deep.equal([actNode]);

    treePickerPureElement.props().changeRootType('b');
    component.update();

    treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.prop('activeRootTypeId')).to.equal('b');
    expect(component.state('breadcrumbNodes')).to.deep.equal([]);
    expect(component.state('subtree')).to.deep.equal([maleNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after a search action, then again on search clear', () => {
    const { component, treePickerPureElement } = getShallowTreePickerPure();
    treePickerPureElement.props().searchOnChange('myQuery');
    expect(component.state('breadcrumbNodes')).to.deep.equal([]);
    expect(component.state('subtree')).to.deep.equal([ntNode, saNode]);

    treePickerPureElement.props().searchOnClear();
    expect(component.state('subtree')).to.deep.equal([
      actNode,
      ntNode,
      qldNode,
      saNode,
    ]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after a breadcrumbOnClick action of `all`', () => {
    const { component, treePickerPureElement } = getShallowTreePickerPure();
    treePickerPureElement.props().expandNode(actNode);
    expect(component.state('breadcrumbNodes')).to.deep.equal([actNode]);
    expect(component.state('subtree')).to.deep.equal([cbrNode]);

    treePickerPureElement.props().breadcrumbOnClick('all');
    expect(component.state('breadcrumbNodes')).to.deep.equal([]);
    getSubtree({ rootTypeId: 'a' }, (subtree) => {
      expect(component.state('subtree')).to.deep.equal(subtree);
    });
  });

  it('should change `breadcrumbNodes` and `subtree` state after a breadcrumbOnClick action', () => {
    const { component, treePickerPureElement } = getShallowTreePickerPure();
    treePickerPureElement.props().expandNode(actNode);
    expect(component.state('breadcrumbNodes')).to.deep.equal([actNode]);
    expect(component.state('subtree')).to.deep.equal([cbrNode]);

    treePickerPureElement.props().expandNode(cbrNode);
    expect(component.state('breadcrumbNodes')).to.deep.equal([actNode, cbrNode]);
    expect(component.state('subtree')).to.deep.equal([]);

    treePickerPureElement.props().breadcrumbOnClick(actNode.id);
    expect(component.state('breadcrumbNodes')).to.deep.equal([actNode]);
    expect(component.state('subtree')).to.deep.equal([cbrNode]);
  });

  it('should change `breadcrumbNodes` and `subtree` state after an expandNode action', () => {
    const { component, treePickerPureElement } = getShallowTreePickerPure();
    treePickerPureElement.props().expandNode(actNode);
    expect(component.state('breadcrumbNodes')).to.deep.equal([actNode]);
    expect(component.state('subtree')).to.deep.equal([cbrNode]);
  });

  it('should change `selected` state after an includeNode action', () => {
    const props = { initialSelection, getSubtree, rootTypes };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);

    treePickerPureElement.prop('includeNode')(qldNode);
    expect(component.state('selectedNodesByRootType')).to.deep.equal(
      _.groupBy([actNode, ntNode, qldNode], 'rootTypeId')
    );
  });

  it('should change `selected` state after an includeNode action, removing subnodes of the added node', () => {
    const props = { initialSelection: [cbrNode], getSubtree, rootTypes };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props().includeNode(actNode);
    expect(component.state('selectedNodesByRootType')).to.deep.equal(_.groupBy([actNode], 'rootTypeId'));
  });

  it('should change `selected` state after an includeNode action, removing parents of the added node', () => {
    const props = { initialSelection: [actNode], getSubtree, rootTypes };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props().includeNode(cbrNode);
    expect(component.state('selectedNodesByRootType')).to.deep.equal(_.groupBy([cbrNode], 'rootTypeId'));
  });

  it('should change `selected` state after an includeNode action for a new rootType', () => {
    const props = { initialSelection, getSubtree, rootTypes };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props().includeNode(maleNode);
    expect(component.state('selectedNodesByRootType')).to.deep.equal(
      _.groupBy([actNode, ntNode, maleNode], 'rootTypeId')
    );
  });

  it('should change `selected` state after a removeNode action', () => {
    const props = { initialSelection, getSubtree, rootTypes };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props().removeNode(actNode);
    expect(component.state('selectedNodesByRootType')).to.deep.equal(_.groupBy([ntNode], 'rootTypeId'));
  });

  it('should change `selected` state to an empty object after a removeNode action on all nodes per rootType', () => {
    const props = { initialSelection, getSubtree, rootTypes };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);
    treePickerPureElement.props().changeRootType('b');
    treePickerPureElement.props().includeNode(maleNode);
    treePickerPureElement.props().removeNode(actNode);
    treePickerPureElement.props().removeNode(ntNode);
    expect(component.state('selectedNodesByRootType')).to.deep.equal(_.groupBy([maleNode], 'rootTypeId'));
  });

  it('should show modal when `show` is true', () => {
    const component = createAndMountComponent(<TreePickerComponent show />);
    expect(component.prop('show')).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createAndMountComponent(<TreePickerComponent show={false} />);
    expect(component.prop('show')).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = null;
    let closeCalls = 0;
    const applyMock = (selectedIds) => { applyCalls = selectedIds; };

    const closeMock = () => { closeCalls += 1; };

    const props = {
      modalApply: applyMock,
      modalClose: closeMock,
      initialSelection,
    };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find('[data-test-selector="treepicker-apply-button"]');
    applyButtonElement.simulate('click');
    expect(applyCalls).to.deep.equal({ a: ['au-act', 'au-nt'] });
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createAndMountComponent(<TreePickerComponent initialSelection={initialSelection} />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find('[data-test-selector="treepicker-apply-button"]');
    expect(() => applyButtonElement.simulate('click')).to.throw(
      'AdslotUi TreePicker needs a modalApply handler for {"a":["au-act","au-nt"]}'
    );
  });

  it('should call `modalClose` and re-fetch data when we click Cancel', () => {
    let closeCalls = 0;
    let getSubtreeCalls = 0;
    const closeMock = () => { closeCalls += 1; };

    const getSubtreeMock = ({ rootTypeId, query, nodeId }, cb) => {
      getSubtreeCalls += 1;
      if (getSubtreeCalls === 2) { return cb([maleNode]); }

      return cb([]);
    };

    const props = { getSubtree: getSubtreeMock, modalClose: closeMock };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find('[data-test-selector="treepicker-cancel-button"]');
    expect(getSubtreeCalls).to.equal(1);

    const treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.prop('subtree')).to.deep.equal([]);
    cancelButtonElement.simulate('click');
    expect(treePickerPureElement.prop('subtree')).to.deep.equal([]);
    expect(closeCalls).to.equal(1);
    expect(getSubtreeCalls).to.equal(2);
  });

  it('should not set the state to the new subtree if we unmount the component before the data returns', () => {
    let closeCalls = 0;
    let getSubtreeCalls = 0;
    const closeMock = () => { closeCalls += 1; };

    const getSubtreeMock = ({ rootTypeId, query, nodeId }, cb) => {
      getSubtreeCalls += 1;
      if (getSubtreeCalls === 2) { return cb([maleNode]); }

      return cb([]);
    };

    const props = { getSubtree: getSubtreeMock, modalClose: closeMock };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find('[data-test-selector="treepicker-cancel-button"]');
    expect(getSubtreeCalls).to.equal(1);

    const treePickerPureElement = getTreePickerPureElement(component);
    expect(treePickerPureElement.prop('subtree')).to.deep.equal([]);

    component.instance().componentWillUnmount();
    component.update();
    cancelButtonElement.simulate('click');
    expect(treePickerPureElement.prop('subtree')).to.deep.equal([]);
    expect(closeCalls).to.equal(1);
    expect(getSubtreeCalls).to.equal(2);
  });

  it('should throw when we click Close without a handler', () => {
    const component = shallow(<TreePickerComponent />);
    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find('[data-test-selector="treepicker-cancel-button"]');
    expect(() => cancelButtonElement.simulate('click')).to.throw('AdslotUi TreePicker needs a modalClose handler');
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
    const component = createAndMountComponent(<TreePickerComponent {...initialProps} />);
    checkLoadingData({ component, expectedCount: 1, expectedSelection: initialSelection, getSubtreeCount });

    const nextProps = _.defaults({
      initialSelection: [maleNode],
    }, initialProps);
    component.instance().componentWillReceiveProps(nextProps);
    component.update();
    checkLoadingData({ component, expectedCount: 2, expectedSelection: [maleNode], getSubtreeCount });
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
    const component = createAndMountComponent(<TreePickerComponent {...initialProps} />);
    checkLoadingData({ component, expectedCount: 1, expectedSelection: initialSelection, getSubtreeCount });

    const nextProps = _.defaults({
      initialSelection: _.clone(initialSelection).reverse(),
    }, initialProps);
    runComponentWillReceiveProps({ shallowRenderer: component, nextProps });
    checkLoadingData({ component, expectedCount: 1, expectedSelection: initialSelection, getSubtreeCount });
  });

  it('should not disable the include button when a root is below the maximum selections', () => {
    const maximumSelectionsByRootType = { a: 5 };

    const props = { initialSelection, getSubtree, rootTypes, throttleTime: 0, maximumSelectionsByRootType };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.prop('disableInclude')).to.equal(false);
  });

  it('should disable the include button when a root is above the maximum selections', () => {
    const maximumSelectionsByRootType = { a: 2 };

    const props = { initialSelection, getSubtree, rootTypes, throttleTime: 0, maximumSelectionsByRootType };
    const component = createAndMountComponent(<TreePickerComponent {...props} />);
    const treePickerPureElement = getTreePickerPureElement(component);

    expect(treePickerPureElement.prop('disableInclude')).to.equal(true);
  });
});
