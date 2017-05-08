import BreadcrumbComponent from 'components/alexandria/BreadcrumbComponent';
import BreadcrumbNodeComponent from 'components/alexandria/BreadcrumbNodeComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('BreadcrumbComponent', () => {
  let nodes;

  beforeEach(() => {
    nodes = [
      { id: 'a', label: 'Canada' },
      { id: 'b', label: 'British Columbia' },
      { id: 'c', label: 'Victoria' },
    ];
  });

  it('should render empty with the component className when no nodes', () => {
    const component = shallow(<BreadcrumbComponent />);
    expect(component.prop('className')).to.equal('breadcrumb-component');
    expect(component.find(BreadcrumbNodeComponent)).to.have.length(0);
  });

  it('should render nodes', () => {
    const component = shallow(<BreadcrumbComponent nodes={nodes} />);
    expect(component.prop('className')).to.equal('breadcrumb-component');
    expect(component.find(BreadcrumbNodeComponent)).to.have.length(4);

    const allLink = component.children().first();
    expect(allLink.type()).to.equal(BreadcrumbNodeComponent);
    expect(allLink.prop('isLast')).to.equal(false);
    expect(allLink.prop('node')).to.deep.equal({ id: 'all', label: 'All' });
    expect(allLink.prop('onClick')).to.be.a('function');

    const nodeWrapperElements = component.find('.breadcrumb-component-node');
    expect(nodeWrapperElements).to.have.length(nodes.length);
    nodeWrapperElements.forEach((nodeWrapperElement, index) => {
      const dividerElement = nodeWrapperElement.find('.breadcrumb-component-node-divider');
      expect(dividerElement.text()).to.equal(' > ');

      const nodeElement = nodeWrapperElement.find(BreadcrumbNodeComponent);
      expect(nodeElement.prop('node')).to.equal(nodes[index]);

      expect(nodeElement.prop('isLast')).to.equal(index === nodes.length - 1);
      expect(nodeElement.prop('onClick')).to.be.a('function');
    });
  });
  it('should error when clicking a node with no onClick handler', () => {
    const component = shallow(<BreadcrumbComponent nodes={nodes} />);
    const allLinkElement = component.children().first();
    expect(() => {
      allLinkElement.simulate('click', 'all');
    }).to.throw('Alexandria Breadcrumb needs an onClick handler to take all');
  });
});
