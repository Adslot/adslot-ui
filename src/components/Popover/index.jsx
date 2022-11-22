/* eslint-disable react/jsx-indent */
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { themes, popoverPlacements, popoverStrategies } from './constants';
import WithRef from './WithRef';
import './styles.css';

const triggerPropTypes = PropTypes.oneOf(['click', 'hover', 'focus', 'disabled']);

const Popover = (props) => {
  const { isOpen } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(isOpen);

  React.useEffect(() => {
    setIsPopoverOpen(isOpen);
  }, [setIsPopoverOpen, isOpen]);

  const closePopover = () => setIsPopoverOpen(false);

  const openPopover = () => setIsPopoverOpen(true);

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  const onClick = () => togglePopover();

  const onFocus = () => openPopover();

  const onBlur = () => closePopover();

  const onMouseOver = () => openPopover();

  const onMouseOut = () => closePopover();

  const { title, children, className, dts, popoverContent, popperRef } = props;
  const elementClass = classnames('aui--popover-element', className);
  const triggers = _.flattenDeep([props.triggers]);

  const [elementRef, setReferenceElement] = useState(null);

  return (
    <>
      <span
        data-testid="popover-element"
        className={elementClass}
        ref={setReferenceElement}
        {...(triggers.includes('disabled')
          ? {}
          : {
              ...(triggers.includes('click') ? { onClick } : {}),
              ...(triggers.includes('hover') ? { onMouseOver, onMouseOut } : {}),
              ...(triggers.includes('focus') ? { onFocus, onBlur, tabIndex: -1 } : {}),
            })}
      >
        {children}
      </span>
      <WithRef
        popoverClassNames={props.popoverClassNames}
        wrapperStyles={props.wrapperStyles}
        dts={dts}
        title={title}
        theme={props.theme}
        popoverContent={popoverContent}
        refElement={elementRef}
        getContainer={props.getContainer}
        arrowStyles={props.arrowStyles}
        placement={props.placement}
        strategy={props.strategy}
        modifiers={props.modifiers}
        isOpen={isPopoverOpen}
        popperRef={popperRef}
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
   *  arrow css styles, mainly for positioning the arrow
   */
  arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]), // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  strategy: PropTypes.oneOf(popoverStrategies),
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  children: PropTypes.node.isRequired,
  triggers: PropTypes.oneOfType([triggerPropTypes, PropTypes.arrayOf(triggerPropTypes)]),
  isOpen: PropTypes.bool,
  getContainer: PropTypes.func,
  popperRef: PropTypes.func,
  dts: PropTypes.string,
};

Popover.defaultProps = {
  theme: 'light',
  placement: 'auto',
  strategy: 'absolute',
  triggers: 'hover',
  isOpen: false,
};

Popover.WithRef = WithRef;

export default Popover;
