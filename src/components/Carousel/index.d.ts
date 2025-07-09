import * as React from 'react';
import type { Settings } from 'react-slick';

export interface CarouselProps {
  className?: string;
  children?: React.ReactNode;
  autoplay?: boolean;
  variableWidth?: boolean;
  autoplaySpeed?: number;
  slidesToShow?: number;
  dots?: boolean;
}

declare const Carousel: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<CarouselProps & Settings> & React.RefAttributes<((...args: any[]) => any) | Element>
> & {
  usePreventSwipeClicks: () => {
    onMouseDownCapture: (e: any) => void;
    onClickCapture: (e: any) => void;
  };
};

export default Carousel;
