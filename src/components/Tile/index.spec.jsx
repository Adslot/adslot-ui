import _ from 'lodash';
import React from 'react';
import { render, screen, user } from 'testing';
import Tile from '.';

const makeProps = (override) =>
  _.merge(
    {
      id: '123',
    },
    override
  );

it('should have default style', () => {
  render(<Tile {...makeProps()} />);

  expect(screen.getByClass('aui--tile')).toBeInTheDocument();
  expect(screen.getByClass('aui--tile-title')).toBeInTheDocument();
  expect(screen.getByClass('aui--tile-title')).toHaveTextContent('');
  expect(screen.getByClass('aui--tile-logo')).toBeInTheDocument();
  expect(screen.getByClass('aui--tile-logo')).toHaveTextContent('');
});

it('should allow title prop', () => {
  render(<Tile {...makeProps({ title: 'test-title' })} />);

  expect(screen.getByClass('aui--tile-title')).toBeInTheDocument();
  expect(screen.getByClass('aui--tile-title')).toHaveTextContent('test-title');
});

it('should allow imgLink prop', () => {
  render(<Tile {...makeProps({ imgLink: 'fake-url' })} />);

  expect(screen.getByClass('aui--tile-logo')).toBeInTheDocument();
  expect(screen.getByAltText('tile-logo', screen.getByClass('aui--tile-logo'))).toBeInTheDocument();
  expect(screen.getByAltText('tile-logo')).toHaveAttribute('src', 'fake-url');
});

it('should allow className prop', () => {
  render(<Tile {...makeProps({ className: 'test' })} />);
  expect(screen.getByClass('aui--tile')).toHaveClass('test');
});

it('should allow onClick prop', async () => {
  const onClickMock = jest.fn();
  render(<Tile {...makeProps({ onClick: onClickMock })} />);
  await user.click(screen.getByClass('aui--tile'));
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it('should support custom dts', () => {
  render(<Tile {...makeProps({ dts: 'test-dts' })} />);
  expect(screen.getByClass('aui--tile')).toHaveAttribute('data-test-selector', 'test-dts');
});
