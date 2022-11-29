import React from 'react';
import { render, screen } from 'testing';
import SvgSymbol from '../SvgSymbol';
import Empty from '.';

describe('<Empty />', () => {
  it('should render with defaults', () => {
    render(<Empty />);
    expect(screen.getByTestId('empty-wrapper')).toHaveClass('empty-component');
    expect(screen.getByTestId('empty-text')).toHaveClass('empty-component-text');
    expect(screen.getByTestId('empty-text')).toHaveTextContent('Nothing to show.');
  });

  it('should render an empty div when passed a non-empty collection Array', () => {
    render(<Empty collection={[1]} />);
    expect(screen.queryByTestId('empty-text')).not.toBeInTheDocument();
  });

  it('should render an empty div when passed a non-empty collection Object', () => {
    render(<Empty collection={{ foo: 1 }} />);
    expect(screen.queryByTestId('empty-text')).not.toBeInTheDocument();
  });

  it('should render with custom SVG symbol', () => {
    const svgSymbol = <SvgSymbol href="//wherever.svg#id" classSuffixes={['class']} />;
    const props = { icon: svgSymbol, text: 'Where is everybody?' };
    render(<Empty {...props} />);
    expect(screen.getByTestId('empty-wrapper')).toHaveClass('empty-component');
    expect(screen.getByTestId('empty-text')).toHaveClass('empty-component-text');
    expect(screen.getByTestId('empty-text')).toHaveTextContent('Where is everybody?');
    expect(screen.getByTestId('svg-symbol-wrapper')).toHaveClass('aui--svg-symbol-component-class');
    expect(screen.getByTestId('svg-symbol-use')).toHaveAttribute('href', '//wherever.svg#id');
  });
});
