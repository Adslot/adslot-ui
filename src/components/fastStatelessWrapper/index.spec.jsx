import React from 'react';
import { render, cleanup } from '@testing-library/react';
import fastStatelessWrapper from '.';
import Grid from '../Grid';

afterEach(cleanup);

describe('fastStatelessWrapper', () => {
  it('should re-render on specified attribute change', () => {
    const GridFast = fastStatelessWrapper(Grid, ['mutable']);

    const { getByTestId, rerender } = render(<GridFast mutable="foo" fixed="bar" />);
    const firstSnapshot = getByTestId('grid-wrapper');
    rerender(<GridFast mutable="quux" fixed="bar" />);
    expect(getByTestId('grid-wrapper')).toMatchObject(firstSnapshot);
  });
});
