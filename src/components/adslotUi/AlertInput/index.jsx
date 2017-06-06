import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import './styles.scss';

export const baseClass = 'alert-input-component';

const AlertInput = ({
  value,
  prefixAddon,
  suffixAddon,
  alertStatus = '',
  alertMessage,
  popoverTrigger,
  onValueChange,
}) => {
  const selectAll = (event) => event.target.select();
  const baseComponent = (
    <div className={`${baseClass} ${alertStatus}`}>
      {prefixAddon ? <span className={`${baseClass}-addon`}>{prefixAddon}</span> : null}
      <input
        className={`${baseClass}-input`}
        type="text"
        value={value}
        onClick={selectAll}
        onChange={onValueChange}
      />
      {suffixAddon ? <span className={`${baseClass}-addon`}>{suffixAddon}</span> : null}
    </div>
  );

  if (alertMessage) {
    const popover = (
      <Popover className={`${baseClass}-popover ${alertStatus}`} id="alert-input-popover">
        <strong>{alertMessage}</strong>
      </Popover>
    );

    return (
      <OverlayTrigger trigger={popoverTrigger} placement="bottom" overlay={popover}>
        {baseComponent}
      </OverlayTrigger>
    );
  }

  return baseComponent;
};

AlertInput.propTypes = {
  value: PropTypes.string,
  prefixAddon: PropTypes.node,
  suffixAddon: PropTypes.node,
  alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  alertMessage: PropTypes.string,
  popoverTrigger: OverlayTrigger.propTypes.trigger,
  onValueChange: PropTypes.func,
};

AlertInput.defaultProps = {
  popoverTrigger: ['hover', 'focus'],
};

export default AlertInput;
