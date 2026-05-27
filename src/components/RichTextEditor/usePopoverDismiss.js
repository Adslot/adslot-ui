import _ from 'lodash';
import { useEffect } from 'react';

/**
 * Wires the standard outside-mousedown + Escape-key dismiss behaviour for a
 * toolbar popover. A mousedown inside either the popover container or the
 * anchor element is treated as "inside" and ignored; everything else closes.
 *
 * @param {object}      params
 * @param {boolean}     params.active        Listeners are only registered while true.
 * @param {React.RefObject} params.containerRef Ref to the popover content element.
 * @param {HTMLElement|null} params.anchorEl  The trigger button (any click on it is "inside").
 * @param {() => void}  params.onClose       Invoked when a dismiss is required.
 */
const usePopoverDismiss = ({ active, containerRef, anchorEl, onClose }) => {
  useEffect(() => {
    if (!active) return undefined;
    const onDocMouseDown = (event) => {
      if (containerRef.current && containerRef.current.contains(event.target)) return;
      if (anchorEl && anchorEl.contains(event.target)) return;
      onClose();
    };
    const onKeyDown = (event) => {
      if (_.isEqual(event.key, 'Escape')) onClose();
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active, anchorEl, containerRef, onClose]);
};

export default usePopoverDismiss;
