import _ from 'lodash';
import React from 'react';
import { render, screen, within, user } from 'testing';
import Carousel from '.';

const CarouselHookTest = React.forwardRef(({ onClick }, ref) => {
  const props = Carousel.usePreventSwipeClicks();
  return (
    <Carousel ref={ref} slidesToShow={1}>
      {_.map(new Array(5), (_value, index) => (
        <button {...props} onClick={onClick} data-testid={`btn-${index}`} key={index}>
          <img src={`path/to/image-${index}.jpg`} alt={index} data-testid={`img-${index}`} />
        </button>
      ))}
    </Carousel>
  );
});

describe('<Carousel />', () => {
  it('should render with defaults', () => {
    render(<Carousel />);
    expect(screen.getByClass('aui--carousel-component')).toBeInTheDocument();
  });

  it('should render with slides', () => {
    render(
      <Carousel>
        <img data-testid="carousel-image-wrapper" src="path/to/image-1.jpg" alt="1" />
        <img data-testid="carousel-image-wrapper" src="path/to/image-2.jpg" alt="2" />
      </Carousel>
    );
    screen.getAllByTestId('carousel-image-wrapper').forEach((each) => {
      expect(each).toBeInTheDocument();
    });
    screen.getAllByTestId('carousel-image-wrapper').forEach((each, index) => {
      expect(each).toHaveAttribute('src', `path/to/image-${index + 1}.jpg`);
    });
  });

  it('should be able to navigate to the next image', async () => {
    render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (_value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} data-testid={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );

    expect(screen.getByText('Next')).toHaveClass('slick-next');
    expect(within(screen.getByClass('slick-slide slick-active')).getByTestId('img-0')).toBeInTheDocument();

    await user.click(screen.getByText('Next'));
    expect(within(screen.getByClass('slick-slide slick-active')).getByTestId('img-1')).toBeInTheDocument();
  });

  it('should be able to navigate to the previous image', async () => {
    render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (_value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} data-testid={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );

    expect(screen.getByText('Previous')).toHaveClass('slick-prev');
    expect(within(screen.getByClass('slick-slide slick-active')).getByTestId('img-0')).toBeInTheDocument();

    await user.click(screen.getByText('Previous'));
    expect(within(screen.getByClass('slick-slide slick-active')).getByTestId('img-4')).toBeInTheDocument();
  });

  it('should display dots', () => {
    render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (_value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );
    expect(screen.queryAllByClass('slick-dots')).toHaveLength(1);
  });

  it('should change slide when dots are clicked', async () => {
    render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (_value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} data-testid={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );

    await user.click(screen.getByText('3'));
    expect(within(screen.getByClass('slick-slide slick-active')).getByTestId('img-2')).toBeInTheDocument();
  });

  it('should not fire click events when swiping with usePreventSwipeClicks', async () => {
    const onClick = jest.fn();
    const ref = { current: false };
    render(<CarouselHookTest ref={ref} onClick={onClick} />);

    await user.pointer([
      {
        keys: '[MouseLeft>]',
        target: screen.getAllByTestId('btn-1')[0],
        coords: { clientX: 10, clientY: 20 },
      },
      {
        target: screen.getAllByTestId('btn-1')[0],
        coords: { clientX: 17, clientY: 20 },
      },
      {
        keys: '[/MouseLeft]',
        coords: { clientX: 19, clientY: 20 },
      },
    ]);

    expect(onClick).toHaveBeenCalledTimes(0);

    await user.pointer([{ keys: '[MouseLeft]', target: screen.getAllByTestId('btn-1')[0] }]);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
