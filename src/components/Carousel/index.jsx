import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

const baseClass = 'aui--carousel-component';

const Carousel = React.forwardRef(
  (
    {
      className,
      children,
      autoplay = true,
      variableWidth = true,
      autoplaySpeed = 10000,
      slidesToShow = 2,
      dots = true,
      ...rest
    },
    ref
  ) => {
    return (
      <Slider
        {...rest}
        ref={ref}
        autoplay={autoplay}
        variableWidth={variableWidth}
        autoplaySpeed={autoplaySpeed}
        slidesToShow={slidesToShow}
        dots={dots}
        className={classNames(baseClass, className)}
      >
        {children}
      </Slider>
    );
  }
);

Carousel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  autoplay: PropTypes.bool,
  variableWidth: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  slidesToShow: PropTypes.number,
  dots: PropTypes.bool,
};

const SWIPE_DELTA = 3;

const usePreventCarouselSwipeClicks = () => {
  const [mousePos, setMousePos] = React.useState({});

  const onMouseDownCapture = (e) => {
    setMousePos({ clientX: e.clientX, clientY: e.clientY });
  };

  const onClickCapture = (e) => {
    const deltaX = Math.abs(mousePos.clientX - e.clientX);
    const deltaY = Math.abs(mousePos.clientY - e.clientY);

    if (deltaX > SWIPE_DELTA || deltaY > SWIPE_DELTA) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return {
    onMouseDownCapture,
    onClickCapture,
  };
};

/**
 * A hook to prevent child click handlers from firing immediately after swiping the Carousel
 *
 * @returns {object} - to be spread onto any carousel items with `onClick` handlers
 */
Carousel.usePreventSwipeClicks = usePreventCarouselSwipeClicks;

export default Carousel;
