import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './';

afterEach(cleanup);

describe('<Button />', () => {
  it('should render Button', () => {
    const { queryAllByTestId } = render(<Button>Test</Button>);
    expect(queryAllByTestId('button-wrapper')).toHaveLength(1);
  });

  it('should support legacy Bootstrap Button props for non-breaking change', () => {
    const { getByTestId } = render(
      <Button bsStyle="link" href="example.com">
        Test
      </Button>
    );

    expect(getByTestId('button-wrapper')).toHaveClass('btn-link');
    expect(getByTestId('button-anchor')).toHaveAttribute('href', 'example.com');
  });

  it('should support legacy classname btn-inverse for non-breaking change', () => {
    const { getByTestId } = render(<Button className="btn-inverse">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-inverse btn-default');
  });

  it('should support className prop', () => {
    const { getByTestId } = render(<Button className="all the-classes">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button all the-classes');
  });

  it('should support valid html attributes', () => {
    const { getByTestId } = render(<Button id="button-id">Test</Button>);

    expect(getByTestId('button-wrapper')).toHaveAttribute('id', 'button-id');
  });

  it('should not duplicate btn-inverse class if both legacy and new are used', () => {
    const { getByTestId } = render(
      <Button inverse className="btn-inverse">
        Test
      </Button>
    );
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-inverse btn-default');
  });

  it('should render inverse button with btn-inverse class', () => {
    const { getByTestId } = render(<Button inverse>Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-inverse btn-default');
  });

  it('should render large button with btn-large class', () => {
    const { getByTestId } = render(<Button size="large">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-large btn-default');
  });

  it('should support data-test-selectors', () => {
    const { getByTestId } = render(<Button dts="test-button">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveAttribute('data-test-selector', 'test-button');
  });

  it('should render disabled button', () => {
    const { getByTestId } = render(<Button disabled>Test</Button>);
    expect(getByTestId('button-wrapper')).toBeDisabled();
  });

  it('should render Spinner if isLoading is true', () => {
    const { queryAllByTestId } = render(<Button isLoading />);
    expect(queryAllByTestId('button-spinner-wrapper')).toHaveLength(1);
  });

  it('should only allow bsSize medium or small on Spinner', () => {
    const { getByTestId } = render(<Button isLoading bsSize="lg" />);
    expect(getByTestId('spinner')).toHaveClass('spinner-medium');
  });
});
