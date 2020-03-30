import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './styles.scss';

const baseClass = 'aui--carousel-component';

const CarouselComponent = props => {
  const { className, children } = props;

  return (
    <Slider {...props} className={classNames(baseClass, className)}>
      {children}
    </Slider>
  );
};

CarouselComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  variableWidth: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  slidesToShow: PropTypes.number,
  dots: PropTypes.bool,
};

CarouselComponent.defaultProps = {
  autoplay: true,
  variableWidth: true,
  autoplayInterval: 10000,
  slidesToShow: 2,
  dots: true,
};

export default CarouselComponent;
