import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import './styles.scss';

export const baseClass = 'alert-input-component';

export default class AlertInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isPopoverVisible: false,
    };
    this.getRef = this.getRef.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  getRef() {
    return this.root;
  }

  setRef(root) {
    this.root = root;
  }

  handleMouseEnter() {
    if (this.props.alertMessage) {
      this.setState({ isPopoverVisible: true });
    }
  }

  handleMouseLeave() {
    this.setState({ isPopoverVisible: false });
  }

  handleInputFocus(event) {
    event.target.select();
    this.setState({
      isFocused: true,
      isPopoverVisible: Boolean(this.props.alertMessage),
    });
  }

  handleInputBlur(event) {
    this.setState({
      isFocused: false,
      isPopoverVisible: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  render() {
    const {
      defaultValue,
      value,
      type,
      min,
      placeholder,
      prefixAddon,
      suffixAddon,
      alertStatus = '',
      alertMessage,
      onValueChange,
    } = this.props;

    const className = classnames({
      [baseClass]: true,
      [alertStatus]: true,
      'is-focused': this.state.isFocused,
    });

    return (
      <div
        className={className}
        ref={this.setRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {prefixAddon ? <span className={`${baseClass}-addon`}>{prefixAddon}</span> : null}
        <span className={`${baseClass}-flex-wrapper`}>
          <input
            className={`${baseClass}-input`}
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
        {suffixAddon ? <span className={`${baseClass}-addon`}>{suffixAddon}</span> : null}
        <Overlay
          show={this.state.isPopoverVisible}
          target={this.getRef}
          placement="bottom"
        >
          <Popover className={`${baseClass}-popover ${alertStatus}`} id="alert-input-popover">
            <strong>{alertMessage}</strong>
          </Popover>
        </Overlay>
      </div>
    );
  }
}

AlertInput.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  min: PropTypes.number,
  placeholder: PropTypes.string,
  prefixAddon: PropTypes.node,
  suffixAddon: PropTypes.node,
  alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  alertMessage: PropTypes.string,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
};

AlertInput.defaultProps = {
  type: 'text',
};

