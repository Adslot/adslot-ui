import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useArrowFocus from '../../hooks/useArrowFocus';
import Popover from '../Popover';
import { popoverPlacements } from '../Popover/constants';
import Panel from '../Panel';
import Button, { colors, variants, sizes, positions } from '../Button';
import Checkbox, { checkboxPropTypes, shareCheckboxPropTypes } from '../Checkbox';
import Radio, { radioPropTypes } from '../Radio';
import RadioGroup, { radioGroupPropTypes } from '../RadioGroup';
import CheckboxGroup, { checkboxGroupPropTypes, checkboxGroupAllPropTypes } from '../CheckboxGroup';
import { useCheckboxGroup } from '../CheckboxGroup/CheckboxGroupContext';
import { expandDts, invariant } from '../../utils';
import { getFocusableNodes } from '../../utils/focus';
import './styles.css';

const forbiddenChildren = [Checkbox.name, CheckboxGroup.name, Radio.name, RadioGroup.name];

const forbiddenChildrenInvariant = (children) =>
  invariant(
    !React.Children.toArray(children).some((child) => {
      if (!React.isValidElement(child) || !child.type) return false;
      return forbiddenChildren.includes(child.type.name);
    }),
    'DropdownMenu: all Radio and Checkbox components should come from DropdownMenu, e.g <DropdownMenu.CheckboxGroup />'
  );

const noRefInvariant = (triggerRef) =>
  invariant(triggerRef, 'DropdownMenu: Did you forget to wrap your menu with <DropdownMenu /> ?');

const DropdownMenuContext = React.createContext({});

const DropdownMenuProvider = ({
  children,
  triggerRef,
  contentRef,
  triggerId,
  contentId,
  open,
  closeParentMenu,
  closeSubMenu,
  onOpenChange,
  closeOnItemClick,
}) => {
  const closeMenu = React.useCallback(() => {
    onOpenChange({}, false);
    triggerRef.current?.focus();
  }, [onOpenChange, triggerRef]);

  const { closeParentMenu: isSubMenu, _menus = [] } = useDropdownMenu();

  const state = React.useMemo(
    () => ({
      open,
      triggerRef,
      contentRef,
      onOpenChange,
      isSubMenu,
      closeSubMenu,
      closeOnItemClick,
      triggerId,
      contentId,
      closeMenu,
      closeParentMenu: closeParentMenu ?? closeMenu,
      _menus: [..._menus, { closeMenu }],
    }),
    [
      open,
      triggerRef,
      contentRef,
      onOpenChange,
      isSubMenu,
      closeSubMenu,
      closeOnItemClick,
      triggerId,
      contentId,
      closeMenu,
      closeParentMenu,
      _menus,
    ]
  );
  return <DropdownMenuContext.Provider value={state}>{children}</DropdownMenuContext.Provider>;
};

/**
 * @typedef {object} options options object
 * @property {boolean} options.open open state
 * @property {function} options.closeMenu close this menu
 * @property {object} options.triggerRef
 * @property {function} options.onOpenChange calls `onOpen` or `onClose` and sets the internal open state of the menu
 * @property {boolean} options.closeOnItemClick
 * @property {string} options.triggerId
 * @property {string} options.contentId
 * @property {function} options.closeParentMenu close the first menu
 * @property {array} options._menus array of `{ closeMenu }` for each menu
 * @returns {options}
 **/
const useDropdownMenu = () => React.useContext(DropdownMenuContext);

const DropdownMenu = ({
  onOpen,
  onClose,
  closeOnItemClick,
  triggerRef: triggerRefProp,
  submenu,
  triggerId,
  contentId,
  defaultOpen,
  children,
}) => {
  const triggerRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const { closeParentMenu, closeOnItemClick: closeOnItemClickCtx } = useDropdownMenu();
  const isSubMenu = submenu && !!closeParentMenu;

  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const onOpenChange = React.useCallback(
    (event, nextOpenState) => {
      nextOpenState ? onOpen?.(event, nextOpenState) : onClose?.(event, nextOpenState);
      setOpen(nextOpenState);
    },
    [setOpen, onOpen, onClose]
  );

  const propsToInherit = {
    // inherit parent context if present
    // otherwise default to true
    ...(closeOnItemClick == null
      ? { closeOnItemClick: typeof closeOnItemClickCtx !== 'undefined' ? closeOnItemClickCtx : true }
      : {}),
  };

  return (
    <DropdownMenuProvider
      closeParentMenu={closeParentMenu}
      contentRef={contentRef}
      triggerRef={triggerRefProp ?? triggerRef}
      open={open}
      onOpenChange={onOpenChange}
      triggerId={triggerId}
      contentId={contentId}
      closeOnItemClick={closeOnItemClick}
      isSubMenu={isSubMenu}
      {...propsToInherit}
    >
      {typeof children === 'function' ? (
        <DropdownMenuContext.Consumer>{(value) => children(value)}</DropdownMenuContext.Consumer>
      ) : (
        children
      )}
    </DropdownMenuProvider>
  );
};

const DropdownMenuTrigger = ({ disabled = false, className, children, icon, ...rest }) => {
  const { triggerRef, triggerId, contentId, isSubMenu, open, onOpenChange } = useDropdownMenu();

  const subMenuTriggerProps = {
    variant: 'borderless',
    fullWidth: true,
    role: 'menuitem',
    iconPosition: 'right',
    icon: icon ?? (
      <svg
        style={{ width: 10, height: 10, transform: 'rotate(-90deg)' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
      >
        <path
          fill="currentColor"
          d="M5 7.4a.73.73 0 0 1-.52-.22L1.16 3.86a.73.73 0 0 1 0-1 .72.72 0 0 1 1 0L5 5.62l2.8-2.8a.74.74 0 1 1 1 1L5.52 7.18A.74.74 0 0 1 5 7.4z"
        />
      </svg>
    ),
  };

  return (
    <Button
      id={triggerId}
      ref={triggerRef}
      aria-haspopup="menu"
      aria-expanded={open ? true : undefined}
      aria-controls={open ? contentId : undefined}
      iconPosition="right"
      {...rest}
      disabled={disabled}
      icon={
        icon ?? (
          <svg style={{ width: 10, height: 10 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path
              fill="currentColor"
              d="M5 7.4a.73.73 0 0 1-.52-.22L1.16 3.86a.73.73 0 0 1 0-1 .72.72 0 0 1 1 0L5 5.62l2.8-2.8a.74.74 0 1 1 1 1L5.52 7.18A.74.74 0 0 1 5 7.4z"
            />
          </svg>
        )
      }
      {...(isSubMenu ? subMenuTriggerProps : {})}
      onKeyDown={(event) => {
        if (disabled) return;

        if (isSubMenu && event.key === 'ArrowRight') {
          // prevent arrow keypresses from scrolling window
          event.preventDefault();
          onOpenChange(event, true);
        }
      }}
      className={classNames('aui--dropdown-trigger', { active: open, 'aui--dropdown-item': isSubMenu }, className)}
    >
      {children}
    </Button>
  );
};

/**
 * ths is a separate component to cater for Popover `popoverContent`'s
 * render function and regular function component prop
 */
const INNER_CONTENT = ({ children, dts, className }) => {
  const { contentRef, isSubMenu, closeMenu, triggerId, contentId, open, onOpenChange } = useDropdownMenu();

  useArrowFocus({
    ref: contentRef,
    selector: '.aui--dropdown-item',
  });

  React.useEffect(() => {
    const onContentKeyDown = (event) => {
      // allow submenus to close with left arrow
      if (open && isSubMenu && event.key === 'ArrowLeft' && contentRef.current.contains(event.target)) {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener('keydown', onContentKeyDown);
    return () => {
      document.removeEventListener('keydown', onContentKeyDown);
    };
  }, [closeMenu, contentRef, isSubMenu, onOpenChange, open]);

  return (
    <div
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target === contentRef.current) {
          // focus the first/last menu item on initial arrow up/down
          if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault();
            const nodes = getFocusableNodes(contentRef?.current, {
              tabbable: true,
              accept: (node) => node.classList.contains('aui--dropdown-item'),
            });
            if (event.key === 'ArrowDown') {
              nodes[0]?.focus({ preventScroll: true });
            }
            if (event.key === 'ArrowUp') {
              nodes[nodes.length - 1]?.focus({ preventScroll: true });
            }
          }
        }
      }}
      className={classNames('aui--dropdown-content', className)}
      {...expandDts(dts)}
      ref={contentRef}
      id={contentId}
      aria-labelledby={triggerId}
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>
  );
};

/**
 * Dropdown Menu Content container
 * Any menu items should be children of this component
 */
const DropdownMenuContent = ({ children, className, placement, modifiers, dts }) => {
  const { _menus, triggerRef, isSubMenu, open, onOpenChange, closeParentMenu } = useDropdownMenu();
  forbiddenChildrenInvariant(children);
  noRefInvariant(triggerRef);

  return (
    <Popover
      modifiers={
        modifiers ?? [
          {
            name: 'flip',
            enabled: true,
          },
          {
            name: 'preventOverflow',
            enabled: true,
          },
        ]
      }
      triggers="click"
      isMenu
      onClickOutside={(event) => {
        event.preventDefault();
        const menuEls = Array.from(document.querySelectorAll('.aui--dropdown-popover'));
        if (menuEls.length > 0) {
          const targetMenu = menuEls.findIndex((el) => el.contains(event.target));
          // If clickOutside is triggered by clicking on a menu,
          // call `closeMenu` on the sibling menu after the target
          if (menuEls.some((el) => el.contains(event.target))) return _menus[targetMenu + 1].closeMenu();
        }
        closeParentMenu();
      }}
      popoverClassNames={classNames('aui--dropdown-popover', { open })}
      triggerRef={triggerRef}
      placement={placement ? placement : isSubMenu ? 'right-start' : 'bottom-start'}
      arrowStyles={{ display: 'none' }}
      isOpen={open}
      onOpenChange={(openState, event) => {
        if (event.type === 'keydown' && event.key === 'Escape') {
          return closeParentMenu();
        }
        onOpenChange(event, openState);
      }}
      popoverContent={
        typeof children === 'function' ? (
          (...args) => (
            <INNER_CONTENT className={className} dts={dts}>
              {children(...args)}
            </INNER_CONTENT>
          )
        ) : (
          <INNER_CONTENT className={className} dts={dts}>
            {children}
          </INNER_CONTENT>
        )
      }
    />
  );
};

const DropdownMenuItem = ({ children, onClick, disabled, className, dts, ...rest }) => {
  const { closeParentMenu, closeOnItemClick } = useDropdownMenu();
  return (
    <button
      {...rest}
      tabIndex={disabled ? -1 : 0}
      role="menuitem"
      className={classNames('aui--dropdown-item', { 'is-disabled': disabled }, className)}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          if (closeOnItemClick) {
            // ensure that the top menu level is closed
            // regardless of current menu level
            closeParentMenu();
          }
        }
      }}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : undefined}
      {...expandDts(dts)}
    >
      {children}
    </button>
  );
};

const DropdownMenuCheckboxGroup = ({ children, onChange, className, ...rest }) => {
  forbiddenChildrenInvariant(children);
  const { closeParentMenu, closeOnItemClick } = useDropdownMenu();
  return (
    <CheckboxGroup
      className={classNames('aui--dropdown-checkbox-group', className)}
      onChange={(...args) => {
        onChange(...args);
        if (closeOnItemClick) {
          closeParentMenu();
        }
      }}
      {...rest}
    >
      {children}
    </CheckboxGroup>
  );
};

const DropdownMenuCheckbox = ({ children, className, ...rest }) => {
  const parentCtx = useCheckboxGroup();
  const Component = _.isEmpty(parentCtx) ? Checkbox : CheckboxGroup.Item;
  return <Component role="menuitemcheckbox" className={classNames('aui--dropdown-item', className)} {...rest} />;
};

const DropdownMenuCheckboxAll = ({ children, className, ...rest }) => {
  return (
    <CheckboxGroup.All role="menuitemcheckbox" className={classNames('aui--dropdown-item', className)} {...rest} />
  );
};

const DropdownMenuRadioGroup = ({ children, onChange, className, ...rest }) => {
  forbiddenChildrenInvariant(children);
  const { closeParentMenu, closeOnItemClick } = useDropdownMenu();
  return (
    <RadioGroup
      className={classNames('aui--dropdown-radio-group', className)}
      disableArrowKeys
      onChange={(...args) => {
        onChange(...args);
        if (closeOnItemClick) {
          closeParentMenu();
        }
      }}
      {...rest}
    >
      {children}
    </RadioGroup>
  );
};

const DropdownMenuRadio = ({ children, onClick, className, ...rest }) => {
  return <Radio role="menuitemradio" className={classNames('aui--dropdown-item', className)} {...rest} />;
};

const DropdownMenuLabel = ({ children, className, ...rest }) => {
  return (
    <div className={classNames('aui--dropdown-label', className)} {...rest}>
      {children}
    </div>
  );
};

const DropdownMenuDivider = ({ className }) => {
  return <div className={classNames('aui--dropdown-divider', className)} />;
};

/**
 *
 * a div Styled like a `DropdownMenu.Item`
 */
const DropdownMenuItemContainer = ({ children, className, ...rest }) => {
  return (
    <div className={classNames('aui--dropdown-container', className)} {...rest}>
      {children}
    </div>
  );
};

const DropdownMenuGroup = ({ children, className, defaultCollapsed, collapsible, title, id, ...rest }) => {
  forbiddenChildrenInvariant(children);

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const onPanelClick = () => setIsCollapsed(!isCollapsed);

  return collapsible ? (
    <Panel
      isCollapsed={isCollapsed}
      onClick={onPanelClick}
      className={classNames('aui--dropdown-group', className)}
      id={`panel-${_.kebabCase(title)}`}
      title={title}
    >
      {children}
    </Panel>
  ) : (
    <div role="group" className={classNames('aui--dropdown-group', className)} {...rest}>
      {title && <DropdownMenuLabel id={id}>{title}</DropdownMenuLabel>}
      {children}
    </div>
  );
};

DropdownMenu.Content = DropdownMenuContent;
DropdownMenuContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  dts: PropTypes.string,
  id: PropTypes.string,
  placement: PropTypes.oneOf(popoverPlacements),
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

DropdownMenuTrigger.propTypes = {
  isLoading: PropTypes.bool,
  color: PropTypes.oneOf(colors, variants, sizes),
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes),
  iconPosition: PropTypes.oneOf(positions),
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

DropdownMenu.Item = DropdownMenuItem;

DropdownMenu.CheckboxGroup = DropdownMenuCheckboxGroup;
DropdownMenuCheckboxGroup.propTypes = { ...checkboxGroupPropTypes };

DropdownMenu.Checkbox = DropdownMenuCheckbox;
DropdownMenuCheckbox.propTypes = { ...checkboxPropTypes, ...shareCheckboxPropTypes };

DropdownMenu.CheckboxAll = DropdownMenuCheckboxAll;
DropdownMenuCheckboxAll.propTypes = { ...checkboxGroupAllPropTypes };

DropdownMenu.RadioGroup = DropdownMenuRadioGroup;
DropdownMenuRadioGroup.propTypes = { ...radioGroupPropTypes };

DropdownMenu.Radio = DropdownMenuRadio;
DropdownMenuRadio.propTypes = { ...radioPropTypes };

DropdownMenuItem.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  dts: PropTypes.string,
  onClick: PropTypes.func,
};

DropdownMenu.Label = DropdownMenuLabel;
DropdownMenuLabel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

DropdownMenu.ItemContainer = DropdownMenuItemContainer;
DropdownMenuItemContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

DropdownMenu.Divider = DropdownMenuDivider;
DropdownMenuDivider.propTypes = {
  className: PropTypes.string,
};

DropdownMenu.Group = DropdownMenuGroup;
DropdownMenuGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  /**
   * Renders the group as a collapsible panel component
   */
  collapsible: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  /**
   * The group's heading.
   * Title must be used if collapsible is true
   */
  title: PropTypes.string,
};

DropdownMenu.useDropdownMenu = useDropdownMenu;

DropdownMenu.propTypes = {
  /**
   * Initial open state. Can be used to toggle the open state programatically.
   */
  defaultOpen: PropTypes.bool,
  /**
   * Closes the menu when an item with an onClick handler is clicked.
   * Also applies to checkboxes and radios.
   */
  closeOnItemClick: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  /**
   * opt-in to submenu behaviour for nested menus
   */
  submenu: PropTypes.bool,
  /**
   * Optional ref to mount the dropdown to
   *
   * *Only use when using Dropdown.Trigger is not feasible*
   */
  triggerRef: PropTypes.object,
  /**
   * A unique trigger id is required for accessiblilty purposes
   */
  triggerId: PropTypes.string,
  /**
   * A unique content id is required for accessiblilty purposes
   */
  contentId: PropTypes.string,
  /**
   * A render function may be used, which receives the dropdown context.
   * Notably: `open` state, `closeMenu()` function, `triggerRef`, `contentRef`.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default DropdownMenu;
