import * as React from 'react';

export type DropdownMenuContentChildren = ((...args: any[]) => any) | React.ReactNode;

export type DropdownMenuContentPlacement =
  | 'auto'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'auto-start'
  | 'top-start'
  | 'right-start'
  | 'bottom-start'
  | 'left-start'
  | 'auto-end'
  | 'top-end'
  | 'right-end'
  | 'bottom-end'
  | 'left-end';

export type DropdownMenuContentModifiers = Object | Object[];

export interface DropdownMenuContentProps {
  children?: DropdownMenuContentChildren;
  className?: string;
  dts?: string;
  id?: string;
  placement?: DropdownMenuContentPlacement;
  modifiers?: DropdownMenuContentModifiers;
}

declare const DropdownMenuContent: React.FC<DropdownMenuContentProps>;

export type DropdownMenuTriggerColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export type DropdownMenuTriggerVariant = 'solid' | 'borderless' | 'inverse' | 'link';

export type DropdownMenuTriggerSize = 'medium' | 'large';

export type DropdownMenuTriggerIconPosition = 'left' | 'right';

export interface DropdownMenuTriggerProps {
  isLoading?: boolean;
  color?: DropdownMenuTriggerColor;
  variant?: DropdownMenuTriggerVariant;
  size?: DropdownMenuTriggerSize;
  iconPosition?: DropdownMenuTriggerIconPosition;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  dts?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

declare const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps>;

export type DropdownMenuCheckboxGroupOrientation = 'vertical' | 'horizontal';

export type DropdownMenuCheckboxGroupVariant = 'default' | 'box';

export interface DropdownMenuCheckboxGroupProps {
  value: any[];
  name: string;
  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange?: (...args: any[]) => any;
  /**
   * @function getIsChecked overrides the default checked state behaviour
   * @param {string|number} itemValue - the checkbox's value
   * @param {array} value - the checkbox group's value
   */
  getIsChecked?: (...args: any[]) => any;
  orientation?: DropdownMenuCheckboxGroupOrientation;
  children: React.ReactNode;
  className?: string;
  dts?: string;
  variant?: DropdownMenuCheckboxGroupVariant;
  id?: string;
  indent?: boolean;
  /**
   * @deprecated use orientation="horizontal" instead
   */
  inline?: boolean;
}

declare const DropdownMenuCheckboxGroup: React.FC<DropdownMenuCheckboxGroupProps>;

export type DropdownMenuCheckboxVariant = 'default' | 'box';

export type DropdownMenuCheckboxChecked = boolean | 'partial';

export type DropdownMenuCheckboxValue = string | number;

export interface DropdownMenuCheckboxProps {
  /**
   * name for the checkbox input
   */
  name?: string;
  variant?: DropdownMenuCheckboxVariant;
  /**
   * @function onChange called when checkBox onChange event is fired
   * @param {string|boolean} nextState - the checked state
   * @param {string} name - the checkbox name
   * @param {string|number} value - the checkbox value
   */
  onChange?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked?: DropdownMenuCheckboxChecked;
  /**
   * @deprecated
   */
  size?: number;
  /**
   * @deprecated
   */
  inline?: boolean;
  /**
   * checkBox input value
   */
  value?: DropdownMenuCheckboxValue;
  /**
   * id for the checkbox input
   */
  id?: string;
  className?: string;
  /**
   * checkBox label for the checkbox input
   */
  label?: React.ReactNode;
  /**
   * additional text description to display below the label
   */
  text?: React.ReactNode;
  /**
   * icon to display beside the label when  parent group's `variant="box"`
   */
  icon?: React.ReactNode;
  /**
   * data-test-selector for the checkbox component
   */
  dts?: string;
  /**
   * determines if the checkbox is disabled
   */
  disabled?: boolean;
}

declare const DropdownMenuCheckbox: React.FC<DropdownMenuCheckboxProps>;

export interface DropdownMenuCheckboxAllProps {
  label?: React.ReactNode;
  className?: string;
  /**
   * a array of values that the All option represent
   */
  values: any[];
}

declare const DropdownMenuCheckboxAll: React.FC<DropdownMenuCheckboxAllProps>;

export type DropdownMenuRadioGroupOrientation = 'vertical' | 'horizontal';

export type DropdownMenuRadioGroupVariant = 'default' | 'box';

export interface DropdownMenuRadioGroupProps {
  value: string;
  name: string;
  onChange: (...args: any[]) => any;
  orientation?: DropdownMenuRadioGroupOrientation;
  children: React.ReactNode;
  className?: string;
  dts?: string;
  variant?: DropdownMenuRadioGroupVariant;
  id?: string;
  /**
   * @deprecated use orientation="horizontal" instead
   */
  inline?: boolean;
}

declare const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps>;

export type DropdownMenuRadioValue = string | number;

export interface DropdownMenuRadioProps {
  id?: string;
  className?: string;
  name?: string;
  label?: React.ReactNode;
  /**
   * additional text description to display below the label
   */
  text?: React.ReactNode;
  /**
   * icon to display beside the label when parent group's `variant="box"`
   */
  icon?: React.ReactNode;
  value?: DropdownMenuRadioValue;
  dts?: string;
  disabled?: boolean;
  /**
   * @function onChange called when radio onChange event is fired
   * @param {string|number} value - the radio value
   */
  onChange?: (...args: any[]) => any;
  /**
   * checked status of the radio input
   */
  checked?: boolean;
  /**
   * @deprecated
   */
  inline?: boolean;
}

declare const DropdownMenuRadio: React.FC<DropdownMenuRadioProps>;

export interface DropdownMenuItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  dts?: string;
  onClick?: (...args: any[]) => any;
}

declare const DropdownMenuItem: React.FC<DropdownMenuItemProps>;

export interface DropdownMenuLabelProps {
  className?: string;
  children?: React.ReactNode;
}

declare const DropdownMenuLabel: React.FC<DropdownMenuLabelProps>;

export interface DropdownMenuItemContainerProps {
  className?: string;
  children?: React.ReactNode;
}

declare const DropdownMenuItemContainer: React.FC<DropdownMenuItemContainerProps>;

export interface DropdownMenuDividerProps {
  className?: string;
}

declare const DropdownMenuDivider: React.FC<DropdownMenuDividerProps>;

export interface DropdownMenuGroupProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  /**
   * Renders the group as a collapsible panel component
   */
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  /**
   * The group's heading.
   * Title must be used if collapsible is true
   */
  title?: string;
}

declare const DropdownMenuGroup: React.FC<DropdownMenuGroupProps>;

export type DropdownMenuChildren = React.ReactNode | ((...args: any[]) => any);

export interface DropdownMenuProps {
  /**
   * Initial open state. Can be used to toggle the open state programatically.
   */
  defaultOpen?: boolean;
  /**
   * Closes the menu when an item with an onClick handler is clicked.
   * Also applies to checkboxes and radios.
   */
  closeOnItemClick?: boolean;
  onOpen?: (...args: any[]) => any;
  onClose?: (...args: any[]) => any;
  /**
   * opt-in to submenu behaviour for nested menus
   */
  submenu?: boolean;
  /**
   * Optional ref to mount the dropdown to
   * *Only use when using Dropdown.Trigger is not feasible*
   */
  triggerRef?: Object;
  /**
   * A unique trigger id is required for accessiblilty purposes
   */
  triggerId?: string;
  /**
   * A unique content id is required for accessiblilty purposes
   */
  contentId?: string;
  /**
   * A render function may be used, which receives the dropdown context.
   * Notably: `open` state, `closeMenu()` function, `triggerRef`, `contentRef`.
   */
  children?: DropdownMenuChildren;
}

declare const DropdownMenu: React.FC<DropdownMenuProps> & {
  Content: typeof DropdownMenuContent;
  Trigger: typeof DropdownMenuTrigger;
  Item: typeof DropdownMenuItem;
  CheckboxGroup: typeof DropdownMenuCheckboxGroup;
  Checkbox: typeof DropdownMenuCheckbox;
  CheckboxAll: typeof DropdownMenuCheckboxAll;
  RadioGroup: typeof DropdownMenuRadioGroup;
  Radio: typeof DropdownMenuRadio;
  Label: typeof DropdownMenuLabel;
  ItemContainer: typeof DropdownMenuItemContainer;
  Divider: typeof DropdownMenuDivider;
  Group: typeof DropdownMenuGroup;
};

export default DropdownMenu;

declare const DropdownMenuProvider: React.FC;

declare const INNER_CONTENT: React.FC;
