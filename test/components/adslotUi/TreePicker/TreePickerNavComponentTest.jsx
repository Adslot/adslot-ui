import _ from 'lodash';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import TreePickerNavComponent from 'components/adslotUi/TreePicker/TreePickerNavComponent';
import Breadcrumb from 'components/alexandria/Breadcrumb';
import BreadcrumbNode from 'components/alexandria/Breadcrumb/Node';
import Search from 'components/alexandria/Search';

describe('TreePickerNavComponent', () => {
  const testFunction = _.noop;
  const breadcrumbNodes = [
    { id: 'a', label: 'UK' },
    { id: 'b', label: 'London' },
  ];
  const props = {
    breadcrumbNodes,
    breadcrumbOnClick: testFunction,
    searchOnChange: testFunction,
    searchOnClear: testFunction,
    searchValue: 'needle',
    disabled: false,
  };
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

    const breadcrumbElement = component.find(Breadcrumb);
    expect(breadcrumbElement).to.have.length(1);
  });

  it('should render with props', () => {
    const component = shallow(<TreePickerNavComponent {...props} />);
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

  it('should call breadcrumbOnClick when clicked on breadcrumbs node', () => {
    sandbox.spy(props, 'breadcrumbOnClick');
    const component = mount(<TreePickerNavComponent {...props} />);
    const breadcrumbElement = component.find(Breadcrumb);
    const breadcrumbNodeElement = breadcrumbElement.find(BreadcrumbNode);

    breadcrumbNodeElement.first().simulate('click');
    expect(props.breadcrumbOnClick.calledOnce).to.equal(true);
  });

  describe('disabled', () => {
    let component = null;
    let breadcrumbElement = null;
    let breadcrumbNodeElement = null;
    let disabledProps = null;

    beforeEach(() => {
      disabledProps = _.assign({}, props, { disabled: true });
      sandbox.spy(props, 'breadcrumbOnClick');
      component = mount(<TreePickerNavComponent {...disabledProps} />);
      breadcrumbElement = component.find(Breadcrumb);
      breadcrumbNodeElement = breadcrumbElement.find(BreadcrumbNode);
    });

    it('should have disabled class', () => expect(component.hasClass('disabled')).to.equal(true));

    it('should render breadcrumbs', () => expect(breadcrumbElement).to.have.length(1));

    it('should render breadcrumbs node', () => expect(breadcrumbNodeElement).to.have.length(3));

    it('should not call breadcrumbOnClick when clicked on breadcrumbs node', () => {
      breadcrumbNodeElement.first().simulate('click');
      expect(props.breadcrumbOnClick.called).to.equal(false);
    });
  });
});
