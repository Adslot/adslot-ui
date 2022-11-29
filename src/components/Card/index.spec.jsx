import React from 'react';
import { render, screen } from 'testing';
import Card from '.';

describe('<Card.Container />', () => {
  it('should render and pass through children', () => {
    const children = (
      <div data-testid="card-container-test-children" className="test-class">
        Test Text
      </div>
    );
    render(<Card.Container>{children}</Card.Container>);

    expect(screen.getByTestId('card-container-wrapper')).toHaveClass('card-component');
    expect(screen.getByTestId('card-container-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('card-container-test-children')).toHaveClass('test-class');
    expect(screen.getByTestId('card-container-test-children')).toHaveTextContent('Test Text');
  });

  it('should render with classNames', () => {
    render(<Card.Container className="red blue">Test Text</Card.Container>);
    expect(screen.getByTestId('card-container-wrapper')).toHaveClass('card-component red blue');
    expect(screen.getByTestId('card-container-wrapper')).toBeInTheDocument();
  });

  it('should render with accent', () => {
    render(<Card.Container accent="foo">Test Text</Card.Container>);
    expect(screen.getByTestId('card-container-wrapper')).toHaveClass('card-component accent accent-foo');
  });

  it('should render with appended and nested children', () => {
    render(
      <Card.Container accent="foo">
        <Card.Content>Nested</Card.Content>
        <Card.Content append>Appended</Card.Content>
      </Card.Container>
    );

    expect(screen.queryAllByTestId('card-content-wrapper')).toHaveLength(2); // Should have two card contents
    expect(screen.getByTestId('card-content-container-wrapper')).toHaveTextContent('Nested');
    expect(screen.getByTestId('card-container-wrapper')).toContainElement(screen.queryByText(/Appended/i));
  });

  it('should apply data-test-selector', () => {
    render(<Card.Container dts="card-component-container">Test</Card.Container>);
    expect(screen.getByTestId('card-container-wrapper')).toHaveAttribute(
      'data-test-selector',
      'card-component-container'
    );
  });
});

describe('<Card.Content />', () => {
  it('should render and pass through children', () => {
    const children = (
      <div data-testid="card-content-test-children" className="test-class">
        Test Text
      </div>
    );

    render(<Card.Content>{children}</Card.Content>);

    expect(screen.getByTestId('card-content-wrapper')).toHaveClass('card-component-content');
    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('card-content-test-children')).toHaveClass('test-class');
    expect(screen.getByTestId('card-content-test-children')).toHaveTextContent('Test Text');
  });

  it('should render with "stretch" class', () => {
    render(<Card.Content stretch>Test Text</Card.Content>);
    expect(screen.getByTestId('card-content-wrapper')).toHaveClass('card-component-content stretch');
    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should render with "fill" class', () => {
    render(<Card.Content fill>Test Text</Card.Content>);
    expect(screen.getByTestId('card-content-wrapper')).toHaveClass('card-component-content fill');
    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should render with appended content', () => {
    render(<Card.Content append>Test Text</Card.Content>);
    expect(screen.getByTestId('card-content-wrapper')).toHaveClass('card-component-content append');
    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should render with custom classNames', () => {
    render(
      <Card.Content fill className="some classes">
        Test Text
      </Card.Content>
    );
    expect(screen.getByTestId('card-content-wrapper')).toHaveClass('card-component-content fill some classes');
    expect(screen.getByTestId('card-content-wrapper')).toBeInTheDocument();
  });

  it('should apply data-test-selector', () => {
    render(<Card.Content dts="card-component-content">Test</Card.Content>);
    expect(screen.getByTestId('card-content-wrapper')).toHaveAttribute('data-test-selector', 'card-component-content');
  });
});
