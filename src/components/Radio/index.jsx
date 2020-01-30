import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const RadioButton = ({ id, value, name, className, label, disabled, checked, onChange, inline, dts }) => {
  const componentClassName = classnames(['radio-component', { 'radio-component-inline': inline }]);
  const iconClassName = classnames(['selection-component-icon', 'iradio', { checked }, { disabled }]);

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
            onChange={onChange}
            value={value}
            id={id}
            className={className}
          />
        </div>
        {label && <div className="radio-component-label">{label}</div>}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  checked: PropTypes.bool,
};

RadioButton.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _.noop,
};

export default RadioButton;
