import React from 'react';
import { render, cleanup, queryByAttribute, queryAllByAttribute } from '@testing-library/react';
import StatusPill from '.';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');
const queryAllByClass = queryAllByAttribute.bind(null, 'class');

describe('<StatusPill />', () => {
  it('should have default style', () => {
    const { container, getByText } = render(<StatusPill status="test" />);
    expect(queryAllByClass(container, 'aui--pill aui--status-pill aui--status-pill-primary')).toHaveLength(1);
    expect(getByText('test', getByClass(container, 'aui--pill aui--status-pill aui--status-pill-primary'))).toHaveClass(
      'aui--pill-children'
    );
  });

  it('should allow style prop', () => {
    const { container } = render(<StatusPill status="test" displayStyle="success" />);
    expect(queryAllByClass(container, 'aui--pill aui--status-pill aui--status-pill-success')).toHaveLength(1);
  });

  it('should allow inverse prop', () => {
    const { container } = render(<StatusPill status="test" displayStyle="success" inverse />);
    expect(
      queryAllByClass(container, 'aui--pill aui--status-pill aui--status-pill-success aui--status-pill-inverse')
    ).toHaveLength(1);
  });

  it('should support custom dts', () => {
    const { container } = render(<StatusPill status="test" dts="test-dts" />);
    expect(getByClass(container, 'aui--pill aui--status-pill aui--status-pill-primary')).toHaveAttribute(
      'data-test-selector',
      'test-dts'
    );
  });
});
