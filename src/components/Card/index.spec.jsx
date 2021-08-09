import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Card from '.';

afterEach(cleanup);

describe('<Card.Container />', () => {
  it('should render and pass through children', () => {
    const children = (
      <div data-testid="card-container-test-children" className="test-class">
        Test Text
      </div>
    );
    const { getByTestId, queryByTestId } = render(<Card.Container>{children}</Card.Container>);

    expect(getByTestId('card-container-wrapper')).toHaveClass('card-component');
    expect(queryByTestId('card-container-wrapper')).toBeInTheDocument();
    expect(getByTestId('card-container-test-children')).toHaveClass('test-class');
    expect(getByTestId('card-container-test-children')).toHaveTextContent('Test Text');
  });

  it('should render with classNames', () => {
    const { getByTestId, queryByTestId } = render(<Card.Container className="red blue">Test Text</Card.Container>);
    expect(getByTestId('card-container-wrapper')).toHaveClass('card-component red blue');
    expect(queryByTestId('card-container-wrapper')).toBeInTheDocument();
  });

  it('should render with accent', () => {
    const { getByTestId } = render(<Card.Container accent="foo">Test Text</Card.Container>);
    expect(getByTestId('card-container-wrapper')).toHaveClass('card-component accent accent-foo');
  });

  it('should render with appended and nested children', () => {
    const { getByTestId, queryByText, queryAllByTestId } = render(
      <Card.Container accent="foo">
        <Card.Content>Nested</Card.Content>
        <Card.Content append>Appended</Card.Content>
      </Card.Container>
    );

    expect(queryAllByTestId('card-content-wrapper')).toHaveLength(2); // Should have two card contents
    expect(getByTestId('card-content-container-wrapper')).toHaveTextContent('Nested');
    expect(getByTestId('card-container-wrapper')).toContainElement(queryByText(/Appended/i));
  });

  it('should apply data-test-selector', () => {
    const { getByTestId } = render(<Card.Container dts="card-component-container">Test</Card.Container>);
    expect(getByTestId('card-container-wrapper')).toHaveAttribute('data-test-selector', 'card-component-container');
  });
});

describe('<Card.Content />', () => {
  it('should render and pass through children', () => {
    const children = (
      <div data-testid="card-content-test-children" className="test-class">
        Test Text
      </div>
    );

    const { getByTestId, queryByTestId } = render(<Card.Content>{children}</Card.Content>);

    expect(getByTestId('card-content-wrapper')).toHaveClass('card-component-content');
    expect(queryByTestId('card-content-wrapper')).toBeInTheDocument();
    expect(getByTestId('card-content-test-children')).toHaveClass('test-class');
    expect(getByTestId('card-content-test-children')).toHaveTextContent('Test Text');
  });

  it('should render with "stretch" class', () => {
    const { getByTestId, queryByTestId } = render(<Card.Content stretch>Test Text</Card.Content>);
    expect(getByTestId('card-content-wrapper')).toHaveClass('card-component-content stretch');
    expect(queryByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should render with "fill" class', () => {
    const { getByTestId, queryByTestId } = render(<Card.Content fill>Test Text</Card.Content>);
    expect(getByTestId('card-content-wrapper')).toHaveClass('card-component-content fill');
    expect(queryByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should render with appended content', () => {
    const { getByTestId, queryByTestId } = render(<Card.Content append>Test Text</Card.Content>);
    expect(getByTestId('card-content-wrapper')).toHaveClass('card-component-content append');
    expect(queryByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should render with custom classNames', () => {
    const { getByTestId, queryByTestId } = render(
      <Card.Content fill className="some classes">
        Test Text
      </Card.Content>
    );
    expect(getByTestId('card-content-wrapper')).toHaveClass('card-component-content fill some classes');
    expect(queryByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should apply data-test-selector', () => {
    const { getByTestId } = render(<Card.Content dts="card-component-content">Test</Card.Content>);
    expect(getByTestId('card-content-wrapper')).toHaveAttribute('data-test-selector', 'card-component-content');
  });
});
