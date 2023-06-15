import React from 'react';
import { render, screen, user } from 'testing';
import Tag, { ActionButton } from '.';
import SvgSymbol from '../SvgSymbol';

it('should render a default tag', () => {
  render(<Tag>You are it!</Tag>);
  expect(screen.getByTestId('tag-wrapper')).toHaveClass('tag-component');
  expect(screen.getByTestId('tag-wrapper')).toHaveAttribute('data-test-selector', 'tag-default');
  expect(screen.queryByTestId('tag-action-button')).not.toBeInTheDocument();
});

it('should apply a custom data test selector', () => {
  render(<Tag dts="foo">You are it!</Tag>);
  expect(screen.getByTestId('tag-wrapper')).toHaveAttribute('data-test-selector', 'foo');
});

it('should render an inverse tag', () => {
  render(<Tag inverse>You are it!</Tag>);
  expect(screen.getByTestId('tag-wrapper')).toHaveClass('tag-component tag-component-inverse');
});

it('should render a default tag with highlight', () => {
  render(<Tag accent="foo">You are it!</Tag>);
  expect(screen.getByTestId('tag-wrapper')).toHaveClass('tag-component tag-component-accent accent-foo');
});

it('should render an inverse tag with highlight', () => {
  render(
    <Tag inverse accent="foo">
      You are it!
    </Tag>
  );
  expect(screen.getByTestId('tag-wrapper')).toHaveClass(
    'tag-component tag-component-inverse tag-component-accent accent-foo'
  );
});

it('should render an actionable tag', () => {
  const onTagAction = jest.fn();
  render(
    <Tag onAction={onTagAction} actionIconSvgHref="foo">
      You are it!
    </Tag>
  );
  expect(screen.getByTestId('tag-action-button')).toBeInTheDocument();
  expect(screen.getByTestId('tag-wrapper')).toHaveClass('tag-component tag-component-actionable');
});

it('should render action buttons', async () => {
  const onAction = jest.fn();
  const actionIcon = <SvgSymbol href="foo" />;
  render(<ActionButton onAction={onAction} actionIcon={actionIcon} id="Bar" />);

  expect(screen.getByTestId('tag-action-button')).toHaveClass('action-button');
  await user.click(screen.getByTestId('tag-action-button'));
  expect(onAction).toHaveBeenCalledTimes(1);
  expect(onAction).toHaveBeenCalledWith('Bar');
  expect(screen.getByTestId('svg-symbol-use')).toHaveAttribute('href', 'foo');
});

it('should render children nodes', () => {
  const onTagAction = jest.fn();
  render(
    <Tag onAction={onTagAction} actionIconSvgHref="foo">
      <div data-testid="tag-child" className="child" />
      <div data-testid="tag-child" className="child" />
    </Tag>
  );
  expect(screen.getAllByTestId('tag-child')).toHaveLength(2);
});

it('should render a tag with custom className', () => {
  render(<Tag className="foo">You are it!</Tag>);
  expect(screen.getByTestId('tag-wrapper')).toHaveClass('tag-component foo');
});

it('should render a actionable tag without svg', () => {
  render(<Tag onAction={jest.fn()}>You are it!</Tag>);
  expect(screen.getByTestId('tag-action-button')).toBeInTheDocument();
  expect(screen.getByTestId('tag-action-icon')).toHaveClass('action-icon');
});
