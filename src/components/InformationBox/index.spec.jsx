import React from 'react';
import { render, cleanup } from '@testing-library/react';
import InformationBox from '.';
import SvgSymbol from '../SvgSymbol';

afterEach(cleanup);

describe('<InformationBox />', () => {
  const icon = <SvgSymbol href="assets/img#done" />;

  it('should render with props', () => {
    const { getByTestId, queryAllByTestId } = render(
      <InformationBox title="render title here" icon={icon}>
        <div>I am child</div>
      </InformationBox>
    );

    expect(getByTestId('information-box-wrapper')).toHaveClass('aui--information-box aui--information-box-light');

    expect(getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
    expect(queryAllByTestId('information-box-title')).toHaveLength(1);
    expect(getByTestId('information-box-title')).toHaveTextContent('render title here');

    expect(queryAllByTestId('information-box-icon')).toHaveLength(1);
    expect(getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');
    expect(queryAllByTestId('information-box-node')).toHaveLength(1);
    expect(getByTestId('information-box-node')).toHaveClass('aui--information-box-node');
  });

  it('should render without a title when title props is not provided', () => {
    const { getByTestId, queryAllByTestId } = render(
      <InformationBox icon={icon}>
        <div>I am child</div>
      </InformationBox>
    );

    expect(queryAllByTestId('information-box-title')).toHaveLength(0);

    expect(queryAllByTestId('information-box-icon')).toHaveLength(1);
    expect(getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');

    expect(queryAllByTestId('information-box-node')).toHaveLength(1);
    expect(getByTestId('information-box-node')).toHaveClass('aui--information-box-node');

    expect(queryAllByTestId('svg-symbol-wrapper')).toHaveLength(1);
  });

  it('should render without an icon when icon props is not provided', () => {
    const { getByTestId, queryAllByTestId } = render(
      <InformationBox title="render title here">
        <div data-testid="information-box-test-children">I am child</div>
      </InformationBox>
    );

    expect(getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
    expect(queryAllByTestId('information-box-title')).toHaveLength(1);

    expect(queryAllByTestId('information-box-test-children')).toHaveLength(1);
    expect(queryAllByTestId('information-box-icon')).toHaveLength(0);
  });

  it('should render without children nodes when children props is not provided', () => {
    const { getByTestId, queryAllByTestId } = render(<InformationBox title="render title here" icon={icon} />);

    expect(getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
    expect(queryAllByTestId('information-box-title')).toHaveLength(1);
    expect(getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');
    expect(queryAllByTestId('information-box-icon')).toHaveLength(1);
    expect(queryAllByTestId('information-box-node')).toHaveLength(1);
    expect(getByTestId('information-box-node')).toHaveClass('aui--information-box-node');
    expect(getByTestId('information-box-node')).toBeEmpty();
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
