import React from 'react';
import { mount, shallow } from 'enzyme';
import { OverlayTrigger } from 'react-bootstrap';
import TextEllipsisComponent from 'components/adslotUi/TextEllipsisComponent';

describe('TextEllipsisComponent', () => {
  let divContainer = null;

  beforeEach(() => {
    divContainer = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(divContainer);
  });

  it('should render with defaults', () => {
    const component = shallow(<TextEllipsisComponent text="Sample text" />);
    expect(component.find('.text-ellipsis-component')).to.have.length(1);
    expect(component.instance().props.text).to.eql('Sample text');
    expect(component.instance().props.overlayTriggerProps).to.eql({
      trigger: ['focus', 'hover'],
      placement: 'top',
    });
    expect(component.instance().props.popoverProps).to.eql({
      id: 'popover',
      placement: 'top',
    });
  });

  it('should render with no popover when text length is less than max length', () => {
    divContainer.setAttribute('style', 'width: 100px;');
    const component = mount(<TextEllipsisComponent text="this is a test" />, { attachTo: divContainer });
    expect(component.find(OverlayTrigger)).to.have.length(0);
  });

  it('should render with popover when text length is more than max length', () => {
    divContainer.setAttribute('style', 'width: 1px;');
    const component = mount(<TextEllipsisComponent text="this is a test" />, { attachTo: divContainer });
    expect(component.find(OverlayTrigger)).to.have.length(1);
  });

  describe('componentDidUpdate()', () => {
    it('should generate popover if text changes from short to long', () => {
      divContainer.setAttribute('style', 'width: 30px;');
      const component = mount(<TextEllipsisComponent text="x" />, { attachTo: divContainer });
      expect(component.find(OverlayTrigger)).to.have.length(0);

      component.setProps({ text: 'long text: The quick brown fox jumps over the lazy dog' });
      expect(component.find(OverlayTrigger)).to.have.length(1);
    });

    it('should remove popover if text changes from long to short', () => {
      divContainer.setAttribute('style', 'width: 20px;');
      const component = mount(<TextEllipsisComponent text="this is a test 1234567" />, { attachTo: divContainer });
      expect(component.find(OverlayTrigger)).to.have.length(1);

      component.setProps({ text: 'x' });
      expect(component.find(OverlayTrigger)).to.have.length(0);
    });
  });
});
