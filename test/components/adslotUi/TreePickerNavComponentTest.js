import React from 'react';
import TreePickerNavComponent from 'components/adslotUi/TreePickerNavComponent';
import { Breadcrumb, Search } from 'alexandria-adslot';
import { createComponent } from 'testHelpers/shallowRenderHelpers';

describe('TreePickerNavComponent', () => {
  it('should render with defaults', () => {
    const component = createComponent(TreePickerNavComponent);
    expect(component.props.className).to.equal('treepickernav-component');
    expect(component.props.children).to.have.length(2);

    const searchElement = component.props.children[0];
    expect(searchElement.type).to.equal((<Search />).type);

    const breadcrumbElement = component.props.children[1];
    expect(breadcrumbElement.type).to.equal((<Breadcrumb />).type);
  });

  it('should render with props', () => {
    const testFunction = () => null;
    const breadcrumbNodes = [
      { id: 'a', label: 'UK' },
      { id: 'b', label: 'London' },
    ];
    const component = createComponent(TreePickerNavComponent, {
      breadcrumbNodes,
      breadcrumbOnClick: testFunction,
      searchOnChange: testFunction,
      searchOnClear: testFunction,
      searchValue: 'needle',
    });
    expect(component.props.className).to.equal('treepickernav-component');
    expect(component.props.children).to.have.length(2);

    const searchElement = component.props.children[0];
    expect(searchElement.type).to.equal((<Search />).type);
    expect(searchElement.props.onChange).to.equal(testFunction);
    expect(searchElement.props.onClear).to.equal(testFunction);
    expect(searchElement.props.value).to.equal('needle');

    const breadcrumbElement = component.props.children[1];
    expect(breadcrumbElement.type).to.equal((<Breadcrumb />).type);
    expect(breadcrumbElement.props.nodes).to.equal(breadcrumbNodes);
    expect(breadcrumbElement.props.onClick).to.equal(testFunction);
  });
});
