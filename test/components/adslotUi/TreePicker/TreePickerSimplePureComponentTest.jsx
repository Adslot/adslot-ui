import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import SplitPaneComponent from 'components/adslotUi/SplitPaneComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';
import TreePickerNav from 'components/adslotUi/TreePicker/TreePickerNavComponent';
import TreePickerSimplePure from 'components/adslotUi/TreePicker/TreePickerSimplePureComponent';
import TreePickerGrid from 'components/adslotUi/TreePicker/TreePickerGridComponent';
import FlexibleSpacer from 'components/alexandria/FlexibleSpacer';

const checkElement = (expectedProps) =>
  (element, propsList) =>
    _.forEach(propsList, (propName) =>
      expect(element.prop(propName)).to.equal(expectedProps[propName]));

describe('TreePickerSimplePureComponent', () => {
  const {
    actNode,
    initialSelection,
    itemType,
    ntNode,
    qldNode,
    saNode,
    svgSymbol,
  } = TreePickerMocks;

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
    searchOnChange: _.noop,
    searchOnClear: _.noop,
    searchPlaceholder: 'Search Geometry',
    searchValue: '',
    selectedNodes: initialSelection,
    subtree: [qldNode, saNode, actNode, ntNode],
    svgSymbolCancel: svgSymbol,
    svgSymbolSearch: svgSymbol,
  };

  it('should render with props', () => {
    const component = shallow(<TreePickerSimplePure {...props} />);
    expect(component.prop('className')).to.equal('treepickersimplepure-component');

    expect(component.find(SplitPaneComponent)).to.have.length(2);
    expect(component.children().every(SplitPaneComponent)).to.equal(true);
    expect(component.find(TreePickerGrid).first().prop('Begin searching.'));

    const navElement = component.find(TreePickerNav);
    expect(navElement).to.have.length(1);

    const checkElementProps = checkElement(props);
    checkElementProps(navElement, [
      'breadcrumbNodes',
      'breadcrumbOnClick',
      'searchOnChange',
      'searchOnClear',
      'searchPlaceholder',
      'searchValue',
      'svgSymbolCancel',
      'svgSymbolSearch',
    ]);

    const leftPaneElement = component.find({ dts: `treepicker-splitpane-available-${_.kebabCase(itemType)}` });
    expect(leftPaneElement.find(FlexibleSpacer)).to.have.length(1);

    const rightPaneElement = component.find({ dts: `treepicker-splitpane-selected-${_.kebabCase(itemType)}` });
    expect(rightPaneElement.find(FlexibleSpacer)).to.have.length(1);
  });

  it('should render with given empty state node', () => {
    const loaderStateProps = _.assign({}, props, {
      emptyText: 'Loading...',
      searchValue: 'Victoria',
      initialSelection: [],
    });

    const component = shallow(<TreePickerSimplePure {...loaderStateProps} />);
    expect(component.find(TreePickerGrid).first().prop('Loading...'));
  });

  it('should render with default empty state props', () => {
    const emptyStateProps = _.assign({}, props, {
      searchValue: 'Victoria',
      initialSelection: [],
    });

    const component = shallow(<TreePickerSimplePure {...emptyStateProps} />);
    expect(component.find(TreePickerGrid).first().prop('No items to select.'));
  });

  it('should render with given empty text and svg icon for the selected side', () => {
    const emptyStateProps = _.assign({}, props, {
      searchValue: 'Victoria',
      initialSelection: [],
      emptySelectedListText: 'Nothing to show',
      emptySelectedListSvgSymbol: TreePickerMocks.svgSymbol,
    });

    const component = shallow(<TreePickerSimplePure {...emptyStateProps} />);
    expect(component.find(TreePickerGrid).first().prop('No items to select.'));
    expect(component.find(TreePickerGrid).last().prop('Nothing to show'));
  });

  it('should render with given empty selected state node', () => {
    const loaderStateProps = _.assign({}, props, {
      initialSelectedStateNode: 'Select...',
      selectedNodes: [],
    });

    const component = shallow(<TreePickerSimplePure {...loaderStateProps} />);
    expect(component.find(TreePickerGrid).last().prop('Select...'));
  });
});
