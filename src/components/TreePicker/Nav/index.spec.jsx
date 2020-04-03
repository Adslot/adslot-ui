import _ from 'lodash';
import { Search, Breadcrumb } from 'adslot-ui';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import BreadcrumbNode from '../../Breadcrumb/Node';
import TreePickerNavComponent from '.';

const testFunction = _.noop;
const breadcrumbNodes = [{ id: 'a', label: 'UK' }, { id: 'b', label: 'London' }];

const mockProps = overrides => ({
  breadcrumbNodes,
  breadcrumbOnClick: testFunction,
  onChange: testFunction,
  onClear: testFunction,
  searchValue: 'needle',
  disabled: false,
  ...overrides,
});

describe('TreePickerNavComponent', () => {
  let sandbox = null;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => sandbox.restore());

  it('should render with defaults', () => {
    const component = shallow(<TreePickerNavComponent />);
    expect(component.hasClass('treepickernav-component')).to.equal(true);
    expect(component.hasClass('disabled')).to.equal(false);
    expect(component.children()).to.have.length(2);

    const searchElement = component.find(Search);
    expect(searchElement).to.have.length(1);
    expect(searchElement.prop('onSearch')).to.be.a('function');

    expect(_.isEmpty(searchElement.prop('icons'))).to.equal(true);

    const breadcrumbElement = component.find(Breadcrumb);
    expect(breadcrumbElement).to.have.length(1);
  });

  it('should render with props', () => {
    const component = shallow(<TreePickerNavComponent {...mockProps()} />);
    expect(component.hasClass('treepickernav-component')).to.equal(true);
    expect(component.hasClass('disabled')).to.equal(false);
    expect(component.children()).to.have.length(2);

    const searchElement = component.find(Search);
    expect(searchElement.prop('onChange')).to.equal(testFunction);
    expect(searchElement.prop('onClear')).to.equal(testFunction);
    expect(searchElement.prop('value')).to.equal('needle');

    const breadcrumbElement = component.find(Breadcrumb);
    expect(breadcrumbElement.prop('nodes')).to.equal(breadcrumbNodes);
    expect(breadcrumbElement.prop('onClick')).to.be.a('function');
  });

  it('should render icons with given svgSymbol and pass them to Search', () => {
    const component = shallow(
      <TreePickerNavComponent {...mockProps()} svgSymbolSearch={<div />} svgSymbolCancel={<div />} />
    );
    const searchElement = component.find(Search);
    expect(searchElement.prop('icons')).to.have.keys(['search', 'close']);
  });

  it('should call breadcrumbOnClick when clicked on breadcrumbs node', () => {
    const props = mockProps();
    sandbox.spy(props, 'breadcrumbOnClick');
    const component = mount(<TreePickerNavComponent {...props} />);
    const breadcrumbElement = component.find(Breadcrumb);
    const breadcrumbNodeElement = breadcrumbElement.find(BreadcrumbNode);

    breadcrumbNodeElement.first().simulate('click');
    expect(props.breadcrumbOnClick.calledOnce).to.equal(true);
  });

  it('should hide the search when showSearch is false', () => {
    const component = mount(<TreePickerNavComponent {...mockProps({ showSearch: false })} />);
    expect(component.find(Search)).to.have.length(0);
  });

  describe('disabled', () => {
    let component = null;
    let breadcrumbElement = null;
    let breadcrumbNodeElement = null;
    let props = null;

    beforeEach(() => {
      props = mockProps({ disabled: true });
      sandbox.spy(props, 'breadcrumbOnClick');
      component = mount(<TreePickerNavComponent {...props} />);
      breadcrumbElement = component.find(Breadcrumb);
      breadcrumbNodeElement = breadcrumbElement.find(BreadcrumbNode);
    });

    it('should have disabled class', () => expect(component.childAt(0).hasClass('disabled')).to.equal(true));

    it('should render breadcrumbs', () => expect(breadcrumbElement).to.have.length(1));

    it('should render breadcrumbs node', () => expect(breadcrumbNodeElement).to.have.length(3));

    it('should not call breadcrumbOnClick when clicked on breadcrumbs node', () => {
      breadcrumbNodeElement.first().simulate('click');
      expect(props.breadcrumbOnClick.called).to.equal(false);
    });
  });
});
