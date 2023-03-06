import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { useCollapse } from './useCollapse';

afterEach(cleanup);

describe('useCollapse()', () => {
  const Component = ({ collapsedHeight, collapsed: collapsedProp, noRef, children }) => {
    const { collapsed, toggleCollapsed, height, containerRef } = useCollapse({
      collapsedHeight,
      collapsed: collapsedProp,
    });

    return (
      <div data-testid="wrapper" style={{ height }}>
        <span ref={noRef ? null : containerRef}>{children}</span>
        <button onClick={toggleCollapsed}>{collapsed ? 'expand' : 'collapse'}</button>
      </div>
    );
  };

  let resizeListener;

  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
      constructor(ls) {
        resizeListener = ls;
      }
    };
  });

  it('should set height', () => {
    const { getByTestId, getByRole } = render(
      <Component>
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
    });
    expect(getByTestId('wrapper')).toHaveStyle({ height: '1000px' });

    expect(getByRole('button')).toHaveAccessibleName('collapse');
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAccessibleName('expand');
    expect(getByTestId('wrapper')).toHaveStyle({ height: 0 });
  });

  it('should be controllable', () => {
    const { getByTestId, getByRole } = render(
      <Component collapsedHeight={25} collapsed>
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
    });

    expect(getByTestId('wrapper')).toHaveStyle({ height: '25px' });
    expect(getByRole('button')).toHaveAccessibleName('expand');
  });

  it('should do nothing without container ref', () => {
    const { getByTestId, getByRole } = render(
      <Component collapsedHeight={25} noRef>
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
    });

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
    });

    expect(getByTestId('wrapper')).toHaveStyle({ height: '1000px' });

    expect(getByRole('button')).toHaveAccessibleName('collapse');
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAccessibleName('expand');
    expect(getByTestId('wrapper')).toHaveStyle({ height: '25px' });
  });
});
