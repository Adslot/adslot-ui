import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import { popoverPlacements } from '../Popover/constants';
import './styles.css';

export const baseClass = 'aui--alert-input';

const AlertInput = ({
  dts,
  popoverPlacement = 'bottom',
  disabled,
  prefixAddon,
  suffixAddon,
  alertStatus = 'success',
  alertMessage,
  onValueChange,
  className,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);
  const componentRef = React.useRef();

  const theme = alertStatus === 'warning' ? 'warn' : alertStatus;
  const shouldPopoverOpen = isPopoverVisible && !_.isEmpty(alertMessage);

  const handleMouseEnter = () => {
    if (alertMessage) setIsPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopoverVisible(false);
  };

  const handleInputFocus = (event) => {
    event.target.select();
    setIsFocused(true);
    setIsPopoverVisible(!!alertMessage);
    onFocus?.(event);
  };

  const handleInputBlur = (event) => {
    setIsFocused(false);
    setIsPopoverVisible(false);
    onBlur?.(event);
  };

  return (
    <React.Fragment>
      <div
        data-testid="alert-input-wrapper"
        ref={componentRef}
        className={classnames(
          baseClass,
          {
            [alertStatus]: alertStatus,
            [`${baseClass}--focused`]: isFocused,
            [`${baseClass}--disabled`]: disabled,
          },
          className
        )}
        data-test-selector={dts}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {prefixAddon ? <span className={`${baseClass}__addon`}>{prefixAddon}</span> : null}

        <input
          {...{
            ...rest,
            className: `${baseClass}__input`,
            onChange: onValueChange,
            onFocus: handleInputFocus,
            onBlur: handleInputBlur,
          }}
        />

        {suffixAddon ? <span className={`${baseClass}__addon`}>{suffixAddon}</span> : null}
      </div>

      {shouldPopoverOpen && (
        <Popover.WithRef
          isOpen
          refElement={componentRef.current}
          placement={popoverPlacement}
          popoverClassNames={`${baseClass}__popover`}
          theme={theme}
          popoverContent={alertMessage}
        />
      )}
    </React.Fragment>
  );
};

AlertInput.propTypes = {
  className: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  prefixAddon: PropTypes.node,
  suffixAddon: PropTypes.node,
  /**
   * <span>
   *   As <code>success</code> is assumed, and help is always displayed independently, the accepted pattern is to
   *  only use <code>warning</code> and <code>error</code> feedback states with this component. Otherwise leave
   *  type undefined for <code>success</code>.
   * </span>
   */
  alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  /**
   * 'left', 'top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'right'
   */
  popoverPlacement: PropTypes.oneOf(popoverPlacements),
  alertMessage: PropTypes.string,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default AlertInput;
