import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';

import './styles.scss';

class Checkbox extends React.Component {
  static getDerivedStateFromProps(newProps, prevState) {
    let isChecked = prevState.checked;
    let isDisabled = prevState.disabled;
    if (newProps.checked) isChecked = newProps.checked;
    if (newProps.disabled) isDisabled = newProps.disabled;
    return {
      checked: isChecked,
      disabled: isDisabled,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      disabled: props.disabled,
    };
    this.onChangeDefault = this.onChangeDefault.bind(this);
    if (this.props.onChange) {
      this.onChange = this.props.onChange.bind(this);
    }
  }

  onChangeDefault(event) {
    const isChecked = Boolean(event.target.checked);
    const isDisabled = Boolean(event.target.disabled);
    this.setState(() => ({
      checked: isChecked,
      disabled: isDisabled,
    }));
    if (this.onChange) {
      this.onChange(event, this.props.name);
    }
  }

  render() {
    const { name, value, label, dts } = this.props;
    const optional = {
      id: this.props.id ? this.props.id : null,
      className: this.props.className ? this.props.className : null,
    };
    if (this.props['data-name']) {
      optional['data-name'] = this.props['data-name'];
    }
    return (
      <label className="checkbox">
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={this.onChangeDefault}
          disabled={this.state.disabled}
          checked={this.state.checked}
          {...expandDts(dts)}
          {...optional}
        />
        {label ? <span>{label}</span> : null}
      </label>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  'data-name': PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
};

export default Checkbox;
