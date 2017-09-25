import React from 'react';
import { shallow } from 'enzyme';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import HelpIconPopover from 'adslot-ui/HelpIconPopover';

describe('HelpIconPopoverComponent', () => {
  it('should render with defaults', () => {
    const element = shallow(<HelpIconPopover id="tired-help">Have some coffee.</HelpIconPopover>);
    expect(element.prop('data-test-selector')).to.equal('tired-help');
    const overlayElement = element.find(OverlayTrigger);
    expect(overlayElement.prop('placement')).to.equal('right');
    expect(overlayElement.prop('trigger')).to.deep.equal(['focus', 'hover']);
    expect(overlayElement.prop('overlay').type).to.equal(Popover);
    expect(overlayElement.prop('overlay').props.children).to.equal('Have some coffee.');
    expect(overlayElement.prop('overlay').props.id).to.equal('popover-tired-help');
  });

  it('should allow custom placement positions', () => {
    const element = shallow(<HelpIconPopover id="tired-help" placement="bottom">Have some coffee.</HelpIconPopover>);
    const overlayElement = element.find(OverlayTrigger);
    expect(overlayElement.prop('placement')).to.equal('bottom');
  });
});
