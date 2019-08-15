import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Switch extends React.Component {
  state = { checked: this.props.defaultChecked || false };

  handleChange = event => {
    const { onChange, checked } = this.props;
    const targetCheckedValue = _.get(event, 'target.checked');

    if (_.isNil(checked)) {
      this.setState({ checked: targetCheckedValue });
    }

    if (onChange) {
      onChange(targetCheckedValue);
    }
  };

  render() {
    const { defaultChecked, checked, value, onChange, className, dts } = this.props;

    if (!_.isNil(checked) && !_.isNil(defaultChecked))
      console.warn(
        'Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled'
      );

    if (!_.isNil(checked) && _.isNil(onChange))
      console.warn(
        'Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.'
      );

    const toggleInputChecked = !_.isNil(checked) ? checked : this.state.checked;
    return (
      <label className="aui--switch-label">
        <input
          type="checkbox"
          checked={toggleInputChecked}
          value={value}
          onChange={this.handleChange}
          className={className}
          dts={dts}
        />
        <span className="aui--switch-slider round"></span>
      </label>
    );
  }
}

Switch.defaultProps = {
  value: '',
  dts: 'switch-component',
};

Switch.propTypes = {
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dts: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;
