import BreadcrumbNodeComponent from 'components/alexandria/BreadcrumbNodeComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('BreadcrumbNodeComponent', () => {
  let node;
  let onClick;

  beforeEach(() => {
    node = { id: 'a', label: 'Canada' };
    onClick = () => null;
  });

  it('should render a link node', () => {
    const props = { isLast: false, onClick, node };
    const component = shallow(<BreadcrumbNodeComponent {...props} />);

    expect(component.type()).to.equal('span');
    expect(component.prop('className')).to.equal('breadcrumbnode-component breadcrumbnode-component-link');
    expect(component.prop('onClick')).to.be.a('function');
    expect(component.text()).to.equal('Canada');
  });

  it('should render a last node', () => {
    const props = { isLast: true, onClick, node };
    const component = shallow(<BreadcrumbNodeComponent {...props} />);

    expect(component.type()).to.equal('span');
    expect(component.prop('className')).to.equal('breadcrumbnode-component');
    expect(component.prop('onClick')).to.be.an('undefined');
    expect(component.text()).to.equal('Canada');
  });

  it('should trigger onClick when clicking a node', () => {
    const idsRemoved = [];
    const onClickMock = (newActiveId) => idsRemoved.push(newActiveId);
    const props = { isLast: false, onClick: onClickMock, node };
    const component = shallow(<BreadcrumbNodeComponent {...props} />);

    expect(component.prop('className')).to.equal('breadcrumbnode-component breadcrumbnode-component-link');
    expect(component.text()).to.equal(node.label);

    component.simulate('click');
    expect(idsRemoved).to.deep.equal(['a']);
  });
});
