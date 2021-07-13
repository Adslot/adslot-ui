import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InformationBox from '.';
import SvgSymbol from '../SvgSymbol';

afterEach(cleanup);

describe('<InformationBox />', () => {
  const icon = <SvgSymbol href="assets/img#done" />;

  it('should render with props', () => {
    const { getByTestId, queryByTestId } = render(
      <InformationBox title="render title here" icon={icon}>
        <div>I am child</div>
      </InformationBox>
    );

    expect(getByTestId('information-box-wrapper')).toHaveClass('aui--information-box aui--information-box-light');

    expect(getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
    expect(queryByTestId('information-box-title')).toBeInTheDocument();
    expect(getByTestId('information-box-title')).toHaveTextContent('render title here');

    expect(queryByTestId('information-box-icon')).toBeInTheDocument();
    expect(getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');
    expect(queryByTestId('information-box-node')).toBeInTheDocument();
    expect(getByTestId('information-box-node')).toHaveClass('aui--information-box-node');
  });

  it('should render without a title when title props is not provided', () => {
    const { getByTestId, queryByTestId } = render(
      <InformationBox icon={icon}>
        <div>I am child</div>
      </InformationBox>
    );

    expect(queryByTestId('information-box-title')).not.toBeInTheDocument();

    expect(queryByTestId('information-box-icon')).toBeInTheDocument();
    expect(getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');

    expect(queryByTestId('information-box-node')).toBeInTheDocument();
    expect(getByTestId('information-box-node')).toHaveClass('aui--information-box-node');

    expect(queryByTestId('svg-symbol-wrapper')).toBeInTheDocument();
  });

  it('should render without an icon when icon props is not provided', () => {
    const { getByTestId, queryByTestId } = render(
      <InformationBox title="render title here">
        <div data-testid="information-box-test-children">I am child</div>
      </InformationBox>
    );

    expect(getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
    expect(queryByTestId('information-box-title')).toBeInTheDocument();

    expect(queryByTestId('information-box-test-children')).toBeInTheDocument();
    expect(queryByTestId('information-box-icon')).not.toBeInTheDocument();
  });

  it('should render without children nodes when children props is not provided', () => {
    const { getByTestId, queryByTestId } = render(<InformationBox title="render title here" icon={icon} />);

    expect(getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
    expect(queryByTestId('information-box-title')).toBeInTheDocument();
    expect(getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');
    expect(queryByTestId('information-box-icon')).toBeInTheDocument();
    expect(queryByTestId('information-box-node')).toBeInTheDocument();
    expect(getByTestId('information-box-node')).toHaveClass('aui--information-box-node');
    expect(getByTestId('information-box-node')).toBeEmptyDOMElement();
  });

  it('should accept custom class names', () => {
    const { getByTestId } = render(<InformationBox title="Class name test title" className="cx" />);
    expect(getByTestId('information-box-wrapper')).toHaveClass('aui--information-box aui--information-box-light cx');
  });

  it('should accept custom theme', () => {
    const { getByTestId } = render(<InformationBox title="Class name test title" theme="primary" />);
    expect(getByTestId('information-box-wrapper')).toHaveClass('aui--information-box aui--information-box-primary');
  });
});
