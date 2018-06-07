import classnames from "classnames";
import React from 'react';
import { expandDts } from '../../../lib/utils';
import { checkboxPropTypes } from '../../prop-types/inputPropTypes';
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
    this.state = {
      checked: props.checked,
      isHover: false,
    };
    this.onChangeDefault = this.onChangeDefault.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onChangeDefault(event) {
    const isChecked = Boolean(event.target.checked);
    this.setState(() => ({ checked: isChecked }));
    if (this.props.onChange) {
      this.props.onChange(event, this.props.name);
    }
  }

  onMouseEnter() {
    this.setState({ isHover: true });
  }

  onMouseLeave() {
    this.setState({ isHover: false });
  }

  render() {
    const { name, value, label, dts, disabled, id, className } = this.props;
    const checkboxInputProps = {
      type: 'checkbox',
      name,
      checked: this.state.checked,
      disabled,
      onChange: this.onChangeDefault,
      value,
      id,
      className,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
    };

    const iconClassNames = classnames([
      'selection-component-icon',
      {
        checked: this.state.checked,
        hover: this.state.isHover,
        disabled,
      },
    ]);

    return (
      <div className="checkbox-component" {...expandDts(dts)}>
        <span className={iconClassNames} />
        <label>
          <div className="checkbox-component-input-container">
            <input {...checkboxInputProps} />
          </div>
          {label ? <span>{label}</span> : null}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = checkboxPropTypes;

Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
};

export default Checkbox;
