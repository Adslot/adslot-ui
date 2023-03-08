import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { useCollapse } from './useCollapse';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(cleanup);

describe('useCollapse()', () => {
  const Component = ({ collapsedHeight, collapsed: collapsedProp, transitionMs, noRef, children }) => {
    const [collapsed, setCollapsed] = React.useState(collapsedProp);

    const { height, transitionState, containerRef } = useCollapse({
      collapsedHeight,
      collapsed,
      transitionMs,
    });

    return (
      <div data-testid="wrapper" className={transitionState} style={{ height }}>
        <span ref={noRef ? null : containerRef}>{children}</span>
        <button onClick={setCollapsed}>{collapsed ? 'expand' : 'collapse'}</button>
      </div>
    );
  };

  let resizeListener;
  let observeMockFn;

  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
      constructor(ls) {
        resizeListener = ls;
        observeMockFn = this.observe;
      }
    };
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        height: 50,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      };
    });
  });

  it('should set height and transition state', () => {
    const { getByTestId, getByRole } = render(
      <Component transitionMs={250}>
        <div style={{ height: 1000 }} />
      </Component>
    );

    act(() => {
      resizeListener([
        {
          contentRect: {
            height: 1000,
          },
        },
      ]);
      jest.runAllTimers();
    });
    expect(getByTestId('wrapper')).toHaveStyle({ height: '1000px' });

    expect(getByRole('button')).toHaveAccessibleName('collapse');
    fireEvent.click(getByRole('button'));
    expect(getByTestId('wrapper')).toHaveClass('is-collapsing');

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('wrapper')).not.toHaveClass('is-collapsing');

    expect(getByRole('button')).toHaveAccessibleName('expand');
    expect(getByTestId('wrapper')).toHaveStyle({ height: 0 });
    expect(observeMockFn).toBeCalledTimes(1);
  });

  it('should do nothing without container ref', () => {
    const { getByTestId, getByRole } = render(
      <Component collapsedHeight={25} noRef>
        <div style={{ height: 1000 }} />
      </Component>
    );

    expect(getByTestId('wrapper')).toHaveStyle({ height: undefined });
    fireEvent.click(getByRole('button'));
    expect(getByTestId('wrapper')).toHaveStyle({ height: undefined });
  });

  it('should collapse to collapsedHeight', () => {
    const { getByTestId, getByRole } = render(
      <Component collapsedHeight={25}>
        <div style={{ height: 1000 }} />
      </Component>
    );

    act(() => {
      resizeListener([
        {
          contentRect: {
            height: 1000,
          },
        },
      ]);
      jest.runAllTimers();
    });

    expect(getByTestId('wrapper')).toHaveStyle({ height: '1000px' });

    expect(getByRole('button')).toHaveAccessibleName('collapse');
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAccessibleName('expand');
    expect(getByTestId('wrapper')).toHaveStyle({ height: '25px' });
  });
});
