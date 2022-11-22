import React from 'react';
import { render, screen } from 'testing';
import PageTitle from '.';

it('should have its component name as default className', () => {
  render(<PageTitle />);
  expect(screen.getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component');
  expect(screen.getByTestId('page-title-wrapper')).toBeEmptyDOMElement();
});

it('should render its title', () => {
  render(<PageTitle title="Foo" />);
  expect(screen.getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component');
  expect(screen.getByTestId('page-title-wrapper')).not.toBeEmptyDOMElement();
  expect(screen.getByTestId('page-title-wrapper')).toHaveTextContent('Foo');
});

it('should pass through children', () => {
  const children = (
    <div data-testid="page-title-children" className="test-class">
      Party town
    </div>
  );
  render(<PageTitle title="Foo">{children}</PageTitle>);

  expect(screen.getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component');
  expect(screen.getByTestId('page-title-inline')).toHaveClass('flexible-wrapper-inline');
  expect(screen.getByTestId('flexible-spacer-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('page-title-children')).toBeInTheDocument();
  expect(screen.getByTestId('page-title-children')).toHaveClass('test-class');
  expect(screen.getByTestId('page-title-inline')).toHaveTextContent('Party town');
});

it('should be a footer when asked', () => {
  render(<PageTitle isFooter />);

  expect(screen.getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component pagetitle-component-is-footer');
  expect(screen.getByTestId('page-title-wrapper')).toBeEmptyDOMElement();
});
