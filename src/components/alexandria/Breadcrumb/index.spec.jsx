/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import _ from 'lodash';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import BreadcrumbNode from 'alexandria/Breadcrumb/Node';
import Breadcrumb from '.';

describe('Breadcrumb', () => {
  let nodes;
  let sandbox = null;
  const onClick = _.noop;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    nodes = [
      { id: 'a', label: 'Canada' },
      { id: 'b', label: 'British Columbia' },
      { id: 'c', label: 'Victoria' },
    ];
  });

  afterEach(() => sandbox.restore());

  it('should render empty with the component className when no nodes', () => {
    const component = shallow(<Breadcrumb />);
    expect(component.hasClass('breadcrumb-component')).to.equal(true);
    expect(component.hasClass('disabled')).to.equal(false);
    expect(component.find(BreadcrumbNode)).to.have.length(0);
  });

  it('should render nodes', () => {
    const component = shallow(<Breadcrumb nodes={nodes} />);
    expect(component.hasClass('breadcrumb-component')).to.equal(true);
    expect(component.hasClass('disabled')).to.equal(false);
    expect(component.find(BreadcrumbNode)).to.have.length(4);

    const allLink = component.children().first();
    expect(allLink.type()).to.equal(BreadcrumbNode);
    expect(allLink.prop('isLast')).to.equal(false);
    expect(allLink.prop('node')).to.deep.equal({ id: 'all', label: 'All' });
    expect(allLink.prop('onClick')).to.be.a('function');

    const nodeWrapperElements = component.find('.breadcrumb-component-node');
    expect(nodeWrapperElements).to.have.length(nodes.length);
    nodeWrapperElements.forEach((nodeWrapperElement, index) => {
      const dividerElement = nodeWrapperElement.find('.breadcrumb-component-node-divider');
      expect(dividerElement.text()).to.equal(' > ');

      const nodeElement = nodeWrapperElement.find(BreadcrumbNode);
      expect(nodeElement.prop('node')).to.equal(nodes[index]);

      expect(nodeElement.prop('isLast')).to.equal(index === nodes.length - 1);
      expect(nodeElement.prop('onClick')).to.be.a('function');
    });
  });

  it('should error when clicking a node with no onClick handler', () => {
    const component = shallow(<Breadcrumb nodes={nodes} />);
    const allLinkElement = component.children().first();
    expect(() => {
      allLinkElement.simulate('click', 'all');
    }).to.throw('Alexandria Breadcrumb needs an onClick handler to take all');
  });

  it('should call props.onClick when clicking a node with onClick handler', () => {
    const props = { onClick, nodes };
    sandbox.spy(props, 'onClick');

    const component = shallow(<Breadcrumb {...props} />);
    const allLinkElement = component.children().first();
    allLinkElement.simulate('click', 'all');
    expect(props.onClick.called).to.equal(true);
  });

  describe('disabled', () => {
    const props = {
      onClick,
      nodes,
      disabled: true,
    };
    let component = null;

    beforeEach(() => {
      sandbox.spy(props, 'onClick');
      component = shallow(<Breadcrumb {...props} />);
    });

    it('should have disabled class', () => expect(component.hasClass('disabled')).to.equal(true));

    it('should not call props.onClick when clicked on breadcrumbs node', () => {
      const allLinkElement = component.children().first();
      allLinkElement.simulate('click', 'all');
      expect(props.onClick.called).to.equal(false);
    });
  });
});
