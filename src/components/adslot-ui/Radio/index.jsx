import React from 'react';
import classnames from 'classnames';
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
    const { name, className, label, dts, disabled, id, value, inline } = this.props;
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

    const componentClassName = classnames([
      'radio-component',
      {
        'radio-component-inline': inline,
      },
    ]);

    return (
      <div className={componentClassName} {...expandDts(dts)}>
        <label>
          <div className="radio-component-input-container">
            <span className={`selection-component-icon iradio${this.state.checked ? ' checked' : ''}`} />
            <input {...radioInputProps} />
          </div>
          {label ? <div className="radio-component-label">{label}</div> : null}
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
