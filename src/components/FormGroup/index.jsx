import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ addon, disabled, helpText, label, onChange, placeholder, value }) => {
  const addonElement = addon ? <div className="input-group-addon">{addon}</div> : null;
  const inputId = _.kebabCase(label);
  return (
    <div data-testid="form-group-wrapper" className="form-group">
      <label data-testid="form-group-label" htmlFor={inputId} className="control-label col-xs-3">
        {label}
      </label>
      <div data-testid="form-group-input-group-wrapper" className="col-xs-5">
        <div data-testid="form-group-input-group" className="input-group col-xs-12">
          {addonElement}
          <input
            data-testid="form-group-input"
            className="form-control"
            disabled={disabled}
            id={inputId}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
          />
        </div>
        <p data-testid="form-group-help" className="help-block">
          {helpText}
        </p>
      </div>
    </div>
  );
};

FormGroup.propTypes = {
  addon: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};

FormGroup.defaultProps = {
  disabled: false,
  value: '',
};

export default FormGroup;
