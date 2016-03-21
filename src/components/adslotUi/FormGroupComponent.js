import _ from 'lodash';
import React, { PropTypes } from 'react';

const FormGroupComponent = ({
  addon,
  helpText,
  label,
  onChange,
  placeholder,
  value,
}) => {
  const addonElement = addon ? <div className="input-group-addon">{addon}</div> : null;
  const inputId = _.kebabCase(label);
  return (
    <div className="form-group">
      <label htmlFor={inputId} className="control-label col-xs-3">{label}</label>
      <div className="col-xs-9">
        <div className="input-group col-xs-6">
          {addonElement}
          <input
            type="text"
            className="form-control"
            id={inputId}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        <p className="help-block">{helpText}</p>
      </div>
    </div>
  );
};

FormGroupComponent.displayName = 'AdslotUiFormGroupComponent';

FormGroupComponent.propTypes = {
  addon: PropTypes.string,
  helpText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

FormGroupComponent.defaultProps = {
  value: '',
};

export default FormGroupComponent;
