import React from 'react';
import { render, screen, within } from 'testing';
import Button from './';
import invariant from '../../invariant';

jest.mock('../../invariant');

it('should render Button', () => {
  render(<Button>Test</Button>);
  expect(screen.getByTestId('button-wrapper')).toBeInTheDocument();
});

it('should support className prop', () => {
  render(<Button className="all the-classes">Test</Button>);
  expect(screen.getByTestId('button-wrapper')).toHaveClass('aui--button all the-classes');
});

it('should support valid html attributes', () => {
  render(<Button id="button-id">Test</Button>);

  expect(screen.getByTestId('button-wrapper')).toHaveAttribute('id', 'button-id');
});

it('should render inverse button with inverse variant', () => {
  render(<Button variant="inverse">Test</Button>);
  expect(screen.getByTestId('button-wrapper')).toHaveClass('aui--button aui-inverse aui-default');
});

it('should render large button with size="large" prop', () => {
  render(<Button size="large">Test</Button>);
  expect(screen.getByTestId('button-wrapper')).toHaveClass('aui--button aui-large aui-default aui-inverse');
});

it('should throw if using color on link variant', () => {
  render(
    <Button variant="link" color="success" size="large">
      Test
    </Button>
  );
  expect(invariant).toHaveBeenCalledWith(
    false,
    'Button: buttons with the "link" variant do not inherit size and color properties.'
  );
});

it('should throw when round with child or no icon', () => {
  render(<Button round>Test</Button>);
  expect(invariant).toHaveBeenCalledWith(false, 'Button: round can only be used with an icon and no children.');
});

it('should apply round button when icon exists and no child', () => {
  render(<Button color="primary" aria-label="icon" round icon={<div>icon</div>} />);
  expect(screen.getByTestId('button-wrapper')).toHaveClass('aui--button aui-primary aui-round');
});

it('should throw when an aria-label is required', () => {
  render(<Button icon={<div />} />);
  expect(invariant).toHaveBeenCalledWith(
    false,
    'Button: an aria-label or aria-labelledby is required on icon buttons.'
  );
});

it('should throw for deprecated primary props', () => {
  render(<Button theme="primary">Test</Button>);
  expect(invariant).toHaveBeenCalledWith(
    false,
    'Button: The theme prop has been deprecated. Please use color instead.'
  );
});

it('should throw for deprecated inverse props', () => {
  render(<Button inverse>Test</Button>);
  expect(invariant).toHaveBeenCalledWith(
    false,
    'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.'
  );
});

it('should apply icon', () => {
  render(<Button icon={<div data-testid="icon-content">icon</div>}>Test</Button>);
  expect(within(screen.getByClass('aui-icon-container')).getByTestId('icon-content')).toBeInTheDocument();
  expect(screen.getByTestId('button-wrapper')).toHaveClass('aui--button aui-default aui-inverse');
});

it('should apply loading class to non-round icon container', () => {
  render(<Button isLoading aria-label="icon" icon={<div data-testid="icon-content">icon</div>} />);
  expect(screen.getByTestId('icon-content').parentElement).toHaveClass('aui-icon-container is-loading');
});

it('should support data-test-selectors', () => {
  render(<Button dts="test-button">Test</Button>);
  expect(screen.getByTestId('button-wrapper')).toHaveAttribute('data-test-selector', 'test-button');
});

it('should render disabled button', () => {
  render(<Button disabled>Test</Button>);
  expect(screen.getByTestId('button-wrapper')).toBeDisabled();
});

it('should render Spinner if isLoading is true', () => {
  render(<Button isLoading />);
  expect(screen.getByTestId('button-spinner-wrapper')).toBeInTheDocument();
});

it('should only allow size medium or small on Spinner', () => {
  render(<Button isLoading size="large" />);
  expect(screen.getByTestId('spinner')).toHaveClass('spinner-medium');
});
