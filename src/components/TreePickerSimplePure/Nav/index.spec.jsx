import React from 'react';
import { render, screen, user } from 'testing';
import TreePickerNav from '.';

const breadcrumbNodes = [
  { id: 'a', label: 'UK' },
  { id: 'b', label: 'London' },
];

const mockProps = (overrides) => ({
  breadcrumbNodes,
  breadcrumbOnClick: jest.fn(),
  onChange: jest.fn(),
  onClear: jest.fn(),
  searchValue: 'needle',
  disabled: false,
  ...overrides,
});

it('should render with defaults', () => {
  render(<TreePickerNav {...mockProps()} />);

  expect(screen.getAllByClass('treepickernav-component')).toHaveLength(1);
  expect(screen.getByClass('treepickernav-component')).not.toHaveClass('disabled');

  expect(screen.getByClass('treepickernav-component')).toContainElement(screen.getByTestId('search-wrapper'));
  expect(screen.getByTestId('search-wrapper')).toBeInTheDocument();

  expect(screen.getByClass('treepickernav-component')).toContainElement(screen.getByTestId('breadcrumb-wrapper'));
  expect(screen.getByTestId('breadcrumb-wrapper')).toBeInTheDocument();
});

it('should render with props', () => {
  render(<TreePickerNav {...mockProps()} />);

  expect(screen.getAllByClass('treepickernav-component')).toHaveLength(1);
  expect(screen.getByClass('treepickernav-component')).not.toHaveClass('disabled');

  expect(screen.getByClass('treepickernav-component')).toContainElement(screen.getByTestId('search-wrapper'));
  expect(screen.getByTestId('search-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('search-input')).toHaveValue('needle');

  expect(screen.getByClass('treepickernav-component')).toContainElement(screen.getByTestId('breadcrumb-wrapper'));
  expect(screen.getByTestId('breadcrumb-wrapper')).toBeInTheDocument();
  expect(screen.queryAllByTestId('breadcrumb-node-wrapper')).toHaveLength(3);
});

it('should render icons with given svgSymbol and pass them to Search', () => {
  render(
    <TreePickerNav
      {...mockProps({ searchOnEnter: true })}
      svgSymbolSearch={<div className="testing-search-icon" />}
      svgSymbolCancel={<div className="testing-cancel-icon" />}
    />
  );

  expect(screen.getAllByClass('testing-search-icon')).toHaveLength(1);
  expect(screen.getAllByClass('testing-cancel-icon')).toHaveLength(1);
});

it('should call breadcrumbOnClick when clicked on breadcrumbs node', async () => {
  const props = mockProps();
  render(<TreePickerNav {...props} />);

  await user.click(screen.queryAllByTestId('breadcrumb-node-wrapper')[0]);
  expect(props.breadcrumbOnClick).toHaveBeenCalledTimes(1);
});

it('should hide the search when showSearch is false', () => {
  render(<TreePickerNav {...mockProps({ showSearch: false })} />);
  expect(screen.queryByTestId('search-wrapper')).not.toBeInTheDocument();
});

describe('disabled', () => {
  it('should have disabled class', () => {
    render(<TreePickerNav {...mockProps({ disabled: true })} />);
    expect(screen.getByTestId('treepicker-nav-wrapper')).toHaveClass('disabled');
  });

  it('should render breadcrumbs', () => {
    render(<TreePickerNav {...mockProps({ disabled: true })} />);
    expect(screen.getByTestId('breadcrumb-wrapper')).toBeInTheDocument();
  });

  it('should render breadcrumbs node', () => {
    render(<TreePickerNav {...mockProps({ disabled: true })} />);
    expect(screen.getAllByTestId('breadcrumb-node-wrapper')).toHaveLength(3);
  });

  it('should not call breadcrumbOnClick when clicked on breadcrumbs node', async () => {
    const props = mockProps({ disabled: true });
    render(<TreePickerNav {...props} />);
    await user.click(screen.getAllByTestId('breadcrumb-node-wrapper')[0]);
    expect(props.breadcrumbOnClick).toHaveBeenCalledTimes(0);
  });
});
