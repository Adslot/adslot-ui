import _ from 'lodash';
import PropTypes from 'prop-types';

export const checkboxCheckStates = [true, false, 'partial'];

// common input tag props
export const inputPropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
};

export const checkboxPropTypes = {
  ...inputPropTypes,
  checked: PropTypes.oneOf(checkboxCheckStates),
  size: PropTypes.number,
};

export const radioButtonPropTypes = {
  ...inputPropTypes,
  checked: PropTypes.bool,
};

export const checkboxGroupPropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onChange: PropTypes.func.isRequired,
  dts: PropTypes.string,
  inline: PropTypes.bool,
};

export const radioGroupPropTypes = _.assign({}, checkboxGroupPropTypes, {
  value: PropTypes.string.isRequired,
});
