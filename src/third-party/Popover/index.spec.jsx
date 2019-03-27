import React from 'react';
import { shallow, mount } from 'enzyme';
import BootstrapPopover from 'react-bootstrap/lib/Popover';
import { Popover } from 'third-party';

describe('Popover Component', () => {
  it('should render without error', () => {
    const wrapper = shallow(
      <Popover id="popover-example" className="test-class">
        <label className="message">Test message</label>
      </Popover>
    );

    expect(wrapper.prop('id')).to.equal('popover-example');
    expect(wrapper.prop('className')).to.equal('test-class popover-light');
    expect(wrapper.prop('placement')).to.equal('right');
    expect(wrapper.find('label').length).to.equal(1);
    expect(wrapper.find('.message').text()).to.equal('Test message');
  });

  it('should render with the third-party component', () => {
    const wrapper = shallow(<Popover id="popover-example">Test message</Popover>);
    expect(wrapper.find(BootstrapPopover).length).to.equal(1);
  });

  it('should be able to set theme', () => {
    let wrapper = mount(<Popover id="popover-example">Test message</Popover>);
    expect(wrapper.find('div#popover-example').hasClass('popover-light')).to.equal(true);

    wrapper = mount(
      <Popover id="popover-example" theme="dark">
        Test message
      </Popover>
    );
    expect(wrapper.find('div#popover-example').hasClass('popover-dark')).to.equal(true);

    wrapper = mount(
      <Popover id="popover-example" theme="warn">
        Test message
      </Popover>
    );
    expect(wrapper.find('div#popover-example').hasClass('popover-warn')).to.equal(true);

    wrapper = mount(
      <Popover id="popover-example" theme="error">
        Test message
      </Popover>
    );
    expect(wrapper.find('div#popover-example').hasClass('popover-error')).to.equal(true);
  });

  it('should not allow random theme', () => {
    const wrapper = mount(
      <Popover id="popover-example" theme="random-theme">
        Test message
      </Popover>
    );
    expect(wrapper.find('div#popover-example').hasClass('popover-light')).to.equal(true);
    expect(wrapper.find('div#popover-example').hasClass('popover-random-theme')).to.equal(false);
  });
});
