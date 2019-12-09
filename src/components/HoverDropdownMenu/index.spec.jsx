import _ from 'lodash';
import { Avatar, Popover } from 'adslot-ui';
import { shallow } from 'enzyme';
import React from 'react';
import { Button } from 'react-bootstrap';
import sinon from 'sinon';
import HoverDropdownMenu from '.';
import PopoverLinkItem from './PopoverLinkItem';

describe('HoverDropdownMenuComponent', () => {
  let links = [];
  let props = {};
  let sandbox = null;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    links = [
      {
        title: 'Link 1',
        url: 'www.some.url.com',
        target: '_self',
        isEnabled: true,
      },
      {
        title: 'Logout',
        url: 'http://www.google.com',
        target: '_self',
        isEnabled: true,
      },
    ];

    props = {
      headerText: 'test header',
      hoverComponent: <Avatar givenName="John" surname="Smith" tooltip="test tooltip" />,
      onLinkClick: _.noop,
    };

    sandbox.spy(props, 'onLinkClick');
  });

  afterEach(() => sandbox.restore());

  describe('componentDidUpdate()', () => {
    it('should add event handlers to popperNode', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      const instance = wrapper.instance();
      instance.popperNode = document.createElement('div');
      sandbox.spy(instance.popperNode, 'addEventListener');

      instance.componentDidUpdate();
      expect(instance.popperNode.addEventListener.callCount).to.equal(2);
      expect(instance.popperNode.addEventListener.args[0]).to.eql(['mouseenter', instance.popoverEnterHandler]);
      expect(instance.popperNode.addEventListener.args[1]).to.eql(['mouseleave', instance.popoverLeaveHandler]);
    });
  });

  describe('openMenu()', () => {
    it('should update state', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.instance().openMenu();

      expect(wrapper.state()).to.eql({
        isOpen: true,
        mouseInPopover: false,
      });
    });
  });

  describe('popoverEnterHandler()', () => {
    it('should set `mouseInPopover` to true', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.instance().popoverEnterHandler();

      expect(wrapper.state()).to.eql({ isOpen: true, mouseInPopover: true });
    });
  });

  describe('popoverLeaveHandler()', () => {
    it('should set `mouseInPopover` to false', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.instance().popoverLeaveHandler();

      expect(wrapper.state()).to.eql({ isOpen: true, mouseInPopover: false });
    });
  });

  describe('innerRefFunc()', () => {
    it('should assign popperNode', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      const element = document.createElement('div');
      wrapper.instance().innerRefFunc(element);

      expect(wrapper.instance().popperNode).to.eql(element);
    });
  });

  describe('closeMenu()', () => {
    it('should set state.isOpen to false', done => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.setState({ isOpen: true });

      wrapper.instance().closeMenu();
      setTimeout(() => {
        expect(wrapper.state('isOpen')).to.equal(false);
        done();
      }, 200);
    });

    it('should not do anything if mouse is in popover', done => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.setState({ isOpen: true, mouseInPopover: true });

      wrapper.instance().closeMenu();
      setTimeout(() => {
        expect(wrapper.state('isOpen')).to.equal(true);
        done();
      }, 200);
    });
  });

  it('should render with default props', () => {
    const wrapper = shallow(
      <HoverDropdownMenu hoverComponent={props.hoverComponent} arrowPosition="right">
        something
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );
    expect(wrapper.find(Avatar)).to.have.length(1);
    expect(wrapper.find(Popover)).to.have.length(1);
  });

  it('should render popover with list of links when `links` is not empty', () => {
    const wrapper = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );

    wrapper.setState({
      isOpen: true,
      mouseInPopover: false,
    });
    wrapper.update();

    const popoverWrapper = wrapper.find(Popover);
    expect(popoverWrapper.prop('isOpen')).to.equal(true);

    const popoverContentWrapper = shallow(popoverWrapper.prop('popoverContent'));
    expect(popoverContentWrapper.find(PopoverLinkItem)).to.have.length(2);
    expect(
      popoverContentWrapper
        .find(PopoverLinkItem)
        .at(0)
        .dive()
        .find(Button)
        .children()
        .text()
    ).to.equal('Link 1');
    expect(
      popoverContentWrapper
        .find(PopoverLinkItem)
        .at(1)
        .dive()
        .find(Button)
        .children()
        .text()
    ).to.equal('Logout');
  });

  it('should not set `state.isOpen` to false when `state.mouseInPopover` is true', done => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => (
          <HoverDropdownMenu.Item key={idx} {...link} />
        ))}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );
    component.setState({ isOpen: true, mouseInPopover: true });
    component.find('.hover-dropdown').simulate('mouseLeave');
    setTimeout(() => {
      expect(component.state('isOpen')).to.equal(true);
      done();
    }, 200);
  });

  it('should not render anything if there is no children', () => {
    const wrapper = shallow(<HoverDropdownMenu hoverComponent={<div />} />);
    expect(wrapper.find(Popover)).to.have.length(0);
  });
});
