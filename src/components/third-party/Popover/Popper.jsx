import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Popper as ReactPopper } from 'react-popper';
import { popoverPlacements } from './constants';

const Popper = ({
  arrowStyles,
  boundariesElement,
  dts,
  innerRef,
  modifiers,
  placement: popperPlacement,
  popoverClass,
  popoverContent,
  refElement,
  title,
  wrapperStyles,
}) => (
  <ReactPopper
    {...(refElement ? { referenceElement: refElement } : {})}
    innerRef={innerRef}
    placement={popperPlacement}
    modifiers={{
      preventOverflow: {
        enabled: true,
        boundariesElement,
      },
      ...modifiers,
    }}
  >
    {({ ref, style, placement, arrowProps, scheduleUpdate }) => (
      <div
        className={popoverClass}
        ref={ref}
        style={{ ...style, ...wrapperStyles }}
        data-placement={placement}
        data-test-selector={dts}
      >
        <div className="aui--popover-container">
          {title ? <div className="popover-title">{title}</div> : null}
          <div className="popover-content">
            {_.isFunction(popoverContent) ? popoverContent({ scheduleUpdate }) : popoverContent}
          </div>
        </div>
        <div
          className="aui--popover-arrow"
          data-placement={placement}
          ref={arrowProps.ref}
          style={{ ...arrowProps.style, ...arrowStyles }}
        />
      </div>
    )}
  </ReactPopper>
);

Popper.propTypes = {
  arrowStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  boundariesElement: PropTypes.instanceOf(Element),
  dts: PropTypes.string,
  innerRef: PropTypes.func,
  modifiers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placement: PropTypes.oneOf(popoverPlacements),
  popoverClass: PropTypes.string,
  popoverContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  refElement: PropTypes.instanceOf(Element),
  title: PropTypes.string,
  wrapperStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Popper;
