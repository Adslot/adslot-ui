import React from 'react';
import PropTypes from 'prop-types';
import { getFocusableNodes } from '../../utils/focus';
import { useClickOutside } from '../../hooks';

const createFocusLayers = () => {
  const layers = new Set();
  return {
    add: (n) => layers.add(n),
    delete: (n) => layers.delete(n),
    isHighestLayer: (el) => {
      const layersArr = Array.from(layers);
      return layersArr.indexOf(el) === Math.max(layers.size - 1, 0);
    },
  };
};

export const focusLayers = createFocusLayers();

const DismissibleFocusTrap = ({
  loop = true,
  focusOnMount = true,
  disabled,
  onEscape,
  onClickOutside,
  onTabExit,
  onShiftTabExit,
  children,
  ...rest
}) => {
  const contentRef = React.useRef();
  const clickedOutsideRef = React.useRef();
  const clickOutsideHandler = React.useCallback(
    (event) => {
      if (disabled) return;
      if (event.defaultPrevented) return;

      if (onClickOutside) {
        const isHighestLayer = focusLayers.isHighestLayer(contentRef.current);

        if (isHighestLayer) {
          // don't steal focus if closing via clicking outside
          clickedOutsideRef.current = true;

          onClickOutside?.(event);
          event.stopPropagation();
          event.preventDefault();
        }
      }
    },
    [onClickOutside, disabled]
  );

  useClickOutside(contentRef, clickOutsideHandler);

  React.useEffect(() => {
    if (disabled || !focusOnMount) return;
    const contentEl = contentRef.current;
    // handle focus on mount / focus previous focussed el on unmount
    const previousFocusEl = document.activeElement;
    const nodes = getFocusableNodes(contentRef.current, { tabbable: true });
    nodes[0]?.focus({ preventScroll: true });

    return () => {
      if (clickedOutsideRef.current) return;
      if (!focusLayers.isHighestLayer(contentEl)) {
        return;
      }
      // in some cases previousFocusEl isn't visible yet, so always focus it 'async'
      window.requestAnimationFrame(() => {
        previousFocusEl?.focus();
      });
    };
  }, [disabled, focusOnMount]);

  React.useEffect(() => {
    if (disabled) return;
    const node = contentRef.current;
    node && focusLayers.add(node);

    return () => {
      node && focusLayers.delete(node);
    };
  }, [contentRef, disabled]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (disabled) return;
      if (event.key === 'Tab') {
        const currentFocusEl = document.activeElement;
        const nodes = getFocusableNodes(contentRef?.current, { tabbable: true });
        const [first, ...other] = nodes;
        let last = other.slice(-1)[0];

        if (first) {
          if (!last) last = first;
          if (currentFocusEl === last && !event.shiftKey) {
            event.preventDefault();
            if (onTabExit) return onTabExit?.(event, nodes);
            loop && first?.focus();
          }
          if (currentFocusEl === first && event.shiftKey) {
            event.preventDefault();
            if (onTabExit) return onShiftTabExit?.(event, nodes);
            loop && last?.focus();
          }
        }
      }
    },
    [disabled, onTabExit, loop, onShiftTabExit]
  );

  React.useEffect(() => {
    const onEscapeKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (disabled) return;
        if (event.defaultPrevented) return;
        const isHighestLayer = focusLayers.isHighestLayer(contentRef.current);

        if (isHighestLayer) {
          onEscape?.(event);
          event.stopPropagation();
          event.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', onEscapeKeyDown);
    return () => {
      document.removeEventListener('keydown', onEscapeKeyDown);
    };
  }, [disabled, onEscape]);

  return (
    <div data-testid="focus-trap" ref={contentRef} onKeyDown={handleKeyDown} {...rest}>
      {children}
    </div>
  );
};

DismissibleFocusTrap.propTypes = {
  /**
   * loops the tab sequence
   */
  loop: PropTypes.bool,
  /**
   * focus the first focussable element on mount
   */
  focusOnMount: PropTypes.bool,
  /**
   * disable all behaviour
   */
  disabled: PropTypes.bool,
  onEscape: PropTypes.func,
  onClickOutside: PropTypes.func,
  onTabExit: PropTypes.func,
  onShiftTabExit: PropTypes.func,
  children: PropTypes.node,
};

export default DismissibleFocusTrap;
