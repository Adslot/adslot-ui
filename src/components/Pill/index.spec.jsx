import React from 'react';
import { render, screen, user } from 'testing';
import Pill from '.';

it('is not clickable by default', () => {
  render(<Pill>Test</Pill>);
  const pill = screen.getByClass('aui--pill');
  expect(pill).not.toHaveClass('aui-clickable');
  expect(pill).toHaveTextContent('Test');
});

it('supports custom className', () => {
  render(<Pill className="test">Test</Pill>);
  expect(screen.getByClass('aui--pill')).toHaveClass('test');
});

it('supports size prop', () => {
  render(<Pill size="large">Test</Pill>);
  expect(screen.getByClass('aui--pill')).toHaveClass('aui-large');
});

it('is clickable if onClick is given', async () => {
  const onClick = jest.fn();
  render(<Pill onClick={onClick}>Test</Pill>);
  const pill = screen.getByClass('aui--pill');
  expect(pill).toHaveClass('aui-clickable');

  await user.click(pill);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('supports dts', () => {
  render(<Pill dts="test-dts">Test</Pill>);
  expect(screen.getByClass('aui--pill')).toHaveAttribute('data-test-selector', 'test-dts');
});
