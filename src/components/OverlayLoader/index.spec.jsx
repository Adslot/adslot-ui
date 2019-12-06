import { mount, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import OverlayLoader from '.';

describe('Overlay Loader Component', () => {
  it('should render Overlay Loader', () => {
    const wrapper = shallow(<OverlayLoader text="foo" />);
    expect(wrapper.find('.aui--overlay-loader')).to.have.length(1);
    expect(wrapper.find('.loader-heading').text()).to.equal('Loading');
  });

  it('should stop event propogation when disabled background', () => {
    const eventStub = sinon.stub();
    const wrapper = mount(
      <div onClick={() => eventStub} className="my-div">
        <OverlayLoader text="foo" disableBackground />
      </div>
    );
    expect(wrapper.find(OverlayLoader)).to.have.length(1);
    expect(wrapper.find('.loader-heading').text()).to.equal('Loading');
    wrapper.find('.my-div').simulate('click');
    wrapper.find(OverlayLoader).simulate('click');
    expect(eventStub.called).to.equal(false);
  });
});
