import _ from 'lodash';
import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent } from '@testing-library/react';
import Tile from '.';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');
const queryByClass = queryByAttribute.bind(null, 'class');

const makeProps = override =>
  _.merge(
    {
      id: '123',
    },
    override
  );

describe('<Tile />', () => {
  it('should have default style', () => {
    const { container } = render(<Tile {...makeProps()} />);

    expect(queryByClass(container, 'aui--tile')).toBeInTheDocument();
    expect(queryByClass(container, 'aui--tile-title')).toBeInTheDocument();
    expect(getByClass(container, 'aui--tile-title')).toHaveTextContent('');
    expect(queryByClass(container, 'aui--tile-logo')).toBeInTheDocument();
    expect(getByClass(container, 'aui--tile-logo')).toHaveTextContent('');
  });

  it('should allow title prop', () => {
    const { container } = render(<Tile {...makeProps({ title: 'test-title' })} />);

    expect(queryByClass(container, 'aui--tile-title')).toBeInTheDocument();
    expect(getByClass(container, 'aui--tile-title')).toHaveTextContent('test-title');
  });

  it('should allow imgLink prop', () => {
    const { container, getByAltText, queryByAltText } = render(<Tile {...makeProps({ imgLink: 'fake-url' })} />);

    expect(queryByClass(container, 'aui--tile-logo')).toBeInTheDocument();
    expect(queryByAltText('tile-logo', getByClass(container, 'aui--tile-logo'))).toBeInTheDocument();
    expect(getByAltText('tile-logo')).toHaveAttribute('src', 'fake-url');
  });

  it('should allow className prop', () => {
    const { container } = render(<Tile {...makeProps({ className: 'test' })} />);
    expect(queryByClass(container, 'aui--tile test')).toBeInTheDocument();
  });

  it('should allow onClick prop', () => {
    const onClickMock = jest.fn();
    const { container } = render(<Tile {...makeProps({ onClick: onClickMock })} />);
    fireEvent.click(getByClass(container, 'aui--tile'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should support custom dts', () => {
    const { container } = render(<Tile {...makeProps({ dts: 'test-dts' })} />);
    expect(getByClass(container, 'aui--tile')).toHaveAttribute('data-test-selector', 'test-dts');
  });
});
