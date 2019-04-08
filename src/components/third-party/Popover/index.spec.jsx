import React from 'react';
import { shallow, mount } from 'enzyme';
import { Manager, Popper } from 'react-popper';
import { Popover } from 'third-party';

describe('Popover Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['click']}>
        Test message
      </Popover>
    );
  });

  describe('getDerivedStateFromProps()', () => {
    it('should return the new state', () => {
      expect(
        Popover.getDerivedStateFromProps({ triggers: ['disabled'], isOpen: true }, { isPopoverOpen: false })
      ).to.eql({ isPopoverOpen: true });
    });
  });

  describe('onClick()', () => {
    it('should toggle `isPopoverOpen` state', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onClick();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });

    it('should do nothing if trigger is not `click`', () => {
      wrapper.setProps({ triggers: ['hover'] });
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onClick();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  describe('onMouseOver()', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['hover']}>
          Test message
        </Popover>
      );
    });

    it('should set `isPopoverOpen` state to true', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onMouseOver();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });

    it('should do nothing if trigger is not `hover`', () => {
      wrapper.setProps({ triggers: ['click'] });
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().onMouseOver();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  describe('onMouseOut()', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Popover id="popover-example" theme="dark" popoverContent={<div />} triggers={['hover']}>
          Test message
        </Popover>
      );

      wrapper.setState({ isPopoverOpen: true });
    });

    it('should set `isPopoverOpen` state to false', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().onMouseOut();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });

    it('should do nothing if trigger is not `hover`', () => {
      wrapper.setProps({ triggers: ['click'] });
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().onMouseOut();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });
  });

  describe('closePopover()', () => {
    beforeEach(() => {
      wrapper.setState({ isPopoverOpen: true });
    });

    it('should set `isPopoverOpen` state to false', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().closePopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  describe('openPopover()', () => {
    it('should set `isPopoverOpen` state to true', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().openPopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
    });
  });

  describe('togglePopover()', () => {
    it('should toggle `isPopoverOpen` state', () => {
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
      wrapper.instance().togglePopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(true);
      wrapper.instance().togglePopover();
      expect(wrapper.state('isPopoverOpen')).to.equal(false);
    });
  });

  it('should render without error', () => {
    wrapper = mount(
      <div>
        <Popover className="test-class" popoverContent={<div />} title="Some title" isOpen>
          <label className="message">Test message</label>
        </Popover>
      </div>
    );

    expect(wrapper.find(Manager)).to.have.length(1);
    expect(wrapper.find('.popover-title').text()).to.equal('Some title');
    expect(wrapper.find(Popper)).to.have.length(1);
  });

  it('should be able to set theme', () => {
    wrapper = mount(
      <div>
        <Popover popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-light')).to.equal(true);

    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="dark" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-dark')).to.equal(true);

    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="warn" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-warn')).to.equal(true);

    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="error" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );
    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-error')).to.equal(true);
  });

  it('should default to light theme on invalid theme prop', () => {
    wrapper = mount(
      <div>
        <Popover id="popover-example" theme="some-random-theme" popoverContent={<div />} isOpen>
          Test message
        </Popover>
      </div>
    );

    expect(wrapper.find('.aui--popover-wrapper').hasClass('popover-light')).to.equal(true);
  });
});
