import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './styles.scss';

const baseClass = 'aui--carousel-component';

const CarouselComponent = React.forwardRef((props, ref) => {
  const { className, children } = props;

  return (
    <Slider {...props} ref={ref} className={classNames(baseClass, className)}>
      {children}
    </Slider>
  );
});

CarouselComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  variableWidth: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  slidesToShow: PropTypes.number,
  dots: PropTypes.bool,
};

CarouselComponent.defaultProps = {
  autoplay: true,
  variableWidth: true,
  autoplaySpeed: 10000,
  slidesToShow: 2,
  dots: true,
};

export default CarouselComponent;
