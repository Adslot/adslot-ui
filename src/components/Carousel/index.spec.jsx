import _ from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Carousel, { PrevButton, NextButton } from '.';

describe('CarouselComponent', () => {
  it('should render with defaults', () => {
    const wrapper = shallow(<Carousel />);
    expect(wrapper.prop('className')).to.equal('carousel-component');
    expect(wrapper.children()).to.have.length(0);
  });

  it('should render with slides', () => {
    const wrapper = shallow(
      <Carousel>
        <img src="path/to/image-1.jpg" alt="1" />
        <img src="path/to/image-2.jpg" alt="2" />
      </Carousel>
    );
    expect(wrapper.children()).to.have.length(2);

    const firstSlide = wrapper.childAt(0);
    expect(firstSlide.prop('src')).to.equal('path/to/image-1.jpg');

    const secondSlide = wrapper.childAt(1);
    expect(secondSlide.prop('src')).to.equal('path/to/image-2.jpg');
  });

  it('should be able to navigate to the next image', () => {
    const wrapper = mount(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );
    expect(wrapper.find('.carousel-component-next').length).to.equal(1);
    expect(wrapper.find('.slide-visible img').prop('id')).to.equal('img-0');
    wrapper.find('.carousel-component-next').simulate('click');
    expect(wrapper.find('.slide-visible img').prop('id')).to.equal('img-1');
  });

  it('should be able to navigate to the previous image', () => {
    const wrapper = mount(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );
    expect(wrapper.find('.carousel-component-prev').length).to.equal(1);
    expect(wrapper.find('.slide-visible img').prop('id')).to.equal('img-0');
    wrapper.find('.carousel-component-prev').simulate('click');
    expect(wrapper.find('.slide-visible img').prop('id')).to.equal('img-4');
  });
});

describe('Navigation buttons', () => {
  const props = {
    previousSlide: _.noop,
    nextSlide: _.noop,
  };

  describe('PrevButton component', () => {
    it('should render the component without errors', () => {
      const wrapper = shallow(<PrevButton {...props} />);
      expect(wrapper.prop('className')).to.equal('carousel-component-prev');
      expect(wrapper.prop('onClick')).to.be.a('function');
    });
  });

  describe('NextButton component', () => {
    it('should render the component without errors', () => {
      const wrapper = shallow(<NextButton {...props} />);
      expect(wrapper.prop('className')).to.equal('carousel-component-next');
      expect(wrapper.prop('onClick')).to.be.a('function');
    });
  });
});
