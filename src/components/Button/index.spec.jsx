import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './';

afterEach(cleanup);

describe('<Button />', () => {
  it('should render Button', () => {
    const { queryByTestId } = render(<Button>Test</Button>);
    expect(queryByTestId('button-wrapper')).toBeInTheDocument();
  });

  it('should support className prop', () => {
    const { getByTestId } = render(<Button className="all the-classes">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button all the-classes');
  });

  it('should support valid html attributes', () => {
    const { getByTestId } = render(<Button id="button-id">Test</Button>);

    expect(getByTestId('button-wrapper')).toHaveAttribute('id', 'button-id');
  });

  it('should not render inverse button with btn-inverse class (have to use inverse props instead)', () => {
    const { getByTestId } = render(<Button className="btn-inverse">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-default');
  });

  it('should render inverse button with inverse props', () => {
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
    const { queryByTestId } = render(<Button isLoading />);
    expect(queryByTestId('button-spinner-wrapper')).toBeInTheDocument();
  });

  it('should only allow size medium or small on Spinner', () => {
    const { getByTestId } = render(<Button isLoading size="large" />);
    expect(getByTestId('spinner')).toHaveClass('spinner-medium');
  });

  it('should render button with href', () => {
    const { getByText } = render(
      <Button href="www.some-url.com" target="_blank">
        Test
      </Button>
    );
    expect(getByText('Test')).toHaveAttribute('href', 'www.some-url.com');
  });

  it('should render disabled href button', () => {
    const { getByTestId, getByText } = render(
      <Button disabled href="www.some-url.com" target="_blank">
        Test
      </Button>
    );
    expect(getByTestId('button-wrapper')).toBeDisabled();
    expect(getByText('Test')).not.toHaveAttribute('href');
  });
});
