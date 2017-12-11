import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import FlexibleSpacer from 'alexandria/FlexibleSpacer';
import SplitPaneComponent from 'adslot-ui/SplitPane';
import TreePickerNav from 'adslot-ui/TreePicker/Nav';
import TreePickerSimplePure, { removeSelected } from 'adslot-ui/TreePicker';
import TreePickerGrid from 'adslot-ui/TreePicker/Grid';
import TreePickerMocks from './mocks';

const checkElement = expectedProps => (element, propsList) =>
  _.forEach(propsList, propName => expect(element.prop(propName)).to.equal(expectedProps[propName]));

describe('TreePickerSimplePureComponent', () => {
  const { actNode, initialSelection, itemType, ntNode, qldNode, saNode, svgSymbol } = TreePickerMocks;

  const props = {
    breadcrumbNodes: [saNode],
    breadcrumbOnClick: _.noop,
    emptySvgSymbol: svgSymbol,
    initialStateNode: 'Begin searching.',
    initialStateSymbol: TreePickerMocks.svgSymbol,
    expandNode: _.noop,
    includeNode: _.noop,
    itemType,
    nodeRenderer: _.noop,
    removeNode: _.noop,
    onClear: _.noop,
    onChange: _.noop,
    onSearch: _.noop,
    searchOnChange: true,
    searchOnEnterKey: false,
    searchPlaceholder: 'Search Geometry',
    searchValue: '',
    selectedNodes: initialSelection,
    subtree: [qldNode, saNode, actNode, ntNode],
    svgSymbolCancel: svgSymbol,
    svgSymbolSearch: svgSymbol,
    hideSearchOnRoot: false,
  };

  it('should render with props', () => {
    const component = shallow(<TreePickerSimplePure {...props} />);
    expect(component.prop('className')).to.equal('treepickersimplepure-component ');

    expect(component.find(SplitPaneComponent)).to.have.length(2);
    expect(component.children().every(SplitPaneComponent)).to.equal(true);
    expect(
      component
        .find(TreePickerGrid)
        .first()
        .prop('Begin searching.')
    );

    const navElement = component.find(TreePickerNav);
    expect(navElement).to.have.length(1);

    const checkElementProps = checkElement(props);
    checkElementProps(navElement, [
      'breadcrumbNodes',
      'breadcrumbOnClick',
      'onClear',
      'onChange',
      'onSearch',
      'searchOnChange',
      'searchPlaceholder',
      'searchValue',
      'svgSymbolCancel',
      'svgSymbolSearch',
    ]);

    const leftPaneElement = component.find({
      dts: `treepicker-splitpane-available-${_.kebabCase(itemType)}`,
    });
    expect(leftPaneElement.find(FlexibleSpacer)).to.have.length(1);

    const rightPaneElement = component.find({
      dts: `treepicker-splitpane-selected-${_.kebabCase(itemType)}`,
    });
    expect(rightPaneElement.find(FlexibleSpacer)).to.have.length(1);
  });

  it('should render with given empty state node', () => {
    const loaderStateProps = _.assign({}, props, {
      emptyText: 'Loading...',
      searchValue: 'Victoria',
      initialSelection: [],
    });

    const component = shallow(<TreePickerSimplePure {...loaderStateProps} />);
    expect(
      component
        .find(TreePickerGrid)
        .first()
        .prop('Loading...')
    );
  });

  it('should render with default empty state props', () => {
    const emptyStateProps = _.assign({}, props, {
      searchValue: 'Victoria',
      initialSelection: [],
    });

    const component = shallow(<TreePickerSimplePure {...emptyStateProps} />);
    expect(
      component
        .find(TreePickerGrid)
        .first()
        .prop('No items to select.')
    );
  });

  it('should render with given empty text and svg icon for the selected side', () => {
    const emptyStateProps = _.assign({}, props, {
      searchValue: 'Victoria',
      initialSelection: [],
      emptySelectedListText: 'Nothing to show',
      emptySelectedListSvgSymbol: TreePickerMocks.svgSymbol,
    });

    const component = shallow(<TreePickerSimplePure {...emptyStateProps} />);
    expect(
      component
        .find(TreePickerGrid)
        .first()
        .prop('No items to select.')
    );
    expect(
      component
        .find(TreePickerGrid)
        .last()
        .prop('Nothing to show')
    );
  });

  it('should render with given empty selected state node', () => {
    const loaderStateProps = _.assign({}, props, {
      initialSelectedStateNode: 'Select...',
      selectedNodes: [],
    });

    const component = shallow(<TreePickerSimplePure {...loaderStateProps} />);
    expect(
      component
        .find(TreePickerGrid)
        .last()
        .prop('Select...')
    );
  });

  it('should have disabled class included when disabled set to true', () => {
    const component = shallow(<TreePickerSimplePure disabled {...props} />);
    expect(component.prop('className')).to.equal('treepickersimplepure-component disabled');
  });

  it('should not render TreePickerNav when hideSearchOnRoot is true and on root level ', () => {
    const hideSearchOnRootProps = _.assign({}, props, {
      hideSearchOnRoot: true,
      breadcrumbNodes: [],
    });
    const component = shallow(<TreePickerSimplePure {...hideSearchOnRootProps} />);
    const navElement = component.find(TreePickerNav);
    expect(navElement).to.have.length(0);
  });

  it('should render TreePickerNav when hideSearchOnRoot is true and not on root level', () => {
    const hideSearchOnRootProps = _.assign({}, props, {
      hideSearchOnRoot: true,
    });
    const component = shallow(<TreePickerSimplePure {...hideSearchOnRootProps} />);
    const navElement = component.find(TreePickerNav);
    expect(navElement).to.have.length(1);
  });

  describe('removeSelected', () => {
    it('should remove selected nodes from a subtree', () => {
      const subtree = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).to.deep.equal([{ id: 2 }]);
    });

    it('should return an empty array when passed an empty subtree', () => {
      const subtree = [];
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).to.deep.equal([]);
    });

    it('should return undefined when passed an undefined subtree', () => {
      const subtree = undefined;
      const selectedNodes = [{ id: 1 }, { id: 3 }];

      expect(removeSelected({ subtree, selectedNodes })).to.equal(undefined);
    });
  });
});
