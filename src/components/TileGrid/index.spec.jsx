import _ from 'lodash';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TileGrid from '.';

afterEach(cleanup);

describe('<TileGrid />', () => {
  const props = {
    items: [{ id: '0', classSuffix: 'alpha', title: 'Alpha' }, { id: '1', classSuffix: 'beta', title: 'Beta' }],
    onItemClick: jest.fn(),
  };

  it('renders with basic props', () => {
    const { getByTestId, queryAllByTestId } = render(<TileGrid {...props} items={[]} />);

    expect(getByTestId('tile-grid-wrapper')).toHaveClass('tile-grid-component');
    expect(queryAllByTestId('tile-grid-title')).toHaveLength(0);

    expect(queryAllByTestId('tile-grid-list')).toHaveLength(1);
    expect(getByTestId('tile-grid-list')).toHaveClass('tile-grid-component-list');
    expect(getByTestId('tile-grid-list')).toBeEmpty();
  });

  it('renders title if props contain it', () => {
    const newProps = _.assign(props, { title: 'Lorem ipsum' });
    const { getByTestId, queryAllByTestId } = render(<TileGrid {...newProps} items={[]} />);

    expect(queryAllByTestId('tile-grid-title')).toHaveLength(1);
    expect(getByTestId('tile-grid-title')).toHaveClass('tile-grid-component-title');
    expect(getByTestId('tile-grid-title')).toHaveTextContent('Lorem ipsum');
  });

  it('renders with items', () => {
    const { queryAllByTestId } = render(<TileGrid {...props} />);
    expect(queryAllByTestId('tile-grid-list-item')).toHaveLength(2);
    expect(queryAllByTestId('tile-grid-list-item')[0]).toHaveClass(
      'tile-grid-component-item tile-grid-component-item-alpha'
    );
    expect(queryAllByTestId('tile-grid-list-item')[1]).toHaveClass(
      'tile-grid-component-item tile-grid-component-item-beta'
    );

    expect(queryAllByTestId('tile-grid-list-item-link')).toHaveLength(2);
    expect(queryAllByTestId('tile-grid-list-item-link')[0]).toHaveClass('tile-grid-component-item-link');
    expect(queryAllByTestId('tile-grid-list-item-link')[0]).toHaveTextContent('Alpha');

    expect(queryAllByTestId('tile-grid-list-item-link')[1]).toHaveClass('tile-grid-component-item-link');
    expect(queryAllByTestId('tile-grid-list-item-link')[1]).toHaveTextContent('Beta');
  });

  it('handles tile clicks', () => {
    const onItemClick = jest.fn();
    const { queryAllByTestId } = render(<TileGrid {...props} onItemClick={onItemClick} />);

    fireEvent.click(queryAllByTestId('tile-grid-list-item-link')[0]);
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith('0');

    fireEvent.click(queryAllByTestId('tile-grid-list-item-link')[1]);
    expect(onItemClick).toHaveBeenCalledTimes(2);
    expect(onItemClick).toHaveBeenLastCalledWith('1');
  });

  it('should handle evenly distributed', () => {
    props.distributed = true;
    const { queryAllByTestId } = render(<TileGrid {...props} />);
    expect(queryAllByTestId('tile-grid-list-item')).toHaveLength(2);
    queryAllByTestId('tile-grid-list-item').forEach(item =>
      expect(item).toHaveClass('tile-grid-component-item-distributed')
    );
  });

  it('should add image for background if imgLink is provided', () => {
    const itemsWithLink = [
      { id: '0', classSuffix: 'alpha', title: 'Alpha', imgLink: '/linkAlpha.jpg' },
      { id: '1', classSuffix: 'beta', title: 'Beta', imgLink: '/linkBeta.jpg' },
    ];
    props.items = itemsWithLink;
    const { queryAllByTestId } = render(<TileGrid {...props} />);
    expect(queryAllByTestId('tile-grid-list-item-img-wrapper')).toHaveLength(2);
    queryAllByTestId('tile-grid-list-item-img-wrapper').forEach(item =>
      expect(item).toHaveClass('tile-grid-component-item-img-wrapper')
    );
  });

  it('should handle image position', () => {
    const itemsWithLinkAndPosition = [
      { id: '0', classSuffix: 'one', title: 'One', imgLink: '/linkOne.jpg', imgAlign: 'left' },
      { id: '1', classSuffix: 'two', title: 'Two', imgLink: '/linkTwo.jpg', imgAlign: 'center' },
      { id: '2', classSuffix: 'three', title: 'Three', imgLink: '/linkThree.jpg', imgAlign: 'right' },
    ];
    props.items = itemsWithLinkAndPosition;
    const { queryAllByTestId } = render(<TileGrid {...props} />);
    expect(queryAllByTestId('tile-grid-list-item-img-wrapper')).toHaveLength(3);
    expect(queryAllByTestId('tile-grid-list-item-img-wrapper')[0]).toHaveClass(
      'tile-grid-component-item-img-wrapper-left'
    );
    expect(queryAllByTestId('tile-grid-list-item-img-wrapper')[1]).toHaveClass(
      'tile-grid-component-item-img-wrapper-center'
    );
    expect(queryAllByTestId('tile-grid-list-item-img-wrapper')[2]).toHaveClass(
      'tile-grid-component-item-img-wrapper-right'
    );
  });
});
