import React from 'react';
import { render, screen, user } from 'testing';
import useArrowFocus from './useArrowFocus';

describe('useArrowFocus()', () => {
  let props;
  const Component = ({ onFocus, refMock, selector = 'li', children }) => {
    const ref = React.useRef();
    useArrowFocus({
      ref: refMock ? refMock : ref,
      onFocus,
      selector,
    });
    return <ul ref={ref}>{children}</ul>;
  };

  beforeEach(() => {
    props = {
      onFocus: jest.fn(),
    };
  });

  it('should focus items with arrow keys, loop, and trigger onFocus', async () => {
    render(
      <Component {...props}>
        <li tabIndex={0}>1</li>
        <li tabIndex={0}>2</li>
      </Component>
    );

    await user.tab();

    expect(screen.getByText('1')).toHaveFocus();

    expect(props.onFocus).toHaveBeenCalledTimes(0);
    await user.keyboard('[ArrowDown]');
    expect(screen.getByText('2')).toHaveFocus();
    expect(props.onFocus).toHaveBeenCalledTimes(1);

    await user.keyboard('[ArrowUp][ArrowUp][ArrowUp]');
    expect(props.onFocus).toHaveBeenCalledTimes(4);
    expect(screen.getByText('1')).toHaveFocus();
    await user.keyboard('[ArrowDown][ArrowDown][ArrowDown]');
    expect(props.onFocus).toHaveBeenCalledTimes(7);
    expect(screen.getByText('2')).toHaveFocus();
  });

  it('should handle no valid children, and ignore other elements', async () => {
    const refMock = { current: null };
    render(
      <Component refMock={refMock} {...props}>
        <div tabIndex={0}>test</div>
      </Component>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    await user.tab();
    await user.keyboard('[ArrowDown]');
    expect(props.onFocus).toHaveBeenCalledTimes(0);
  });

  it('should handle no children', async () => {
    const refMock = { current: { contains: () => true, querySelectorAll: () => null } };
    render(
      <Component refMock={refMock} {...props}>
        <li tabIndex={0}>test</li>
      </Component>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    await user.tab();
    expect(screen.getByText('test')).toHaveFocus();

    await user.keyboard('[ArrowDown][ArrowDown]');
    expect(props.onFocus).toHaveBeenCalledTimes(0);
  });

  it('should handle disabled edge case', async () => {
    const focusMock = jest.fn();
    const refMock = {
      current: {
        contains: () => true,
        querySelectorAll: () => [document.querySelectorAll('button')[0], document.querySelectorAll('button')[1]],
      },
    };
    const Test = () => (
      <Component refMock={refMock} selector="button" {...props}>
        <div>test-container</div>
      </Component>
    );

    render(<Test />);
    screen.getByText('test-container').innerHTML = `<div>
        <button disabled tabIndex="0">test</button>
        <button disabled>test 2</button>
    </div>`;

    expect(screen.getByText('test 2')).toBeInTheDocument();
    screen.getByText('test').focus();
    expect(screen.getByText('test')).toHaveFocus();

    await user.keyboard('[ArrowDown][ArrowDown][ArrowUp][ArrowUp]');
    expect(focusMock).toHaveBeenCalledTimes(0);
  });

  it('should focus with focusEl function', async () => {
    const onFocus = jest.fn();
    const TestComponent = () => {
      const ref = React.useRef();
      const { focusEl } = useArrowFocus({
        ref: ref,
        selector: '.test-container button',
        onFocus,
      });
      return (
        <ul ref={ref}>
          <button onClick={() => focusEl()} />
          <button onClick={() => focusEl(1)} />
          <button onClick={() => focusEl(4)} />
          <div className="test-container">test-container</div>
        </ul>
      );
    };

    render(<TestComponent />);

    screen.getByText('test-container').innerHTML = `
    <button>test</button>
    <button disabled>
      test 2
    </button>`;
    expect(screen.getByText('test 2')).toBeInTheDocument();
    expect(screen.getByText('test 2')).toBeDisabled();

    await user.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText('test')).toHaveFocus();
    await user.click(screen.getAllByRole('button')[1]);

    await user.click(screen.getAllByRole('button')[2]);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
