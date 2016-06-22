import _ from 'lodash';
import React from 'react';
import SplitPaneComponent from 'components/adslotUi/SplitPaneComponent';
import TreePickerMocks from 'mocks/TreePickerMocks';
import TreePickerNav from 'components/adslotUi/TreePickerNavComponent';
import TreePickerSimplePure from 'components/adslotUi/TreePickerSimplePureComponent';
import { FlexibleSpacer } from 'alexandria-adslot';
import { shallow } from 'enzyme';

const checkElement = (expectedProps) =>
  (element, propsList) =>
    _.forEach(propsList, (propName) =>
      expect(element.prop(propName)).to.equal(expectedProps[propName]));

describe('TreePickerSimplePureComponent', () => {
  it('should render with props', () => {
    const props = {
      breadcrumbNodes: [TreePickerMocks.saNode],
      breadcrumbOnClick: _.noop,
      emptySvgSymbol: TreePickerMocks.svgSymbol,
      expandNode: _.noop,
      includeNode: _.noop,
      removeNode: _.noop,
      searchOnChange: _.noop,
      searchOnClear: _.noop,
      searchPlaceholder: 'Search Geometry',
      searchValue: '',
      selectedNodes: TreePickerMocks.initialSelection,
      subtree: [TreePickerMocks.qldNode, TreePickerMocks.saNode, TreePickerMocks.actNode, TreePickerMocks.ntNode],
      svgSymbolCancel: TreePickerMocks.svgSymbol,
      svgSymbolSearch: TreePickerMocks.svgSymbol,
    };
    const component = shallow(<TreePickerSimplePure {...props} />);
    expect(component.prop('className')).to.equal('treepickersimplepure-component');

    expect(component.find(SplitPaneComponent)).to.have.length(2);
    expect(component.children().every(SplitPaneComponent)).to.equal(true);

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

    const leftPaneElement = component.find(SplitPaneComponent).at(0);
    expect(leftPaneElement.find(FlexibleSpacer)).to.have.length(1);

    const rightPaneElement = component.find(SplitPaneComponent).at(1);
    expect(rightPaneElement.find(FlexibleSpacer)).to.have.length(1);
  });
});
