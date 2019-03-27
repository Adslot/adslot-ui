import React from 'react';
import { mount } from 'enzyme';
import { OverlayTrigger } from 'react-bootstrap';
import TextEllipsis from 'components/TextEllipsis';

describe('TextEllipsisComponent', () => {
  let divContainer = null;

  beforeEach(() => {
    divContainer = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(divContainer);
  });

  it('should render with defaults', () => {
    const component = mount(<TextEllipsis>Sample text</TextEllipsis>);
    expect(component.find('.text-ellipsis-component')).to.have.length(1);
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
    const component = mount(<TextEllipsis>this is a test</TextEllipsis>, {
      attachTo: divContainer,
    });
    expect(component.find(OverlayTrigger)).to.have.length(0);
  });

  it('should render with popover when text length is more than max length', () => {
    divContainer.setAttribute('style', 'width: 1px;');
    const component = mount(<TextEllipsis>this is a test</TextEllipsis>, {
      attachTo: divContainer,
    });
    expect(component.find(OverlayTrigger)).to.have.length(1);
  });

  describe('componentDidUpdate()', () => {
    it('should generate popover if text changes from short to long', () => {
      divContainer.setAttribute('style', 'width: 30px;');
      const component = mount(<TextEllipsis>x</TextEllipsis>, {
        attachTo: divContainer,
      });
      expect(component.find(OverlayTrigger)).to.have.length(0);

      component.setProps({
        children: 'long text: The quick brown fox jumps over the lazy dog',
      });
      component.update();
      expect(component.find(OverlayTrigger)).to.have.length(1);
    });

    it('should remove popover if text changes from long to short', () => {
      divContainer.setAttribute('style', 'width: 20px;');
      const component = mount(<TextEllipsis>this is a test 1234567</TextEllipsis>, { attachTo: divContainer });
      expect(component.find(OverlayTrigger)).to.have.length(1);

      component.setProps({ children: 'x' });
      component.update();
      expect(component.find(OverlayTrigger)).to.have.length(0);
    });
  });

  describe('should also work on complex children', () => {
    it('when size is small', () => {
      divContainer.setAttribute('style', 'width: 2000px;');
      const component = mount(
        <TextEllipsis>
          this is a text
          <span>this is another text</span>
        </TextEllipsis>,
        { attachTo: divContainer }
      );
      expect(component.find(OverlayTrigger)).to.have.length(0);
    });

    it('when size is big', () => {
      divContainer.setAttribute('style', 'width: 20px;');
      const component = mount(
        <TextEllipsis>
          this is a text
          <span>this is another text</span>
        </TextEllipsis>,
        { attachTo: divContainer }
      );
      expect(component.find(OverlayTrigger)).to.have.length(1);
    });
  });
});
