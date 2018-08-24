import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from '../../../lib/utils';
import { radioButtonPropTypes } from '../../prop-types/inputPropTypes';
import './styles.scss';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    this.props.onChange(event);
  }

  render() {
    const { name, className, label, dts, disabled, checked, id, value, inline } = this.props;

    const componentClassName = classnames(['radio-component', { 'radio-component-inline': inline }]);
    const iconClassName = classnames(['selection-component-icon', 'iradio', { checked }]);

    return (
      <div className={componentClassName} {...expandDts(dts)}>
        <label>
          <div className="radio-component-input-container">
            <span className={iconClassName} />
            <input
              type="radio"
              name={name}
              checked={checked}
              disabled={disabled}
              onClick={this.onChangeDefault}
              value={value}
              id={id}
              className={className}
            />
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
  onChange: _.noop,
};

export default RadioButton;
