import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent, queryByAttribute, queryAllByAttribute } from '@testing-library/react';
import Carousel from '.';

afterEach(cleanup);

const getByDataIndex = queryByAttribute.bind(null, 'data-index');
const getById = queryByAttribute.bind(null, 'id');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

describe('<Carousel />', () => {
  it('should render with defaults', () => {
    const { container } = render(<Carousel />);
    expect(container.firstChild).toHaveClass('aui--carousel-component');
    expect(container).toHaveTextContent('');
  });

  it('should render with slides', () => {
    const { getAllByTestId, container } = render(
      <Carousel>
        <img data-testid="carousel-image-wrapper" src="path/to/image-1.jpg" alt="1" />
        <img data-testid="carousel-image-wrapper" src="path/to/image-2.jpg" alt="2" />
      </Carousel>
    );
    getAllByTestId('carousel-image-wrapper').forEach((each) => expect(container).toContainElement(each));
    getAllByTestId('carousel-image-wrapper').forEach((each, index) =>
      expect(each).toHaveAttribute('src', `path/to/image-${index + 1}.jpg`)
    );
  });

  it('should be able to navigate to the next image', () => {
    const { container, getByText } = render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );

    expect(getByText('Next')).toHaveClass('slick-next');
    expect(getByDataIndex(container, '0')).toHaveClass('slick-active');
    expect(getById(getByDataIndex(container, '0'), 'img-0')).toBeTruthy();

    fireEvent.click(getByText('Next'));
    expect(getByDataIndex(container, '1')).toHaveClass('slick-active');
    expect(getById(getByDataIndex(container, '1'), 'img-1')).toBeTruthy();
  });

  it('should be able to navigate to the previous image', () => {
    const { container, getByText } = render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );

    expect(getByText('Previous')).toHaveClass('slick-prev');
    expect(getByDataIndex(container, '0')).toHaveClass('slick-active');
    expect(getById(getByDataIndex(container, '0'), 'img-0')).toBeTruthy();

    fireEvent.click(getByText('Previous'));
    expect(getByDataIndex(container, '4')).toHaveClass('slick-active');
    expect(getById(getByDataIndex(container, '-1'), 'img-4')).toBeTruthy();
  });

  it('should display dots', () => {
    const { container } = render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );
    expect(queryAllByClass(container, 'slick-dots')).toHaveLength(1);
  });

  it('should change slide when dots are clicked', () => {
    const { container, getByText } = render(
      <Carousel slidesToShow={1}>
        {_.map(new Array(5), (value, index) => (
          <img src={`path/to/image-${index}.jpg`} alt={index} id={`img-${index}`} key={index} />
        ))}
      </Carousel>
    );

    fireEvent.click(getByText('3'));
    expect(getByDataIndex(container, '2')).toHaveClass('slick-current');
    expect(getById(getByDataIndex(container, '3'), 'img-3')).toBeTruthy();
  });
});
