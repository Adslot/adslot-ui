import _ from 'lodash';
import React from 'react';

/**
 * @param {Object} useCollapse
 * @param {number} useCollapse.collapsedHeight height to collapse to (default 0)
 * @param {number} useCollapse.collapsed optionally control collapsed state
 */
export const useCollapse = ({ collapsedHeight = 0, collapsed: collapsedProp = false }) => {
  const containerRef = React.useRef();
  const elHeightRef = React.useRef();
  const collapsedHeightRef = React.useRef();

  const [height, _setHeight] = React.useState();
  const [collapsed, setCollapsed] = React.useState(collapsedProp);

  const setHeight = React.useCallback(
    (elHeight) => {
      if (!containerRef.current) return;
      collapsedHeightRef.current = _.isNumber(collapsedHeight) ? Math.min(collapsedHeight, elHeight) : elHeight;
      if (!collapsed) {
        _setHeight(elHeight);
      } else {
        _setHeight(collapsedHeightRef.current);
      }
    },
    [collapsedHeight, collapsed]
  );

  React.useLayoutEffect(() => {
    setCollapsed(collapsedProp);
  }, [collapsedProp]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // borderBoxSize is not an array in old versions of Firefox
        elHeightRef.current = _.castArray(entry.borderBoxSize)[0]?.blockSize ?? entry.contentRect.height;

        setHeight(elHeightRef.current);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [setHeight]);

  const collapsedHeightExceeded = _.isNil(collapsedHeight) || collapsedHeightRef.current === collapsedHeight;

  React.useLayoutEffect(() => {
    if (!containerRef.current || !elHeightRef.current) return;
    setHeight(elHeightRef.current);
  }, [setHeight]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return { collapsed, toggleCollapsed, height, collapsedHeightExceeded, containerRef };
};
