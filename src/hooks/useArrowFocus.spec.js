import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useArrowFocus from './useArrowFocus';

afterEach(cleanup);

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

  it('should focus items with arrow keys, loop, and trigger onFocus', () => {
    const { getByText } = render(
      <Component {...props}>
        <li tabIndex={0}>1</li>
        <li tabIndex={0}>2</li>
      </Component>
    );

    userEvent.tab();

    expect(getByText('1')).toHaveFocus();

    expect(props.onFocus).toHaveBeenCalledTimes(0);
    userEvent.keyboard('[ArrowDown]');
    expect(getByText('2')).toHaveFocus();
    expect(props.onFocus).toHaveBeenCalledTimes(1);

    userEvent.keyboard('[ArrowUp][ArrowUp][ArrowUp]');
    expect(props.onFocus).toHaveBeenCalledTimes(4);
    expect(getByText('1')).toHaveFocus();
    userEvent.keyboard('[ArrowDown][ArrowDown][ArrowDown]');
    expect(props.onFocus).toHaveBeenCalledTimes(7);
    expect(getByText('2')).toHaveFocus();
  });

  it('should handle no valid children, and ignore other elements', () => {
    const refMock = { current: null };
    const { getByText } = render(
      <Component refMock={refMock} {...props}>
        <div tabIndex={0}>test</div>
      </Component>
    );
    expect(getByText('test')).toBeInTheDocument();
    userEvent.tab();
    userEvent.keyboard('[ArrowDown]');
    expect(props.onFocus).toHaveBeenCalledTimes(0);
  });

  it('should handle no children', () => {
    const refMock = { current: { contains: () => true, querySelectorAll: () => null } };
    const { getByText } = render(
      <Component refMock={refMock} {...props}>
        <li tabIndex={0}>test</li>
      </Component>
    );
    expect(getByText('test')).toBeInTheDocument();
    userEvent.tab();
    expect(getByText('test')).toHaveFocus();

    userEvent.keyboard('[ArrowDown][ArrowDown]');
    expect(props.onFocus).toHaveBeenCalledTimes(0);
  });

  it('should handle disabled edge case', () => {
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

    const { getByText } = render(<Test />);
    getByText('test-container').innerHTML = `<div>
        <button disabled tabIndex="0">test</button>
        <button disabled>test 2</button>
    </div>`;

    expect(getByText('test 2')).toBeInTheDocument();
    getByText('test').focus();
    expect(getByText('test')).toHaveFocus();

    userEvent.keyboard('[ArrowDown][ArrowDown][ArrowUp][ArrowUp]');
    expect(focusMock).toHaveBeenCalledTimes(0);
  });

  it('should focus with focusEl function', () => {
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

    const { getByText, getAllByRole } = render(<TestComponent />);

    getByText('test-container').innerHTML = `
    <button>test</button>
    <button disabled>
      test 2
    </button>`;
    expect(getByText('test 2')).toBeInTheDocument();
    expect(getByText('test 2')).toBeDisabled();

    fireEvent.click(getAllByRole('button')[0]);

    expect(getByText('test')).toHaveFocus();
    fireEvent.click(getAllByRole('button')[1]);

    fireEvent.click(getAllByRole('button')[2]);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
