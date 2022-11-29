import _ from 'lodash';
import React from 'react';
import { render, screen, user } from 'testing';
import TileGrid from '.';

describe('<TileGrid />', () => {
  const props = {
    items: [
      { id: '0', classSuffix: 'alpha', title: 'Alpha' },
      { id: '1', classSuffix: 'beta', title: 'Beta' },
    ],
    onItemClick: jest.fn(),
  };

  it('renders with basic props', () => {
    render(<TileGrid {...props} items={[]} />);

    expect(screen.getByTestId('tile-grid-wrapper')).toHaveClass('tile-grid-component');
    expect(screen.queryByTestId('tile-grid-title')).not.toBeInTheDocument();

    expect(screen.getByTestId('tile-grid-list')).toBeInTheDocument();
    expect(screen.getByTestId('tile-grid-list')).toHaveClass('tile-grid-component-list');
    expect(screen.getByTestId('tile-grid-list')).toBeEmptyDOMElement();
  });

  it('renders title if props contain it', () => {
    const newProps = _.assign(props, { title: 'Lorem ipsum' });
    render(<TileGrid {...newProps} items={[]} />);

    expect(screen.getByTestId('tile-grid-title')).toBeInTheDocument();
    expect(screen.getByTestId('tile-grid-title')).toHaveClass('tile-grid-component-title');
    expect(screen.getByTestId('tile-grid-title')).toHaveTextContent('Lorem ipsum');
  });

  it('renders with items', () => {
    render(<TileGrid {...props} />);
    expect(screen.getAllByTestId('tile-grid-list-item')).toHaveLength(2);
    expect(screen.getAllByTestId('tile-grid-list-item')[0]).toHaveClass(
      'tile-grid-component-item tile-grid-component-item-alpha'
    );
    expect(screen.getAllByTestId('tile-grid-list-item')[1]).toHaveClass(
      'tile-grid-component-item tile-grid-component-item-beta'
    );

    expect(screen.getAllByTestId('tile-grid-list-item-link')).toHaveLength(2);
    expect(screen.getAllByTestId('tile-grid-list-item-link')[0]).toHaveClass('tile-grid-component-item-link');
    expect(screen.getAllByTestId('tile-grid-list-item-link')[0]).toHaveTextContent('Alpha');

    expect(screen.getAllByTestId('tile-grid-list-item-link')[1]).toHaveClass('tile-grid-component-item-link');
    expect(screen.getAllByTestId('tile-grid-list-item-link')[1]).toHaveTextContent('Beta');
  });

  it('handles tile clicks', async () => {
    const onItemClick = jest.fn();
    render(<TileGrid {...props} onItemClick={onItemClick} />);

    await user.click(screen.getAllByTestId('tile-grid-list-item-link')[0]);
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith('0');

    await user.click(screen.getAllByTestId('tile-grid-list-item-link')[1]);
    expect(onItemClick).toHaveBeenCalledTimes(2);
    expect(onItemClick).toHaveBeenLastCalledWith('1');
  });

  it('should handle evenly distributed', () => {
    props.distributed = true;
    render(<TileGrid {...props} />);
    expect(screen.getAllByTestId('tile-grid-list-item')).toHaveLength(2);
    screen
      .getAllByTestId('tile-grid-list-item')
      .forEach((item) => expect(item).toHaveClass('tile-grid-component-item-distributed'));
  });

  it('should add image for background if imgLink is provided', () => {
    const itemsWithLink = [
      { id: '0', classSuffix: 'alpha', title: 'Alpha', imgLink: '/linkAlpha.jpg' },
      { id: '1', classSuffix: 'beta', title: 'Beta', imgLink: '/linkBeta.jpg' },
    ];
    props.items = itemsWithLink;
    render(<TileGrid {...props} />);
    expect(screen.getAllByTestId('tile-grid-list-item-img-wrapper')).toHaveLength(2);
    screen
      .getAllByTestId('tile-grid-list-item-img-wrapper')
      .forEach((item) => expect(item).toHaveClass('tile-grid-component-item-img-wrapper'));
  });

  it('should handle image position', () => {
    const itemsWithLinkAndPosition = [
      { id: '0', classSuffix: 'one', title: 'One', imgLink: '/linkOne.jpg', imgAlign: 'left' },
      { id: '1', classSuffix: 'two', title: 'Two', imgLink: '/linkTwo.jpg', imgAlign: 'center' },
      { id: '2', classSuffix: 'three', title: 'Three', imgLink: '/linkThree.jpg', imgAlign: 'right' },
    ];
    props.items = itemsWithLinkAndPosition;
    render(<TileGrid {...props} />);
    expect(screen.getAllByTestId('tile-grid-list-item-img-wrapper')).toHaveLength(3);
    expect(screen.getAllByTestId('tile-grid-list-item-img-wrapper')[0]).toHaveClass(
      'tile-grid-component-item-img-wrapper-left'
    );
    expect(screen.getAllByTestId('tile-grid-list-item-img-wrapper')[1]).toHaveClass(
      'tile-grid-component-item-img-wrapper-center'
    );
    expect(screen.getAllByTestId('tile-grid-list-item-img-wrapper')[2]).toHaveClass(
      'tile-grid-component-item-img-wrapper-right'
    );
  });
});
