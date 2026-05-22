import _ from 'lodash';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ToolbarPopoverContext = createContext(null);

/**
 * Shared state for toolbar popovers. Only one popover (identified by `id`)
 * may be open at a time — opening another auto-closes whichever is open.
 */
export const ToolbarPopoverProvider = ({ children }) => {
  const [openId, setOpenId] = useState(null);

  const open = useCallback((id) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const value = useMemo(() => ({ openId, open, close }), [openId, open, close]);

  return <ToolbarPopoverContext.Provider value={value}>{children}</ToolbarPopoverContext.Provider>;
};

ToolbarPopoverProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * Hook consumed by each toolbar action component. Returns:
 * - `isOpen` — true when this action's popover is the active one
 * - `toggle()` — opens this popover if closed, closes it if already open
 * - `close()` — unconditionally closes whichever popover is open
 *
 * Falls back to local state when no provider is mounted — keeps the action
 * components usable in isolation (specs / standalone stories) without each
 * caller having to wrap in `<ToolbarPopoverProvider>`.
 */
const useExclusivePopover = (id) => {
  const ctx = useContext(ToolbarPopoverContext);
  const [localOpen, setLocalOpen] = useState(false);

  const open = useMemo(() => (ctx ? ctx.open : () => setLocalOpen(true)), [ctx]);
  const close = useMemo(() => (ctx ? ctx.close : () => setLocalOpen(false)), [ctx]);
  const isOpen = ctx ? _.isEqual(ctx.openId, id) : localOpen;

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open(id);
    }
  }, [isOpen, close, open, id]);

  return { isOpen, toggle, close };
};

export default useExclusivePopover;
