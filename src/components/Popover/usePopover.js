import _ from 'lodash';
import React from 'react';

const usePopover = ({
  triggers,
  triggerRef: triggerRefProp,
  isMenu,
  isOpen: isOpenProp,
  onClickOutside: onClickOutsideProp,
  onOpenChange,
  contentHoverable,
  delayHide,
  delayShow,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(isOpenProp);
  const openStateRef = React.useRef(isPopoverOpen);
  const triggerRefInternal = React.useRef();
  const triggerRef = triggerRefProp ?? triggerRefInternal;
  const isControlled = !_.isUndefined(isOpenProp);
  const isDisabled = triggers.includes('disabled');

  const [popperNode, setPopperNode] = React.useState(null);
  const triggerSourceRef = React.useRef(null);
  const delayRef = React.useRef();
  const pointerMoveOpenedRef = React.useRef();

  // handle setting open state and calling onOpenChange
  const setIsOpen = React.useCallback(
    (value, ...args) => {
      const onChangeCaller = (val, ...onChangeArgs) => {
        if (onOpenChange) {
          if (!_.isEqual(openStateRef.current, val)) {
            onOpenChange(val, ...onChangeArgs);
          }
        }
        openStateRef.current = value;
      };

      setIsPopoverOpen(value);

      onChangeCaller(value, ...args);
    },
    [onOpenChange]
  );

  const closePopover = React.useCallback(
    (event, immediate) => {
      clearTimeout(delayRef.current);
      const delay = immediate ? null : delayHide;
      pointerMoveOpenedRef.current = false;
      const { type } = event;

      if (delay) {
        delayRef.current = setTimeout(() => {
          setIsOpen(false, event, type);
        }, delay);
      } else {
        setIsOpen(false, event, type);
      }
    },
    [delayHide, setIsOpen]
  );

  const openPopover = React.useCallback(
    (event, immediate) => {
      const delay = immediate ? null : delayShow;
      if (pointerMoveOpenedRef.current) return;
      clearTimeout(delayRef.current);

      const { type } = event;
      pointerMoveOpenedRef.current = true;

      if (delay) {
        delayRef.current = setTimeout(() => {
          triggerSourceRef.current = type;
          setIsOpen(true, event, type);
        }, delay);
      } else {
        triggerSourceRef.current = type;
        setIsOpen(true, event, type);
      }
    },
    [delayShow, setIsOpen]
  );

  React.useEffect(() => {
    return () => {
      clearTimeout(delayRef.current);
    };
  }, []);

  // keep state synced with isOpen prop
  React.useEffect(() => {
    if (isControlled && openStateRef.current !== isOpenProp) {
      // openStateRef.current = isOpenProp;
      isOpenProp ? openPopover({}) : closePopover({});
    }
  }, [isControlled, openPopover, closePopover, isOpenProp]);

  const onClickOutside = React.useCallback(
    (event) => {
      onClickOutsideProp?.(event);
      if (event.defaultPrevented) return;
      closePopover(event);
    },
    [closePopover, onClickOutsideProp]
  );

  const togglePopover = React.useCallback(
    (event) => {
      if (!isPopoverOpen) {
        openPopover(event);
      } else {
        closePopover(event);
      }
    },
    [closePopover, isPopoverOpen, openPopover]
  );

  // handle keeping popover open when hovering content
  // and closing when leaving content
  React.useEffect(() => {
    if (!contentHoverable || !_.includes(triggers, 'hover')) return;
    const onNodeEnter = (event) => {
      if (!pointerMoveOpenedRef.current) {
        openPopover(event, true);
      }
    };

    const onNodeLeave = (event) => {
      if (pointerMoveOpenedRef.current) {
        closePopover(event);
        pointerMoveOpenedRef.current = false;
      }
    };

    if (popperNode) {
      popperNode.addEventListener('pointerenter', onNodeEnter);
      popperNode.addEventListener('pointerleave', onNodeLeave);
    }

    return () => {
      if (popperNode) {
        popperNode.removeEventListener('pointerenter', onNodeEnter);
        popperNode.removeEventListener('pointerleave', onNodeLeave);
      }
    };
  }, [closePopover, openPopover, contentHoverable, popperNode, triggers]);

  // add trigger listeners
  React.useEffect(() => {
    if (isDisabled) return;
    const isHoverMenu = triggers.includes('hover') && isMenu;
    const trigger = triggerRef?.current;

    // some additional rules are enforced here:
    // - hover menus should be clickable for keyboard usage
    // - menus should not open on focus, as they will re-focus the trigger on unmount,
    //   causing an infinite loop
    if (trigger) {
      if (triggers.includes('click') || isHoverMenu) {
        trigger.addEventListener('click', togglePopover);
      }

      if (triggers.includes('focus') && !isMenu) {
        trigger.addEventListener('focusin', openPopover);
        trigger.addEventListener('focusout', closePopover);
      }

      if (triggers.includes('hover')) {
        trigger.addEventListener('pointerover', openPopover);
        trigger.addEventListener('pointerleave', closePopover);
      }
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('click', togglePopover);
        trigger.removeEventListener('focusin', openPopover);
        trigger.removeEventListener('focusout', closePopover);
        trigger.removeEventListener('pointerover', openPopover);
        trigger.removeEventListener('pointerleave', closePopover);
      }
    };
  }, [triggers, isDisabled, triggerRef, togglePopover, openPopover, closePopover, isMenu]);

  return {
    popperNode,
    onClickOutside,
    triggerRef,
    withRefProps: {
      isOpen: isPopoverOpen,
      popperRef: setPopperNode,
      hasHoverRegion: contentHoverable,
    },
    closePopover,
    triggerSource: triggerSourceRef.current,
  };
};

export default usePopover;
