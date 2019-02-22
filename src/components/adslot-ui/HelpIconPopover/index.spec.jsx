import React from 'react';
import { shallow } from 'enzyme';
import { Popover } from 'third-party';
import HelpIconPopover from 'adslot-ui/HelpIconPopover';

describe('HelpIconPopoverComponent', () => {
  it('should render with defaults', () => {
    const wrapper = shallow(<HelpIconPopover id="tired-help">Have some coffee.</HelpIconPopover>);
    expect(wrapper.prop('data-test-selector')).to.equal('tired-help');
    const popoverWrapper = wrapper.find(Popover);
    expect(popoverWrapper.prop('placement')).to.equal('right');
    expect(popoverWrapper.prop('triggers')).to.deep.equal(['hover']);
    expect(popoverWrapper.prop('popoverContent')).to.equal('Have some coffee.');
  });

  it('should allow custom placement positions', () => {
    const wrapper = shallow(
      <HelpIconPopover id="tired-help" placement="bottom">
        Have some coffee.
      </HelpIconPopover>
    );
    const popoverWrapper = wrapper.find(Popover);
    expect(popoverWrapper.prop('placement')).to.equal('bottom');
  });
});
