import { Popover } from 'adslot-ui';
import { mount } from 'enzyme';
import React from 'react';
import TextEllipsis from '.';

describe('TextEllipsisComponent', () => {
  let divContainer = null;

  beforeEach(() => {
    divContainer = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(divContainer);
  });

  it('should render with defaults', () => {
    const wrapper = mount(<TextEllipsis>Sample text</TextEllipsis>);
    expect(wrapper.find('.text-ellipsis-component')).to.have.length(1);
    expect(wrapper.instance().props.popoverProps).to.eql({
      placement: 'top',
      trigger: 'hover',
    });
  });

  it('should render with no popover when text length is less than max length', () => {
    divContainer.setAttribute('style', 'width: 100px;');
    const wrapper = mount(<TextEllipsis>this is a test</TextEllipsis>, {
      attachTo: divContainer,
    });
    expect(wrapper.find(Popover).prop('isOpen')).to.equal(false);
  });

  it('should render with popover when text length is more than max length', () => {
    divContainer.setAttribute('style', 'width: 1px;');
    const wrapper = mount(<TextEllipsis>this is a test</TextEllipsis>, {
      attachTo: divContainer,
    });
    expect(wrapper.find(Popover).prop('isOpen')).to.equal(true);
  });

  describe('componentDidUpdate()', () => {
    it('should generate popover if text changes from short to long', () => {
      divContainer.setAttribute('style', 'width: 30px;');
      const wrapper = mount(<TextEllipsis>x</TextEllipsis>, {
        attachTo: divContainer,
      });
      expect(wrapper.find(Popover).prop('isOpen')).to.equal(false);

      wrapper.setProps({
        children: 'long text: The quick brown fox jumps over the lazy dog',
      });
      wrapper.update();
      expect(wrapper.find(Popover).prop('isOpen')).to.equal(true);
    });

    it('should remove popover if text changes from long to short', () => {
      divContainer.setAttribute('style', 'width: 20px;');
      const wrapper = mount(<TextEllipsis>this is a test 1234567</TextEllipsis>, { attachTo: divContainer });
      expect(wrapper.find(Popover).prop('isOpen')).to.equal(true);

      wrapper.setProps({ children: 'x' });
      wrapper.update();
      expect(wrapper.find(Popover).prop('isOpen')).to.equal(false);
    });
  });

  describe('should also work on complex children', () => {
    it('when size is small', () => {
      divContainer.setAttribute('style', 'width: 2000px;');
      const wrapper = mount(
        <TextEllipsis>
          this is a text
          <span>this is another text</span>
        </TextEllipsis>,
        { attachTo: divContainer }
      );
      expect(wrapper.find(Popover).prop('isOpen')).to.equal(false);
    });

    it('when size is big', () => {
      divContainer.setAttribute('style', 'width: 20px;');
      const wrapper = mount(
        <TextEllipsis>
          this is a text
          <span>this is another text</span>
        </TextEllipsis>,
        { attachTo: divContainer }
      );
      expect(wrapper.find(Popover).prop('isOpen')).to.equal(true);
    });
  });
});
