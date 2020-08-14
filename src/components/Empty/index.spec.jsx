import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SvgSymbol from '../SvgSymbol';
import Empty from '.';

afterEach(cleanup);

describe('<Empty />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<Empty />);
    expect(getByTestId('empty-wrapper')).toHaveClass('empty-component');
    expect(getByTestId('empty-text')).toHaveClass('empty-component-text');
    expect(getByTestId('empty-text')).toHaveTextContent('Nothing to show.');
  });

  it('should render an empty div when passed a non-empty collection Array', () => {
    const { container, getByTestId } = render(<Empty collection={[1]} />);
    const snapshot = getByTestId('empty-wrapper');
    expect(container.firstChild).toMatchObject(snapshot);
  });

  it('should render an empty div when passed a non-empty collection Object', () => {
    const { container, getByTestId } = render(<Empty collection={{ foo: 1 }} />);
    const snapshot = getByTestId('empty-wrapper');
    expect(container.firstChild).toMatchObject(snapshot);
  });

  it('should render with custom SVG symbol', () => {
    const svgSymbol = <SvgSymbol href="//wherever.svg#id" classSuffixes={['class']} />;
    const props = { icon: svgSymbol, text: 'Where is everybody?' };
    const { getByTestId } = render(<Empty {...props} />);
    expect(getByTestId('empty-wrapper')).toHaveClass('empty-component');
    expect(getByTestId('empty-text')).toHaveClass('empty-component-text');
    expect(getByTestId('empty-text')).toHaveTextContent('Where is everybody?');
    expect(getByTestId('svg-symbol-wrapper')).toHaveClass('aui--svg-symbol-component-class');
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', '//wherever.svg#id');
  });
});
