import _ from 'lodash';
import React from 'react';

/**
 * @param {Object} useCollapse
 * @param {number} useCollapse.collapsedHeight height to collapse to if the collapsed content's height is greater (default 0)
 * @param {number} useCollapse.collapsed optionally control collapsed state
 * @param {number} useCollapse.transitionMs transition time in ms, for transitionState
 */
export const useCollapse = ({ collapsedHeight = 0, collapsed = false, transitionMs }) => {
  const containerRef = React.useRef();
  const animationFrameRef = React.useRef();
  const transitionTimerRef = React.useRef();

  const [_height, _setHeight] = React.useState();
  const [animationState, setAnimationState] = React.useState();

  const collapseTo = _height && (_.isNumber(collapsedHeight) ? Math.min(collapsedHeight, _height) : _height);

  const height = collapsed ? collapseTo : _height;

  const collapsedHeightExceeded = _.isNil(collapsedHeight) || collapseTo === collapsedHeight;

  const transitionType = collapsed ? 'is-collapsing' : 'is-expanding';
  const collapsedRef = React.useRef(collapsed);
  const transitionState = animationState ? transitionType : '';

  React.useLayoutEffect(() => {
    if (collapsed !== collapsedRef.current) {
      const node = containerRef.current;
      if (node) {
        _setHeight(node.getBoundingClientRect().height);
      }
      if (transitionMs) {
        setAnimationState(1);
        transitionTimerRef.current = setTimeout(() => {
          setAnimationState(0);
        }, transitionMs);
      }
    }
    collapsedRef.current = collapsed;
  }, [collapsed, transitionMs]);

  React.useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // set the height on mount, as resize observer's animation frame hasn't fired yet
  React.useLayoutEffect(() => {
    const node = containerRef.current;
    if (node) {
      _setHeight(node.getBoundingClientRect().height);
    }
  }, [collapsedHeight]);

  const resizeObserverRef = React.useRef();

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (!resizeObserverRef.current) {
      // the resize observer's job is to keep the height in sync when the
      // size of the container changes
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // see https://github.com/WICG/resize-observer/issues/38
        animationFrameRef.current = window.requestAnimationFrame(() => {
          for (const entry of entries) {
            // borderBoxSize is not an array in old versions of Firefox
            _setHeight(_.castArray(entry.borderBoxSize)[0]?.blockSize ?? entry.contentRect.height);
          }
        });
      });
    }

    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      animationFrameRef.current && window.cancelAnimationFrame(animationFrameRef.current);
      resizeObserverRef.current && resizeObserverRef.current.disconnect();
    };
  }, []);

  return {
    height,
    collapsedHeightExceeded,
    containerRef,
    transitionState,
  };
};
