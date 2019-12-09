import classNames from 'classnames';
import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

const baseClass = 'carousel-component';

export const PrevButton = ({ previousSlide }) => <button className={`${baseClass}-prev`} onClick={previousSlide} />;

export const NextButton = ({ nextSlide }) => <button className={`${baseClass}-next`} onClick={nextSlide} />;

const CarouselComponent = props => {
  const { className, children } = props;

  return (
    <Carousel
      {...props}
      renderCenterLeftControls={PrevButton}
      renderCenterRightControls={NextButton}
      className={classNames(baseClass, className)}
    >
      {children}
    </Carousel>
  );
};

CarouselComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

PrevButton.propTypes = {
  previousSlide: PropTypes.func.isRequired,
};

NextButton.propTypes = {
  nextSlide: PropTypes.func.isRequired,
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
