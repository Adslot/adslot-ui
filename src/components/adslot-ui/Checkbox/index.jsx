import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from '../../../lib/utils';
import { checkboxPropTypes } from '../../prop-types/inputPropTypes';
import './styles.scss';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDefault = this.onChangeDefault.bind(this);
  }

  onChangeDefault(event) {
    this.props.onChange(event, this.props.name);
  }

  render() {
    const { name, value, label, dts, disabled, checked, id, className, inline } = this.props;

    const componentClassName = classnames(['checkbox-component', { 'checkbox-component-inline': inline }]);
    const iconClassName = classnames(['selection-component-icon', 'icheckbox', { checked }]);

    return (
      <div className={componentClassName} {...expandDts(dts)}>
        <label>
          <div className="checkbox-component-input-container">
            <span className={iconClassName} />
            <input
              type="checkbox"
              name={name}
              checked={checked}
              disabled={disabled}
              onChange={this.onChangeDefault}
              value={value}
              id={id}
              className={className}
            />
          </div>
          {label ? <div className="checkbox-component-label">{label}</div> : null}
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
  onChange: _.noop,
};

export default Checkbox;
