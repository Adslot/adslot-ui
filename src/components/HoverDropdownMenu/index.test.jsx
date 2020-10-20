import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';
import HoverDropdownMenu from '.';

describe('HoverDropdownMenuComponent', () => {
  let props = {};
  beforeEach(() => {
    props = {
      headerText: 'test header',
      hoverComponent: <Avatar givenName="John" surname="Smith" tooltip="test tooltip" />,
      onLinkClick: jest.fn(),
    };
  });

  describe('popoverEnterHandler()', () => {
    it('should set `mouseInPopover` to true', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.instance().popoverEnterHandler();

      expect(wrapper.state()).toEqual({ isOpen: true, mouseInPopover: true });
    });
  });

  describe('popoverLeaveHandler()', () => {
    it('should set `mouseInPopover` to false', () => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.instance().popoverLeaveHandler();

      expect(wrapper.state()).toEqual({ isOpen: true, mouseInPopover: false });
    });
  });

  describe('closeMenu()', () => {
    it('should set state.isOpen to false', done => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.setState({ isOpen: true });

      wrapper.instance().closeMenu();
      setTimeout(() => {
        expect(wrapper.state('isOpen')).toEqual(false);
        done();
      }, 200);
    });

    it('should not do anything if mouse is in popover', done => {
      const wrapper = shallow(<HoverDropdownMenu hoverComponent={props.hoverComponent}>something</HoverDropdownMenu>);
      wrapper.setState({ isOpen: true, mouseInPopover: true });

      wrapper.instance().closeMenu();
      setTimeout(() => {
        expect(wrapper.state('isOpen')).toEqual(true);
        done();
      }, 200);
    });
  });
});
