import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SvgSymbol from '.';

afterEach(cleanup);

describe('<SvgSymbol />', () => {
  it('should render with href', () => {
    const { getByTestId, queryByTestId } = render(<SvgSymbol />);
    expect(getByTestId('svg-symbol-wrapper')).toHaveClass('aui--svg-symbol-component');
    expect(queryByTestId('svg-symbol-img')).not.toBeInTheDocument();
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', '');
  });

  it('should render with props', () => {
    const props = {
      classSuffixes: ['16', 'red'],
      href: '/assets/other-svg-symbols.svg#checklist-incomplete',
    };

    const { getByTestId } = render(<SvgSymbol {...props} />);
    expect(getByTestId('svg-symbol-wrapper')).toHaveClass(
      'aui--svg-symbol-component aui--svg-symbol-component-16 aui--svg-symbol-component-red'
    );
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', '/assets/other-svg-symbols.svg#checklist-incomplete');
  });

  it('should render with base64 encoded data', () => {
    const encodedData =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjciLz48cGF0aCBkPSJNNi4wNyA2LjA3bDMuODYgMy44Nm0wLTMuODZMNi4wNyA5LjkzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==';
    const { getByTestId, queryByTestId } = render(<SvgSymbol href={encodedData} isCircle={false} />);
    expect(queryByTestId('svg-symbol-img')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-img')).toHaveAttribute('src', encodedData);
  });

  it('should render with isCircle', () => {
    const { getByTestId, queryByTestId } = render(<SvgSymbol isCircle />);
    expect(queryByTestId('svg-symbol-is-circle')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-is-circle')).toHaveClass('aui--svg-symbol-component-circle');
    expect(queryByTestId('svg-symbol-wrapper')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', '');
  });

  it('should render with props including isCircle', () => {
    const { getByTestId, queryByTestId } = render(<SvgSymbol isCircle href="foo#bar" classSuffixes={['70']} />);
    expect(queryByTestId('svg-symbol-is-circle')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-is-circle')).toHaveClass(
      'aui--svg-symbol-component-circle aui--svg-symbol-component-circle-70'
    );
    expect(queryByTestId('svg-symbol-wrapper')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-wrapper')).toHaveClass('aui--svg-symbol-component aui--svg-symbol-component-70');
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', 'foo#bar');
  });

  it('should not render circle background with false isCircle', () => {
    const { getByTestId, queryByTestId } = render(<SvgSymbol isCircle={false} href="foo#bar" classSuffixes={['70']} />);
    expect(queryByTestId('svg-symbol-is-circle')).not.toBeInTheDocument();
    expect(queryByTestId('svg-symbol-wrapper')).toBeInTheDocument();
    expect(getByTestId('svg-symbol-wrapper')).toHaveClass('aui--svg-symbol-component aui--svg-symbol-component-70');
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', 'foo#bar');
  });
});
