import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Popper as ReactPopper } from 'react-popper';
import { popoverPlacements } from './constants';

// default arrow position in pixel from the corresponding popover edge
const DEFAULT_ARROW_POSITION = 12;

/**
 *
 * @param {string} placement
 * @param {object} arrowStyles            user-defined arrow styles
 * @param {Element} container             anchor container
 */
export const renderArrowStyles = (placement, arrowStyles, container = null) => {
  const horizontalPosition =
    _.get(container, 'clientWidth') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;
  const verticalPosition =
    _.get(container, 'clientHeight') >= DEFAULT_ARROW_POSITION * 2 ? DEFAULT_ARROW_POSITION : null;

  // console.log(horizontalPosition);
  // console.log(_.get(container, 'clientWidth'));
  let calculatedArrowStyles = {};
  switch (true) {
    case _.includes(['bottom-start', 'top-start'], placement) && !_.isNull(horizontalPosition):
      calculatedArrowStyles = { left: horizontalPosition };
      break;
    case _.includes(['bottom-end', 'top-end'], placement) && !_.isNull(horizontalPosition):
      calculatedArrowStyles = { left: 'auto', right: horizontalPosition };
      break;
    case _.includes(['left-start', 'right-start'], placement) && !_.isNull(verticalPosition):
      calculatedArrowStyles = { top: verticalPosition };
      break;
    case _.includes(['left-end', 'right-end'], placement) && !_.isNull(verticalPosition):
      calculatedArrowStyles = { top: 'auto', bottom: verticalPosition };
      break;
    default:
      calculatedArrowStyles = {};
  }

  return {
    ...calculatedArrowStyles,
    ...arrowStyles, // let user override default configuration
  };
};

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
}) => {
  const calculatedArrowStyles = renderArrowStyles(popperPlacement, arrowStyles, refElement);

  return (
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
          data-testid="popover-wrapper"
          placement={popperPlacement} // for test only
          className={popoverClass}
          ref={ref}
          style={{ ...style, ...wrapperStyles }}
          data-placement={placement}
          data-test-selector={dts}
        >
          <div data-testid="popover-container" className="aui--popover-container">
            {title ? (
              <div data-testid="popover-title" className="popover-title">
                {title}
              </div>
            ) : null}
            <div data-testid="popover-content" className="popover-content">
              {_.isFunction(popoverContent) ? popoverContent({ scheduleUpdate }) : popoverContent}
            </div>
          </div>
          <div
            data-testid="popover-arrow"
            placement={popperPlacement} // for test only
            className="aui--popover-arrow"
            data-placement={placement}
            ref={arrowProps.ref}
            style={{ ...arrowProps.style, ...calculatedArrowStyles }}
          />
        </div>
      )}
    </ReactPopper>
  );
};

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
