import React, { PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import './styles.scss';

export const baseClass = 'alert-input-component';

const AlertInput = ({
  defaultValue,
  value,
  prefixAddon,
  suffixAddon,
  alertStatus = '',
  alertMessage,
  popoverTrigger,
  onValueChange,
  onBlur,
}) => {
  let popover = <div />;

  if (alertMessage) {
    popover = (
      <Popover className={`${baseClass}-popover ${alertStatus}`} id="alert-input-popover">
        <strong>{alertMessage}</strong>
      </Popover>
    );
  }

  const selectAll = (event) => event.target.select();

  return (
    <OverlayTrigger trigger={popoverTrigger} placement="bottom" overlay={popover}>
      <div className={`${baseClass} ${alertStatus}`}>
        {prefixAddon ? <span className={`${baseClass}-addon`}>{prefixAddon}</span> : null}
        <input
          className={`${baseClass}-input`}
          type="text"
          defaultValue={defaultValue}
          value={value}
          onClick={selectAll}
          onChange={onValueChange}
          onBlur={onBlur}
        />
        {suffixAddon ? <span className={`${baseClass}-addon`}>{suffixAddon}</span> : null}
      </div>
    </OverlayTrigger>
  );
};

AlertInput.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  prefixAddon: PropTypes.node,
  suffixAddon: PropTypes.node,
  alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  alertMessage: PropTypes.string,
  popoverTrigger: OverlayTrigger.propTypes.trigger,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
};

AlertInput.defaultProps = {
  popoverTrigger: ['hover', 'focus'],
};

export default AlertInput;
