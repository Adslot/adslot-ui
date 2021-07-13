import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Tag, { ActionButton } from '.';
import SvgSymbol from '../SvgSymbol';

afterEach(cleanup);

describe('<Tag />', () => {
  it('should render a default tag', () => {
    const { getByTestId, queryByTestId } = render(<Tag>You are it!</Tag>);
    expect(getByTestId('tag-wrapper')).toHaveClass('tag-component');
    expect(getByTestId('tag-wrapper')).toHaveAttribute('data-test-selector', 'tag-default');
    expect(queryByTestId('tag-action-button')).not.toBeInTheDocument();
  });

  it('should apply a custom data test selector', () => {
    const { getByTestId } = render(<Tag dts="foo">You are it!</Tag>);
    expect(getByTestId('tag-wrapper')).toHaveAttribute('data-test-selector', 'foo');
  });

  it('should render an inverse tag', () => {
    const { getByTestId } = render(<Tag inverse>You are it!</Tag>);
    expect(getByTestId('tag-wrapper')).toHaveClass('tag-component tag-component-inverse');
  });

  it('should render a default tag with highlight', () => {
    const { getByTestId } = render(<Tag accent="foo">You are it!</Tag>);
    expect(getByTestId('tag-wrapper')).toHaveClass('tag-component tag-component-accent accent-foo');
  });

  it('should render an inverse tag with highlight', () => {
    const { getByTestId } = render(
      <Tag inverse accent="foo">
        You are it!
      </Tag>
    );
    expect(getByTestId('tag-wrapper')).toHaveClass(
      'tag-component tag-component-inverse tag-component-accent accent-foo'
    );
  });

  it('should render an actionable tag', () => {
    const onTagAction = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Tag onAction={onTagAction} actionIconSvgHref="foo">
        You are it!
      </Tag>
    );
    expect(queryByTestId('tag-action-button')).toBeInTheDocument();
    expect(getByTestId('tag-wrapper')).toHaveClass('tag-component tag-component-actionable');
  });

  it('should render action buttons', () => {
    const onAction = jest.fn();
    const actionIcon = <SvgSymbol href="foo" />;
    const { getByTestId } = render(<ActionButton onAction={onAction} actionIcon={actionIcon} id="Bar" />);

    expect(getByTestId('tag-action-button')).toHaveClass('action-button');
    fireEvent.click(getByTestId('tag-action-button'));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith('Bar');
    expect(getByTestId('svg-symbol-use')).toHaveAttribute('href', 'foo');
  });

  it('should render children nodes', () => {
    const onTagAction = jest.fn();
    const { queryAllByTestId } = render(
      <Tag onAction={onTagAction} actionIconSvgHref="foo">
        <div data-testid="tag-child" className="child" />
        <div data-testid="tag-child" className="child" />
      </Tag>
    );
    expect(queryAllByTestId('tag-child')).toHaveLength(2);
  });

  it('should render a tag with base class', () => {
    const { getByTestId } = render(<Tag baseClass="foo">You are it!</Tag>);
    expect(getByTestId('tag-wrapper')).toHaveClass('tag-component foo');
  });

  it('should render a actionable tag without svg', () => {
    const { getByTestId, queryByTestId } = render(<Tag onAction={jest.fn()}>You are it!</Tag>);
    expect(queryByTestId('tag-action-button')).toBeInTheDocument();
    expect(getByTestId('tag-action-icon')).toHaveClass('action-icon');
  });
});
