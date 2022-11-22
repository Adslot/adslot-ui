import React from 'react';
import { render, screen, user } from 'testing';
import PagedGrid from '.';

it('should render with no items', () => {
  const props = {
    columns: [{ key: 'name', label: 'Name' }],
    items: [],
    perPage: 1,
  };
  render(<PagedGrid {...props} />);
  expect(screen.getByTestId('paged-grid-wrapper')).toHaveClass('pagedgrid-component');

  expect(screen.getByTestId('grid-row-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-cell-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-cell-wrapper')).toHaveTextContent('Name');

  expect(screen.queryByTestId('paged-grid-pagination')).not.toBeInTheDocument();
});

it('should render with items', () => {
  const props = {
    columns: [{ key: 'name' }],
    items: [
      { name: 'item1', id: 1 },
      { name: 'item2', id: 2 },
    ],
    perPage: 1,
  };
  render(<PagedGrid {...props} />);
  expect(screen.getAllByTestId('grid-row-wrapper')).toHaveLength(2);
  screen
    .getAllByTestId('grid-row-wrapper')
    .forEach((gridRow) => expect(gridRow).not.toHaveClass('grid-component-row-vertical-cell-border'));
  expect(screen.getByTestId('pagination-wrapper')).toBeInTheDocument();
});

it('should update grid when new page selected or items updated', async () => {
  const props = {
    columns: [{ key: 'name' }],
    items: [
      { name: 'item1', id: 1 },
      { name: 'item2', id: 2 },
      { name: 'item3', id: 3 },
    ],
    perPage: 1,
    verticalCellBorder: true,
  };
  const view = render(<PagedGrid {...props} />);
  expect(screen.getAllByTestId('grid-row-wrapper')).toHaveLength(2);
  screen
    .getAllByTestId('grid-row-wrapper')
    .forEach((gridRow) => expect(gridRow).toHaveClass('grid-component-row-vertical-cell-border'));
  expect(screen.getByTestId('paged-grid-pagination-info')).toHaveClass('pagedgrid-component-pagination-info');
  expect(screen.getByTestId('paged-grid-pagination-info')).toHaveTextContent('1–1 of 3');

  await user.click(screen.getByText('3'));
  expect(screen.getByTestId('paged-grid-pagination-info')).toHaveTextContent('3–3 of 3');

  // Update items (no changes)
  view.rerender(<PagedGrid {...props} />);
  expect(screen.getByTestId('paged-grid-pagination-info')).toHaveTextContent('3–3 of 3');

  // Update items (one removed)
  props.items.shift();
  view.rerender(<PagedGrid {...props} />);
  expect(screen.getByTestId('paged-grid-pagination-info')).toHaveTextContent('2–2 of 2');
});
