import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Carousel from 'nuka-carousel';

require('./styles.scss');

const baseClass = 'carousel-component';
const navigationDelay = 600;
const decoratorStyles = {
  bottom: 0,
  width: '30px',
};

export const getPrevDecorator = () => {
  let previousSlideThrottled;
  const component = ({ previousSlide }) => {
    if (!previousSlideThrottled) {
      previousSlideThrottled = _.throttle(previousSlide, navigationDelay);
    }
    return (<button className={`${baseClass}-prev`} onClick={previousSlideThrottled} />);
  };
  component.propTypes = { previousSlide: PropTypes.func.isRequired };

  return {
    component,
    position: 'TopLeft',
    style: decoratorStyles,
  };
};

export const getNextDecorator = () => {
  let nextSlideThrottled;
  const component = ({ nextSlide }) => {
    if (!nextSlideThrottled) {
      nextSlideThrottled = _.throttle(nextSlide, navigationDelay);
    }
    return (<button className={`${baseClass}-next`} onClick={nextSlideThrottled} />);
  };
  component.propTypes = { nextSlide: PropTypes.func.isRequired };

  return {
    component,
    position: 'TopRight',
    style: decoratorStyles,
  };
};

class CarouselComponent extends PureComponent {
  render() {
    const { className, children } = this.props;
    const decorators = [getPrevDecorator(), getNextDecorator()];

    return (
      <Carousel decorators={decorators} {...this.props} className={classNames(baseClass, className)}>
        {children}
      </Carousel>
    );
  }
}

CarouselComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// See Nuka Carousel docs for other options:
// https://github.com/FormidableLabs/nuka-carousel
CarouselComponent.defaultProps = {
  autoplay: true,
  autoplayInterval: 10000,
  cellAlign: 'center',
  cellSpacing: 15,
  slidesToShow: 2,
  slideWidth: '447.5px', // 440px (image width) + 15px (spacing) / 2
  wrapAround: true,
};

export default CarouselComponent;
