import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import { expandDts } from '../../utils';
import invariant from '../../invariant';
import Popover from '../Popover';
import './styles.css';

const sizes = ['small', 'medium'];
const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
const variants = ['default', 'inline'];

const FormLabel = ({ label, labelFor, labelTooltip, isRequired }) => {
  if (!label) return null;

  const labelNode = (
    <>
      <label className="aui-label-text" htmlFor={labelFor}>
        {label}
      </label>
      {!isRequired ? null : <span className="aui-sub-label">- required</span>}
    </>
  );

  return labelTooltip ? (
    <Popover theme="dark" popoverContent={labelTooltip} className="aui-form-label" placement="bottom">
      {labelNode}
      <div data-testid="help-icon" className="aui-help-icon" />
    </Popover>
  ) : (
    <span className="aui-form-label">{labelNode}</span>
  );
};

FormLabel.propTypes = {
  label: PropTypes.node,
  labelFor: PropTypes.string,
  labelTooltip: PropTypes.node,
  isRequired: PropTypes.bool,
};

const FormField = ({
  children,
  className,

  label,
  labelFor,
  labelTooltip,
  isRequired = false,

  variant = 'default',
  size = 'medium',
  color,
  helperText,
  dts,
}) => {
  invariant(!(labelFor && !label), 'FormField: `labelFor` prop requires `label` prop.');
  invariant(!(labelTooltip && !label), 'FormField: `labelTooltip` prop requires `label` prop.');
  invariant(!(isRequired && !label), 'FormField: `isRequired` prop requires `label` prop.');

  return (
    <div
      className={cc(
        'aui--form-field',
        variant !== 'default' && `aui-${variant}`,
        `aui-${size}`,
        color && `aui-${color}`,
        className
      )}
      {...expandDts(dts)}
    >
      <FormLabel labelFor={labelFor} label={label} labelTooltip={labelTooltip} isRequired={isRequired} />

      <div className="aui-form-input">
        {children}
        <div className="aui-helper-text">{helperText}</div>
      </div>
    </div>
  );
};

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,

  label: PropTypes.node,
  labelFor: PropTypes.string,
  labelTooltip: PropTypes.node,
  isRequired: PropTypes.bool,

  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes),
  color: PropTypes.oneOf(colors),
  helperText: PropTypes.node,
  dts: PropTypes.string,
};

export default FormField;
