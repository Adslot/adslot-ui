import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import Carousel, { getPrevDecorator, getNextDecorator } from 'adslot-ui/Carousel';

describe('CarouselComponent', () => {
  describe('render()', () => {
    it('should render with defaults', () => {
      const component = shallow(<Carousel />);
      expect(component.prop('decorators')).to.be.an('array');
      expect(component.prop('decorators')).to.have.length(2);
      expect(component.prop('className')).to.equal('carousel-component');
      expect(component.children()).to.have.length(0);
    });

    it('should render with slides', () => {
      const component = shallow(
        <Carousel>
          <img src="path/to/image-1.jpg" alt="1" />
          <img src="path/to/image-2.jpg" alt="2" />
        </Carousel>
      );
      expect(component.children()).to.have.length(2);

      const firstSlide = component.childAt(0);
      expect(firstSlide.prop('src')).to.equal('path/to/image-1.jpg');

      const secondSlide = component.childAt(1);
      expect(secondSlide.prop('src')).to.equal('path/to/image-2.jpg');
    });
  });

  describe('getPrevDecorator()', () => {
    it('should get decorator for Previous button', () => {
      const decorator = getPrevDecorator();
      expect(decorator.component).to.be.a('function');
      expect(decorator.position).to.equal('TopLeft');
      expect(decorator.style).to.eql({
        bottom: 0,
        width: '30px',
      });

      const component = shallow(decorator.component({ previousSlide: _.noop }));
      expect(component.prop('className')).to.equal('carousel-component-prev');
      expect(component.prop('onClick')).to.be.a('function');
    });

    it('should call the same throttled function for each onClick event', () => {
      const decorator = getPrevDecorator();
      const componentA = shallow(decorator.component({ previousSlide: _.noop }));
      const onClickA = componentA.prop('onClick');
      const componentB = shallow(decorator.component({ previousSlide: _.noop }));
      const onClickB = componentB.prop('onClick');
      expect(onClickA).to.equal(onClickB);
    });
  });

  describe('getNextDecorator()', () => {
    it('should get decorator for Next button', () => {
      const decorator = getNextDecorator();
      expect(decorator.component).to.be.a('function');
      expect(decorator.position).to.equal('TopRight');
      expect(decorator.style).to.eql({
        bottom: 0,
        width: '30px',
      });

      const component = shallow(decorator.component({ nextSlide: _.noop }));
      expect(component.prop('className')).to.equal('carousel-component-next');
      expect(component.prop('onClick')).to.be.a('function');
    });

    it('should call the same throttled function for each onClick event', () => {
      const decorator = getNextDecorator();
      const componentA = shallow(decorator.component({ nextSlide: _.noop }));
      const onClickA = componentA.prop('onClick');
      const componentB = shallow(decorator.component({ nextSlide: _.noop }));
      const onClickB = componentB.prop('onClick');
      expect(onClickA).to.equal(onClickB);
    });
  });
});
