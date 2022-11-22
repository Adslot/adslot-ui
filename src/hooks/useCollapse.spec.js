import React from 'react';
import { screen, render, fireEvent, act } from 'testing';
import { useCollapse } from './useCollapse';

beforeEach(() => {
  jest.useFakeTimers();
});

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
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      height: 50,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });
  });

  it('should set height and transition state', async () => {
    render(
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
    expect(screen.getByTestId('wrapper')).toHaveStyle({ height: '1000px' });

    expect(screen.getByRole('button')).toHaveAccessibleName('collapse');
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('wrapper')).toHaveClass('is-collapsing');

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('wrapper')).not.toHaveClass('is-collapsing');

    expect(screen.getByRole('button')).toHaveAccessibleName('expand');
    expect(screen.getByTestId('wrapper')).toHaveStyle({ height: 0 });
    expect(observeMockFn).toHaveBeenCalledTimes(1);
  });

  it('should do nothing without container ref', () => {
    render(
      <Component collapsedHeight={25} noRef>
        <div style={{ height: 1000 }} />
      </Component>
    );

    expect(screen.getByTestId('wrapper')).toHaveStyle({ height: undefined });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('wrapper')).toHaveStyle({ height: undefined });
  });

  it('should collapse to collapsedHeight', () => {
    render(
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

    expect(screen.getByTestId('wrapper')).toHaveStyle({ height: '1000px' });

    expect(screen.getByRole('button')).toHaveAccessibleName('collapse');
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAccessibleName('expand');
    expect(screen.getByTestId('wrapper')).toHaveStyle({ height: '25px' });
  });
});
