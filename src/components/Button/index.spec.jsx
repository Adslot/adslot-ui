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

  it('should render inverse button with inverse variant', () => {
    const { getByTestId } = render(<Button variant="inverse">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-inverse btn-default');
  });

  it('should render large button with size="large" prop', () => {
    const { getByTestId } = render(<Button size="large">Test</Button>);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-large btn-default btn-inverse');
  });

  it('should throw if using color on link variant', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() =>
      render(
        <Button variant="link" color="success" size="large">
          Test
        </Button>
      )
    ).toThrow('AdslotUI Button: buttons with the "link" variant do not inherit size and color properties.');
  });

  it('should throw when round with child or no icon', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() => render(<Button round>Test</Button>)).toThrow(
      'AdslotUI Button: round can only be used with an icon and no children.'
    );
  });

  it('should apply round button when icon exists and no child', () => {
    const { getByTestId } = render(<Button color="primary" aria-label="icon" round icon={<div>icon</div>} />);
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-primary btn-round');
  });

  it('should throw when an aria-label is required', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() => render(<Button icon={<div />} />)).toThrow(
      'AdslotUI Button: an aria-label is required on icon buttons.'
    );
  });

  it('should throw for deprecated props', () => {
    console.error = (err) => {
      throw new Error(err);
    };
    expect(() => render(<Button theme="primary">Test</Button>)).toThrow(
      'AdslotUI Button: The theme prop has been deprecated. Please use color instead.'
    );
    expect(() => render(<Button inverse>Test</Button>)).toThrow(
      'AdslotUI Button: The inverse prop has been deprecated. Please use variant="inverse" instead.'
    );
  });

  it('should apply icon', () => {
    const { getByTestId } = render(<Button icon={<div data-testid="icon-content">icon</div>}>Test</Button>);
    expect(getByTestId('icon-content').parentElement).toHaveClass('aui--button-icon-container');
    expect(getByTestId('button-wrapper')).toHaveClass('aui--button btn-default btn-inverse');
  });

  it('should apply loading class to non-round icon container', () => {
    const { getByTestId } = render(
      <Button isLoading aria-label="icon" icon={<div data-testid="icon-content">icon</div>} />
    );
    expect(getByTestId('icon-content').parentElement).toHaveClass('aui--button-icon-container is-loading');
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
});
