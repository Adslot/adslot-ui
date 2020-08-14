import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PageTitle from '.';

afterEach(cleanup);

describe('<PageTitle />', () => {
  it('should have its component name as default className', () => {
    const { getByTestId } = render(<PageTitle />);
    expect(getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component');
    expect(getByTestId('page-title-wrapper')).toBeEmpty();
  });

  it('should render its title', () => {
    const { getByTestId } = render(<PageTitle title="Foo" />);
    expect(getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component');
    expect(getByTestId('page-title-wrapper')).not.toBeEmpty();
    expect(getByTestId('page-title-wrapper')).toHaveTextContent('Foo');
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="page-title-children" className="test-class">
        Party town
      </div>
    );
    const { getByTestId, queryAllByTestId } = render(<PageTitle title="Foo">{children}</PageTitle>);

    expect(getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component');
    expect(getByTestId('page-title-inline')).toHaveClass('flexible-wrapper-inline');
    expect(queryAllByTestId('flexible-spacer-wrapper')).toHaveLength(1);
    expect(queryAllByTestId('page-title-children')).toHaveLength(1);
    expect(getByTestId('page-title-children')).toHaveClass('test-class');
    expect(getByTestId('page-title-inline')).toHaveTextContent('Party town');
  });

  it('should be a footer when asked', () => {
    const { getByTestId } = render(<PageTitle isFooter />);

    expect(getByTestId('page-title-wrapper')).toHaveClass('pagetitle-component pagetitle-component-is-footer');
    expect(getByTestId('page-title-wrapper')).toBeEmpty();
  });
});
