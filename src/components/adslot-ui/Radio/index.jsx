import React from 'react';
import { expandDts } from '../../../lib/utils';
import { radioButtonPropTypes } from '../../prop-types/inputPropTypes';
import './styles.scss';

class RadioButton extends React.Component {
  static getDerivedStateFromProps(newProps, prevState) {
    return newProps.checked === prevState.checked ? null : { checked: newProps.checked };
  }

  constructor(props) {
    super(props);
    this.state = { checked: props.checked };

    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    this.setState({ checked: Boolean(event.target.checked) });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const { name, className, label, dts, disabled, id, value } = this.props;
    const radioInputProps = {
      type: 'radio',
      name,
      checked: this.state.checked,
      disabled,
      onChange: this.onChangeDefault,
      value,
      id,
      className,
    };

    return (
      <div className="radio-component" {...expandDts(dts)}>
        <span className={`selection-component-icon iradio${this.state.checked ? ' checked' : ''}`} />
        <label>
          <div className="radio-component-input-container">
            <input {...radioInputProps} />
          </div>
          {label ? <span>{label}</span> : null}
        </label>
      </div>
    );
  }
}

RadioButton.propTypes = radioButtonPropTypes;

RadioButton.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
};

export default RadioButton;
