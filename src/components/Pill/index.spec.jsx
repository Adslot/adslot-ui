import React from 'react';
import { render, cleanup, queryByAttribute, queryAllByAttribute, fireEvent } from '@testing-library/react';
import Pill from '.';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

describe('<Pill />', () => {
  it('should have default style', () => {
    const { container } = render(<Pill>Test</Pill>);

    expect(queryAllByClass(container, 'aui--pill')).toHaveLength(1);
    expect(queryAllByClass(container, 'aui--pill-children')).toHaveLength(1);
    expect(queryAllByClass(container, 'aui--pill-clickable')).toHaveLength(0);
    expect(getByClass(container, 'aui--pill-children')).toHaveTextContent('Test');
  });

  it('should allow className prop', () => {
    const { container } = render(<Pill className="test">Test</Pill>);
    expect(queryAllByClass(container, 'aui--pill test')).toHaveLength(1);
  });

  it('should allow onClick prop', () => {
    const onClickMock = jest.fn();
    const { container } = render(<Pill onClick={onClickMock}>Test</Pill>);
    expect(queryAllByClass(container, 'aui--pill aui--pill-clickable')).toHaveLength(1);
    fireEvent.click(getByClass(container, 'aui--pill aui--pill-clickable'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should support custom dts', () => {
    const { container } = render(<Pill dts="test-dts">Test</Pill>);
    expect(getByClass(container, 'aui--pill')).toHaveAttribute('data-test-selector', 'test-dts');
  });
});
