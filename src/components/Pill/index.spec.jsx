import React from 'react';
import { render, screen, user } from 'testing';
import Pill from '.';

describe('<Pill />', () => {
  it('should have default style', () => {
    render(<Pill>Test</Pill>);
    expect(screen.queryAllByClass('aui--pill aui--pill-medium')).toHaveLength(1);
    expect(screen.queryAllByClass('aui--pill-children')).toHaveLength(1);
    expect(screen.queryAllByClass('aui--pill-clickable')).toHaveLength(0);
    expect(screen.getByClass('aui--pill-children')).toHaveTextContent('Test');
  });

  it('should allow className prop', () => {
    render(<Pill className="test">Test</Pill>);
    expect(screen.queryAllByClass('aui--pill aui--pill-medium test')).toHaveLength(1);
  });

  it('should allow size prop', () => {
    render(<Pill size="large">Test</Pill>);
    expect(screen.queryAllByClass('aui--pill aui--pill-large')).toHaveLength(1);
  });

  it('should allow onClick prop', async () => {
    const onClickMock = jest.fn();
    render(<Pill onClick={onClickMock}>Test</Pill>);
    expect(screen.queryAllByClass('aui--pill aui--pill-medium aui--pill-clickable')).toHaveLength(1);
    await user.click(screen.getByClass('aui--pill aui--pill-medium aui--pill-clickable'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should support custom dts', () => {
    render(<Pill dts="test-dts">Test</Pill>);
    expect(screen.getByClass('aui--pill aui--pill-medium')).toHaveAttribute('data-test-selector', 'test-dts');
  });
});
