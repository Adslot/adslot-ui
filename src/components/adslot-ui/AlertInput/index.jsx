import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popover } from 'third-party';
import './styles.scss';

export const baseClass = 'alert-input-component';

export default class AlertInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isPopoverVisible: false,
    };
  }

  handleMouseEnter = () => {
    if (this.props.alertMessage) {
      this.setState({ isPopoverVisible: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ isPopoverVisible: false });
  };

  handleInputFocus = event => {
    event.target.select();
    this.setState({
      isFocused: true,
      isPopoverVisible: Boolean(this.props.alertMessage),
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleInputBlur = event => {
    this.setState({
      isFocused: false,
      isPopoverVisible: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const {
      className: customClass,
      dts,
      defaultValue,
      value,
      type,
      min,
      placeholder,
      prefixAddon,
      suffixAddon,
      alertStatus,
      alertMessage,
      onValueChange,
    } = this.props;

    const className = classnames(`${baseClass}-wrapper`, customClass, {
      [alertStatus]: alertStatus,
      'is-focused': this.state.isFocused,
    });

    const popoverClassName = classnames(`${baseClass}-popover`, {
      [alertStatus]: alertStatus,
    });

    const theme = alertStatus === 'warning' ? 'warn' : alertStatus;

    return (
      <div className={baseClass}>
        <Popover
          isOpen={this.state.isPopoverVisible && !_.isEmpty(alertMessage)}
          triggers={['disabled']}
          popoverContent={<strong>{alertMessage}</strong>}
          placement="bottom"
          popoverClassNames={popoverClassName}
          theme={theme}
        >
          <div
            className={className}
            data-test-selector={dts}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {prefixAddon ? <span className={`${baseClass}-wrapper-addon`}>{prefixAddon}</span> : null}
            <span className={`${baseClass}-wrapper-flex-wrapper`}>
              <input
                className={`${baseClass}-wrapper-input`}
                type={type}
                defaultValue={defaultValue}
                value={value}
                min={min}
                placeholder={placeholder}
                onChange={onValueChange}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            </span>
            {suffixAddon ? <span className={`${baseClass}-wrapper-addon`}>{suffixAddon}</span> : null}
          </div>
        </Popover>
      </div>
    );
  }
}

AlertInput.propTypes = {
  className: PropTypes.string,
  dts: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['text', 'number']),
  min: PropTypes.number,
  placeholder: PropTypes.string,
  prefixAddon: PropTypes.node,
  suffixAddon: PropTypes.node,
  alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  alertMessage: PropTypes.string,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

AlertInput.defaultProps = {
  type: 'text',
};
