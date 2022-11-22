import React from 'react';
import { render, screen } from 'testing';
import InformationBox from '.';
import SvgSymbol from '../SvgSymbol';

const icon = <SvgSymbol href="assets/img#done" />;

it('should render with props', () => {
  render(
    <InformationBox title="render title here" icon={icon}>
      <div>I am child</div>
    </InformationBox>
  );

  expect(screen.getByTestId('information-box-wrapper')).toHaveClass('aui--information-box aui--information-box-light');

  expect(screen.getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
  expect(screen.getByTestId('information-box-title')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-title')).toHaveTextContent('render title here');

  expect(screen.getByTestId('information-box-icon')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');
  expect(screen.getByTestId('information-box-node')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-node')).toHaveClass('aui--information-box-node');
});

it('should render without a title when title props is not provided', () => {
  render(
    <InformationBox icon={icon}>
      <div>I am child</div>
    </InformationBox>
  );

  expect(screen.queryByTestId('information-box-title')).not.toBeInTheDocument();

  expect(screen.getByTestId('information-box-icon')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');

  expect(screen.getByTestId('information-box-node')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-node')).toHaveClass('aui--information-box-node');

  expect(screen.getByTestId('svg-symbol-wrapper')).toBeInTheDocument();
});

it('should render without an icon when icon props is not provided', () => {
  render(
    <InformationBox title="render title here">
      <div data-testid="information-box-test-children">I am child</div>
    </InformationBox>
  );

  expect(screen.getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
  expect(screen.getByTestId('information-box-title')).toBeInTheDocument();

  expect(screen.getByTestId('information-box-test-children')).toBeInTheDocument();
  expect(screen.queryByTestId('information-box-icon')).not.toBeInTheDocument();
});

it('should render without children nodes when children props is not provided', () => {
  render(<InformationBox title="render title here" icon={icon} />);

  expect(screen.getByTestId('information-box-title')).toHaveClass('aui--information-box-title');
  expect(screen.getByTestId('information-box-title')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-icon')).toHaveClass('aui--information-box-icon');
  expect(screen.getByTestId('information-box-icon')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-node')).toBeInTheDocument();
  expect(screen.getByTestId('information-box-node')).toHaveClass('aui--information-box-node');
  expect(screen.getByTestId('information-box-node')).toBeEmptyDOMElement();
});

it('should accept custom class names', () => {
  render(<InformationBox title="Class name test title" className="cx" />);
  expect(screen.getByTestId('information-box-wrapper')).toHaveClass(
    'aui--information-box aui--information-box-light cx'
  );
});

it('should accept custom theme', () => {
  render(<InformationBox title="Class name test title" theme="primary" />);
  expect(screen.getByTestId('information-box-wrapper')).toHaveClass(
    'aui--information-box aui--information-box-primary'
  );
});
