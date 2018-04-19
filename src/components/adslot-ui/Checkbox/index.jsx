import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';

import './styles.scss';

class Checkbox extends React.Component {
  static getDerivedStateFromProps(newProps, prevState) {
    return newProps.checked === prevState.checked
      ? null
      : {
          checked: newProps.checked,
        };
  }

  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    const isChecked = Boolean(event.target.checked);
    this.setState(() => ({ checked: isChecked }));
    if (this.props.onChange) {
      this.props.onChange(event, this.props.name);
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
      <div className="checkbox-component">
        <label>
          <input
            type="checkbox"
            name={name}
            value={value}
            onChange={this.onChangeDefault}
            disabled={this.props.disabled}
            checked={this.state.checked}
            {...expandDts(dts)}
            {...optional}
          />
          {label ? <span>{label}</span> : null}
        </label>
      </div>
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
