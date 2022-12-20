/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { themes, popoverPlacements, popoverStrategies } from './constants';
import WithRef from './WithRef';
import usePopover from './usePopover';
import DismissibleFocusTrap from '../DismissibleFocusTrap';
import './styles.css';

const triggerPropTypes = PropTypes.oneOf(['click', 'hover', 'focus', 'disabled']);

const Popover = ({
  isOpen: isOpenProp,
  onOpenChange,
  theme,
  title,
  children,
  dts,
  triggers: triggersProp,
  popoverClassNames,
  className,
  wrapperStyles,
  popoverContent,
  getContainer,
  arrowStyles,
  placement,
  strategy,
  modifiers,
  delayShow = 0,
  delayHide = 0,
  contentHoverable = false,
  isMenu,
  triggerRef: triggerRefProp,
  onClickOutside: onClickOutsideProp,
  anchorRef,
}) => {
  const triggers = _.castArray(triggersProp);

  const { triggerRef, withRefProps, closePopover, onClickOutside, triggerSource } = usePopover({
    triggers,
    triggerRef: triggerRefProp,
    anchorRef,
    onOpenChange,
    isOpen: isOpenProp,
    onClickOutside: onClickOutsideProp,
    isMenu,
    contentHoverable,
    delayHide,
    delayShow,
  });

  const elementClass = classnames('aui--popover-element', className);
  const refElement = anchorRef?.current ?? triggerRef?.current;

  const content = isMenu ? (
    _.isFunction(popoverContent) ? (
      (...args) => (
        <DismissibleFocusTrap
          disabled={triggerSource === 'pointerover'}
          onClickOutside={onClickOutside}
          onEscape={closePopover}
        >
          {popoverContent(...args)}
        </DismissibleFocusTrap>
      )
    ) : (
      <DismissibleFocusTrap
        disabled={triggerSource === 'pointerover'}
        onClickOutside={onClickOutside}
        onEscape={closePopover}
      >
        {popoverContent}
      </DismissibleFocusTrap>
    )
  ) : (
    popoverContent
  );

  return (
    <>
      {!triggerRefProp ? (
        <span ref={triggerRef} data-testid="popover-element" className={elementClass}>
          {children}
        </span>
      ) : (
        children
      )}

      <WithRef
        popoverClassNames={popoverClassNames}
        wrapperStyles={wrapperStyles}
        dts={dts}
        title={title}
        theme={theme}
        popoverContent={content}
        refElement={refElement}
        getContainer={getContainer}
        arrowStyles={arrowStyles}
        placement={placement}
        strategy={strategy}
        modifiers={modifiers}
        {...withRefProps}
      />
    </>
  );
};

Popover.propTypes = {
  theme: PropTypes.oneOf(themes),
  title: PropTypes.node,
  className: PropTypes.string,
  popoverClassNames: PropTypes.string,
  /**
   * hover show delay in ms
   */
  delayShow: PropTypes.number,
  /**
   * hover hide delay in ms
   */
  delayHide: PropTypes.number,
  /**
   * when used with the hover trigger, hovering the popover content
   * will keep the popover open.
   *
   * Popover will close when mousing out of the popover content.
   *
   * For the best UX, use with `delayHide` of at least 200
   */
  contentHoverable: PropTypes.bool,
  /**
   * when true:
   * - the popover content will be focused after opening
   * - the popover content will trap focus
   * - the popover trigger will re-focus on close
   */
  isMenu: PropTypes.bool,
  /**
   * callback fired when Popover open state changes
   * @param {boolean} openState
   * @param {object} event - event object
   * @param {string} eventType - the type of event that triggered this change.
   * Either a dom event (`keydown`, `pointerover`, `pointerleave`, `click`),
   * or `clickOutside`, when closed via clicking outside, `disabed` when disabled trigger is applied.
   */
  onOpenChange: PropTypes.func,
  /**
   * [`isMenu`] callback called when closing on outside click
   */
  onClickOutside: PropTypes.func,
  /**
   *  arrow css styles, mainly for positioning the arrow
   */
  arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]), // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * children is optional when using `triggerRef`
   */
  children: PropTypes.node,
  triggers: PropTypes.oneOfType([triggerPropTypes, PropTypes.arrayOf(triggerPropTypes)]),
  isOpen: PropTypes.bool,
  getContainer: PropTypes.func,
  anchorRef: PropTypes.shape({ current: PropTypes.any }),
  triggerRef: PropTypes.shape({ current: PropTypes.any }),
  dts: PropTypes.string,
};

Popover.defaultProps = {
  theme: 'light',
  placement: 'auto',
  strategy: 'absolute',
  triggers: ['hover', 'focus'],
};

Popover.WithRef = WithRef;

export { default as usePopover } from './usePopover';

export default Popover;
