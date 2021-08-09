import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import PagedGrid from '.';

afterEach(cleanup);

describe('<PagedGrid />', () => {
  it('should render with no items', () => {
    const props = {
      columns: [{ key: 'name', label: 'Name' }],
      items: [],
      perPage: 1,
    };
    const { getByTestId, queryByTestId } = render(<PagedGrid {...props} />);
    expect(getByTestId('paged-grid-wrapper')).toHaveClass('pagedgrid-component');

    expect(queryByTestId('grid-row-wrapper')).toBeInTheDocument();
    expect(queryByTestId('grid-cell-wrapper')).toBeInTheDocument();
    expect(getByTestId('grid-cell-wrapper')).toHaveTextContent('Name');

    expect(queryByTestId('paged-grid-pagination')).not.toBeInTheDocument();
  });

  it('should render with items', () => {
    const props = {
      columns: [{ key: 'name' }],
      items: [{ name: 'item1', id: 1 }, { name: 'item2', id: 2 }],
      perPage: 1,
    };
    const { queryByTestId, queryAllByTestId } = render(<PagedGrid {...props} />);
    expect(queryAllByTestId('grid-row-wrapper')).toHaveLength(2);
    queryAllByTestId('grid-row-wrapper').forEach(gridRow =>
      expect(gridRow).not.toHaveClass('grid-component-row-vertical-cell-border')
    );
    expect(queryByTestId('pagination-wrapper')).toBeInTheDocument();
  });

  it('should update grid when new page selected or items updated', () => {
    const props = {
      columns: [{ key: 'name' }],
      items: [{ name: 'item1', id: 1 }, { name: 'item2', id: 2 }, { name: 'item3', id: 3 }],
      perPage: 1,
      verticalCellBorder: true,
    };
    const { queryAllByTestId, getByTestId, getByText, rerender } = render(<PagedGrid {...props} />);
    expect(queryAllByTestId('grid-row-wrapper')).toHaveLength(2);
    queryAllByTestId('grid-row-wrapper').forEach(gridRow =>
      expect(gridRow).toHaveClass('grid-component-row-vertical-cell-border')
    );
    expect(getByTestId('paged-grid-pagination-info')).toHaveClass('pagedgrid-component-pagination-info');
    expect(getByTestId('paged-grid-pagination-info')).toHaveTextContent('1–1 of 3');

    fireEvent.click(getByText('3'));
    expect(getByTestId('paged-grid-pagination-info')).toHaveTextContent('3–3 of 3');

    // Update items (no changes)
    rerender(<PagedGrid {...props} />);
    expect(getByTestId('paged-grid-pagination-info')).toHaveTextContent('3–3 of 3');

    // Update items (one removed)
    props.items.shift();
    rerender(<PagedGrid {...props} />);
    expect(getByTestId('paged-grid-pagination-info')).toHaveTextContent('2–2 of 2');
  });
});
