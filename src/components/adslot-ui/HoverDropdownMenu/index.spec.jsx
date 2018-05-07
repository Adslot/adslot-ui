import _ from 'lodash';
import { mount, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { Overlay, Button } from 'react-bootstrap';
import Avatar from 'alexandria/Avatar';
import HoverDropdownMenu, { renderPopoverComponent } from 'adslot-ui/HoverDropdownMenu';
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

  it('should render with default props', () => {
    const component = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent} />, {
      disableLifecycleMethods: true,
    });
    expect(component.find(Avatar)).to.have.length(1);
    expect(component.find(Overlay)).to.have.length(0);
  });

  it('should render popover with list of links when `links` is not empty', () => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => <HoverDropdownMenu.Item key={idx} {...link} />)}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );

    component.setState({
      isOpen: true,
      mouseInPopover: false,
    });
    component.update();

    expect(component.find(Overlay)).to.have.length(1);
    expect(component.find(PopoverLinkItem)).to.have.length(2);
    expect(
      component
        .find(PopoverLinkItem)
        .at(0)
        .dive()
        .find(Button)
        .children()
        .text()
    ).to.equal('Link 1');
    expect(
      component
        .find(PopoverLinkItem)
        .at(1)
        .dive()
        .find(Button)
        .children()
        .text()
    ).to.equal('Logout');
  });

  it('should set state to open dropdown when hovering on the component', () => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => <HoverDropdownMenu.Item key={idx} {...link} />)}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );
    const target = null;
    component.find('.hover-dropdown').simulate('mouseEnter', { target });
    expect(component.state()).to.eql({
      isOpen: true,
      target,
      mouseInPopover: false,
    });
  });

  it('should set `state.isOpen` to false when leaving the component', done => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => <HoverDropdownMenu.Item key={idx} {...link} />)}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );
    component.setState({ isOpen: true });
    component.find('.hover-dropdown').simulate('mouseLeave');
    setTimeout(() => {
      expect(component.state('isOpen')).to.equal(false);
      done();
    }, 200);
  });

  it('should not set `state.isOpen` to false when `state.mouseInPopover` is true', done => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => <HoverDropdownMenu.Item key={idx} {...link} />)}
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

  it('should set `state.mouseInPopover` to true when user entering popover', () => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => <HoverDropdownMenu.Item key={idx} {...link} />)}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );

    component.simulate('mouseEnter', { target: null });
    component
      .find(Overlay)
      .children()
      .simulate('mouseEnter');
    expect(component.state('mouseInPopover')).to.equal(true);
  });

  it('should set `state.mouseInPopover` and `state.isOpen` to false when user leaving popover', done => {
    const component = shallow(
      <HoverDropdownMenu {...props}>
        {_.map(links, (link, idx) => <HoverDropdownMenu.Item key={idx} {...link} />)}
      </HoverDropdownMenu>,
      {
        disableLifecycleMethods: true,
      }
    );
    component.setState({ mouseInPopover: true, isOpen: true });
    component
      .find(Overlay)
      .children()
      .simulate('mouseLeave');
    setTimeout(() => {
      expect(component.state('mouseInPopover')).to.equal(false);
      expect(component.state('isOpen')).to.equal(false);
      done();
    }, 200);
  });

  it('should remove `title` prop from hover component', () => {
    const component = mount(<HoverDropdownMenu {...props} />);
    expect(component.find('.avatar-component').html()).to.equal(
      '<div class="avatar-component"><div class="avatar-component-initials">JS</div></div>'
    );
  });

  describe('renderPopoverComponent()', () => {
    let popoverProps = {};

    beforeEach(() => {
      popoverProps = {
        id: 'popover',
        style: {
          left: 100,
        },
      };
    });

    it('should return popover component with altered positions when arrowPosition is `left`', () => {
      const PopoverComponent = renderPopoverComponent('left');
      const element = shallow(<PopoverComponent {...popoverProps} />);
      expect(element.prop('arrowOffsetLeft')).to.equal('20%');
      expect(element.prop('style')).to.deep.equal({ left: 148 });
    });

    it('should return popover component with altered positions when arrowPosition is `right`', () => {
      const PopoverComponent = renderPopoverComponent('right');
      const element = shallow(<PopoverComponent {...popoverProps} />);
      expect(element.prop('arrowOffsetLeft')).to.equal('80%');
      expect(element.prop('style')).to.deep.equal({ left: 52 });
    });
  });
});
